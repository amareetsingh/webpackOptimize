import React, { useState, useEffect, useRef } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './login.module.css';
import styless from '../../Stripe_com/stripe.module.css'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { functionService } from '../../Context/functions';
import Toaster from '../../Components/Toaster';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import Key from '../../assets/images/lock.png';


import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Key from "../../assets/images/lock.png";
// import { useAuthState } from "../Context";
// import { functionService } from "../Context/functions";
import { load } from 'recaptcha-v3';
import { GOOGLE_RECAPTCHAV3_SITE_KEY } from '../../Components/API'

function Register(props) {
    const ref = useRef(null);
    const userDetails = useAuthState();
    const defaultData = {
        szFirstName: "",
        szLastName: "",
        szEmail: Boolean(userDetails.token) ? userDetails.email : "",
        szPassword: "",
        bPrivacy: false,
        bTerms: false,
        szCaptcha: "string",
        szClientIP: "string",
        szStripePriceId:"STARTER",
    };
    const defaultStripeData = {
        priceIdentifier: "STARTER",
        szEmail: Boolean(userDetails.token) ? userDetails.email : "",

    };
    //console.log("defaultData",defaultData);
    const [disabled, setDiabled] = useState(false);

    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(defaultData);
    const [message, setMessage] = useState("");
    const [showtoast1, setShowToast1] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showtoast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);

    const handleSubmit = async (e) => {

        const recaptcha = await load(GOOGLE_RECAPTCHAV3_SITE_KEY)
        const token = await recaptcha.execute()
        formData["szCaptcha"] = token;

        if (disabled) {
            return;
        }

        let data = functionService.validateError(formData);
        if (formData["bPrivacy"] === false) {
            data["bPrivacy"] = true;
        }
        if (formData["bTerms"] === false) {
            data["bTerms"] = true;
        }
        if (Object.keys(data).filter((x) => data[x] === true).length > 0) {
            setErrors(data);
            return;
        } else {
            setErrors({});
        }

        setDiabled(true);
        setMessage("");
        setLoader(true);
        let res = await functionService.post("User/registerUser", formData);
        setDiabled(false);
        setLoader(false);
        if (res.status !== false) {
            if (res.data.data.statusCode !== 200) {
                setMessage(res.data.data.result);
                return;
            }
            // setShowToast(true);    

            // set up stripe session
            //res = await functionService.post("Payment/CreateStripeSession", defaultStripeData);
            let results = JSON.parse(res.data.data.result);
            let stripeUrl= (results && results.stripeSessionURL) ? results.stripeSessionURL : "";
            if(stripeUrl != ''){
                window.location = stripeUrl;
            }
            else{ 
                window.location = "/thank-you?success=false";
            }
            // setShow(false);
            // ref.current.click();
        } else {
            if (
                res.error &&
                res.error.response &&
                res.error.response.status === 401 &&
                localStorage.getItem("currentUser")
            ) {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("token");
                window.location = "/login";
                return;
            } else {
                setMessage(res.data.data.result);
            }
        }

        //ref.current.click();
    };
    useEffect(() => {
        if (Boolean(userDetails.token)) {
            setFormData({
                ...formData,
                szEmail: Boolean(userDetails.token) ? userDetails.email : "",
            });
        }
    }, [userDetails]);

    return (
        <>
            <Header loader={loader} />
            <div className={styles.container}>
                <div>
                    <div className={styles.logo_header}>

                        <h1>Interactive assessments for experts</h1>
                        <p>Sell and engage as an expert should. Generate more leads and upgrade every customer touchpoint into a conversation.</p>
                    </div>

                    <div className={styles.loginPage}>
                        <Form method="post">
                            <Modal.Body className={styless.modalBody}>
                                <h4>Sign up for an account</h4>
                                <p className={styless.modeltxt}>
                                    Already have an account?
                                    <Link to="/">Log In</Link>
                                </p>
                                <Form.Group
                                    className={styless.modalinput}
                                    controlId="exampleForm.ControlInput1"
                                >
                                    {/* <Form.Label>First Name</Form.Label> */}
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(e) => {
                                            setFormData({ ...formData, szFirstName: e.target.value });
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faUser} />
                                    {errors && errors.hasOwnProperty("szFirstName") && (
                                        <p className="error errcont">Please fill required field!</p>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className={styless.modalinput}
                                    controlId="exampleForm.ControlInput2"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(e) => {
                                            setFormData({ ...formData, szLastName: e.target.value });
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faUser} />
                                    {errors && errors.hasOwnProperty("szLastName") && (
                                        <p className="error errcont">Please fill required field!</p>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className={styless.modalinput}
                                    controlId="exampleForm.ControlInput3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        onChange={(e) => {
                                            setFormData({ ...formData, szEmail: e.target.value });
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    {errors && errors.hasOwnProperty("szEmail") && (
                                        <p className="error errcont">Please fill required field!</p>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className={styless.modalinput}
                                    controlId="exampleForm.ControlInput4"
                                >
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => {
                                            setFormData({ ...formData, szPassword: e.target.value });
                                        }}
                                    />
                                    <img src={Key} />
                                    {errors && errors.hasOwnProperty("szPassword") && (
                                        <p className="error errcont">Please fill required field!</p>
                                    )}
                                    <p className={styless.passHint}>
                                        Password must be longer than 8 characters, and must contain at
                                        least 1 uppercase letter and 1 special character such as - ! " $
                                        % ^ @
                                    </p>
                                </Form.Group>
                                <div className={styless.modalinput}>
                                    <Form.Group
                                        className={styless.registraioncheckbox}
                                        controlId="exampleForm.ControlInput5"
                                    >
                                        <Form.Control
                                            type="checkbox"
                                            onChange={(e) => {
                                                setFormData({ ...formData, bPrivacy: e.target.checked });
                                            }}
                                        />
                                        <label>
                                            I have read and agree with the <a href="/">privacy policy</a>
                                        </label>
                                    </Form.Group>
                                    {errors && errors.hasOwnProperty("bPrivacy") && (
                                        <p className="error errcont">Please accept Privacy & Policy!</p>
                                    )}
                                </div>
                                <div className={styless.modalinput}>
                                    <Form.Group
                                        className={styless.registraioncheckbox}
                                        controlId="exampleForm.ControlInput6"
                                    >
                                        <Form.Control
                                            type="checkbox"
                                            onChange={(e) => {
                                                setFormData({ ...formData, bTerms: e.target.checked });
                                            }}
                                        />
                                        <label>
                                            I have read and agree with the{" "}
                                            <a href="/">Terms & Condition</a>
                                        </label>
                                    </Form.Group>
                                    {errors && errors.hasOwnProperty("bTerms") && (
                                        <p className="error errcont">
                                            Please accept Terms & Condition!
                                        </p>
                                    )}
                                </div>

                                {message !== "" && <p className={styless.stripeerror}>{message}</p>}

                                <Button
                                    // btnSize='large'
                                    // btnType='passive'
                                    variant="primary"
                                    type="button"
                                    onClick={handleSubmit}>
                                    Continue
                                </Button>
                            </Modal.Body>
                        </Form>
                    </div>
                </div>
                <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message="Email sent Successfully!!" toasticon={faCheckCircle} />
                <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message={message} toasticon={faBan} />

            </div>
            <Footer />
        </>
    );
}

export default Register;
