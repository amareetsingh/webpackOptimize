import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import styles from './profile.module.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AvatarIcon from '../../assets/images/user_profile.png';
import { functionService } from '../../Context/functions';
import { ChangePasswordModal } from '../../Components/ChangePasswordModal';
import ImageUploader from '../../Components/ImageUploader';
import Toaster from '../../Components/Toaster';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '../../Components/Confirmmodal/ConfirmModal';
import { STRIPE_PUBLISHABLE_KEY } from "../../Utils/Consts";
import StripeCheckout from 'react-stripe-checkout';
import { useAuthState } from '../../Context';
import NotificationBar from '../../Components/NotificationBar'

function Profile() {
    const [show, setShow] = useState(false);
    const userDetails = useAuthState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [user, setUser] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const [reloadParam, setReloadParam] = useState();
    const [subscribed, setSubscribed] = useState(0);
    // userDetails && userDetails.oUser && userDetails.oUser['m_oUserAccount']['m_nAccountStatus']
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState("");
    let defaultAttr = {
        "szFirstName": "",
        "szLastName": "",
        "szProfileDesc": "",
        "szExternalProfileURL": "",
        "szPrivacyURL": ''
    };
    const [formData, setFormData] = useState(defaultAttr);
    const getProfileDetails = async (type = 0) => {
        let res = await functionService.post('User/getUserProfile');
        setLoader(true);
        if (res !== false && res.status !== false) {
            if (res.data.data.statusCode === 200) {
                let results = JSON.parse(res.data.data.result);
                let plan = (results && results.m_oUserAccount) ? results.m_oUserAccount.m_nAccountStatus : 0;
                //alert('plan:'+ plan);
                setSubscribed(plan);
                // if (plan.trim().length === 0) 
                // {
                //     setSubscribed(0)
                // }
                // else
                // {
                //     setSubscribed(1)
                    
                // }
                setUser(results);
                let defaultAttr = {
                    "szFirstName": results.m_szFirstName,
                    "szLastName": results.m_szLastName,
                    "szProfileDesc": results.m_szProfileDesc,
                    "szExternalProfileURL": results.m_szExternalProfileURL,
                    "szPrivacyURL": results.m_szPrivacyPolicyURL
                };
                setFormData(defaultAttr);
                if (type === 1) {
                    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    currentUser.FirstName = results.m_szFirstName;
                    currentUser.oUser = results;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    setReloadParam(new Date().getTime());
                }

            }
        }
        setLoader(false);
    }
    const handleSubmit = async () => {
        if (disabled === true) { return false; }
        setDisabled(true);
        setLoader(true);

        let res = await functionService.post("User/updateUserProfile", formData);
        if (res !== false && res.status !== false) {
            setShowToast(true)
        } else {
            setShowToast1(true)
        }
        setDisabled(false);
        setLoader(false);
        getProfileDetails(1);
    }
    const handleCancelSubscription = () => {
        setShowConfirm(true);
    }
    const updateCardDetails = async (token) => {
        if (disabled === true) { return false; }
        setDisabled(true);
        setLoader(true);
        if (!token.hasOwnProperty("card")) { return; }
        let res = await functionService.post('Payment/updateSubscription', { szToken: token.id });
        //console.log("res", res)
        if (res !== false && res.status !== false) {
            setMessage("Successfully updated your card details!!");
            setShowToast(true);

        } else {
            setMessage("Some error occured, please contact admin to update card details!")
            setShowConfirm(false);
            setShowToast1(true)
        }
        setDisabled(false);
        setLoader(false);
        getProfileDetails(1);
    }

    const handleActionConfirm = async () => {
        if (disabled === true) { return false; }
        setDisabled(true);
        setLoader(true);
        let res = await functionService.post('Payment/cancelSubscription', {});
        //console.log("res", res)
        if (res !== false && res.status !== false) {
            setMessage("Subscription Successfully Cancelled!!");
            setShowToast(true);
            setSubscribed(0);
            setShowConfirm(false);
        } else {
            setMessage(res.data.data.result)
            setShowConfirm(false);
            setShowToast1(true)
        }
        setDisabled(false);
        setLoader(false);
        getProfileDetails(1);
    }
    useEffect(() => {
        getProfileDetails();
    }, []);
    //      console.log("userDetails",userDetails)
    // console.log("subscribed",subscribed)

    return (
        <>
                
        <div className={styles.profilePage}>
            <Header loader={loader} reloader={reloadParam} />

            <Container className={styles.profilePageInner}>
             {subscribed !=1 &&  <NotificationBar 
                message="Please subscribe to a suitable plan. You will not be able to publish changes to your assessments. Any live assessments will not capture email addresses."
                bgColor="yellow"
                textColor="red"
             />}
                <div className={styles.goBack}>
                    <Link to="/dashboard"> <FontAwesomeIcon icon={faArrowLeft} size={'sm'} /> Go Back</Link>
                </div>
                <Row>
                    <Col sm={3} className={styles.profileLeftAside}>
                        <div className={styles.profilevisual}>
                            <div className={styles.avtar}>
                                <img src={functionService.awsBucketImage(user && user.m_oMedia) !== false ? functionService.awsBucketImage(user && user.m_oMedia) : AvatarIcon} alt="profile pic" />
                            </div>
                            <h4>{user && user.m_szFirstName} {user && user.m_szLastName}</h4>
                            <div className={styles.subscriptionbtn}>
                                <ImageUploader setCurrentObject={setUser} setCurrentData={user} nPurpose={103} lPurposeId={user && user.m_lUserId} label={"Upload/change"} />

                            </div>
                            <div className={styles.passwordChange}>
                                <p className={styles.label}>Password: </p>
                                <p className={styles.value} onClick={handleShow}>Change</p>
                            </div>
                        </div>
                        <div className={styles.profilesubscription}>
                            <h4>Subscriptions</h4>
                            {console.log("subscribe status:", subscribed)}
                            {subscribed === 1 ?
                                <>
                                    <div className={styles.subscribed}> 
                                        <p className={styles.label}>Subscribed:</p>
                                        <p className={styles.value}>{user && user.m_oUserAccount && functionService.convertDate(user.m_oUserAccount.m_dtSubscriptionStart)}</p>
                                    </div>


                                    <button className={styles.cancelsubscriptionbtn} onClick={handleCancelSubscription}>Cancel Subscription</button>
                                    <StripeCheckout
                                        label='Update Card Details'
                                        name="Evalinator"
                                        description={'Update Card Details'}
                                        token={token => updateCardDetails(token)}
                                        billingAddress={true}
                                        zipCode={true}
                                        email={user && user.m_szUserEmailAddress}
                                        panelLabel="Update Card Details"
                                        stripeKey={STRIPE_PUBLISHABLE_KEY}

                                    >
                                        <button className={styles.subscriptionbtn}>Update Card Details</button>
                                    </StripeCheckout>
                                </>
                                : subscribed === 2 ? 
                                <>
                                    <div className={styles.subscribed}> 
                                        <p className={styles.label}>Cancelled</p>
                                        <p className={styles.value}>Ending: {user && user.m_oUserAccount && functionService.convertDate(user.m_oUserAccount.m_dtSubscriptionEnd)}</p>
                                    </div>
                                    <Link to="/pricing" className={styles.subscribeNow} >Subscribe Again</Link>
                                </>    
                                : 
                                <Link to="/pricing" className={styles.subscribeNow} >Subscribe now!</Link>
                            }


                            <p className="mt-3" >Your payment is securely processed by Stripe. We do not store any personal or credit card
                                information other than name & email.</p>
                        </div>
                    </Col>

                    <Col sm={9} className={styles.profilerightAside}>
                        <div className={styles.profilecontent}>
                            <div className={styles.profilecontenthead}>
                                <h4>Your Information</h4>
                            </div>
                            <Form.Group className="mb-4" controlId="exampleForm.ControlInput5">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" placeholder="Enter here"
                                    defaultValue={user && user.m_szUserEmailAddress}
                                    disabled={true}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4 mt-2" controlId="exampleForm.ControlInput5">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter here"
                                    value={formData && formData.szFirstName}
                                    onChange={(e) => setFormData({ ...formData, szFirstName: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4 mt-2" controlId="exampleForm.ControlInput5">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter here"
                                    value={formData && formData.szLastName}
                                    onChange={(e) => setFormData({ ...formData, szLastName: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4 mt-2" controlId="exampleForm.ControlInput5">
                                <Form.Label>Brief Description:</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter here"
                                    value={formData && formData.szProfileDesc}
                                    onChange={(e) => setFormData({ ...formData, szProfileDesc: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4 mt-2" controlId="exampleForm.ControlInput5">
                                <Form.Label>Your Website URL</Form.Label>
                                <Form.Control type="text" placeholder="Enter here"
                                    value={formData && formData.szExternalProfileURL}
                                    onChange={(e) => setFormData({ ...formData, szExternalProfileURL: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="exampleForm.ControlInput6">
                                <Form.Label>Your Privacy URL</Form.Label>
                                <Form.Control type="text" placeholder="Enter here"
                                    value={formData && formData.szPrivacyURL}
                                    onChange={(e) => setFormData({ ...formData, szPrivacyURL: e.target.value })}
                                />
                            </Form.Group>

                            <button className={styles.subscriptionbtn} onClick={handleSubmit}>Save</button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer />
            <ChangePasswordModal show={show} handleClose={handleClose} />
            <ConfirmModal show={showConfirm} handleClose={() => setShowConfirm(false)} handleAction={handleActionConfirm} data={'0'} />
            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message={message} toasticon={faCheckCircle} />
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message={message} toasticon={faBan} />
        </div>

        </>

    )
}

export default Profile;