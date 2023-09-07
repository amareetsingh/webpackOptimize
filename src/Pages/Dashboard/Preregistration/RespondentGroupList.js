
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState, useRef } from 'react';
import styles from '../../Templates/templates.module.css'
import Footer from '../../../Components/Footer'
import { Breadcrumb } from "react-bootstrap";
import Header from '../../../Components/Header';
import { Link } from 'react-router-dom';
import styless from '../dashboard.module.css';
import pre3dot from './pre3dot.svg';
import Uparrow from './Uparrow.svg'
import DownArrow from './DownArrow.svg'
import { Modal } from "react-bootstrap";
import { functionService } from '../../../Context/functions';
import Collapse from "react-bootstrap/Collapse";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateModeEnum } from 'chart.js';
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from '../../../Components/Confirmmodal/ConfirmModal'
import { faEdit } from "@fortawesome/free-solid-svg-icons";


const RespondentGroupList = (props) => {
    const [loader, setLoader] = useState(false);
    const [templateId, setTemplateId] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [guidId, setGuidId] = useState(0);
    const [errors, setErrors] = useState({});
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const [showtoast, setShowToast] = useState(false);
    // const [groupList, setGroupList] = useState([]);
    const [groupUser, setGroupUser] = useState([])
    const [showss, setShowss] = useState({ id: 'null', status: false });
    const [confromModel, setConfromModel] = useState({ Uid: null, Gid: null, status: false });
    const [confromModelg, setConfromModelg] = useState({ Gid: null, status: false });
    const [moveUser, setMoveUser] = useState({ Uid: null, OGid: null, status: false })
    const [copyUser, setCopyUser] = useState({ Uid: null, status: false })
    const [addUser, setaddUser] = useState({ Gid: null, status: false })
    const [editGroup, setEditGroup] = useState({ Gid: null, name: null, status: false })
    const [selectbox, setSelectbox] = useState()
    const [surveyId, setSurveyId] = useState(0)
    const inputRef = useRef(null);
    const evalRef = useRef(null);
    const wrapperRef = useRef(null);
    const [evalinatorId, setEvalintorId] = useState(0);
    const [assesmentList, setAssesmentList] = useState([]);
    const [deleted, setDeleted] = useState(0);
    const [linkedAssesmentList, setLinkedAssesmentList] = useState([]);
    const [checkBoxValue, setCheckBoxValue] = useState([]);
    const [checkBoxValue1, setCheckBoxValue1] = useState([]);
    const [editConfrom, setEditConform] = useState(false);
    const GroupNameRef = useRef(null);
    const [ addMember, setAddMember] = useState(false)
    // const [ addGroup, setAddGroup] = useState(false)

    useEffect(() => {
        let found = props.obj.listAssessments.map(element => {
            return element.m_lSurveyId
        });
        let found1 = props.obj.listEvalinators.map(element => {
            return element.m_lEvalinatorId
        });
        setCheckBoxValue1(found)
        setCheckBoxValue(found1)

    }, [])





    //  ***************AssessmentUsers >  Get Group User  *******

    const getUserGroupItem = async (lGroupId) => {
        // if (lGroupId > 0) {

        //     setSurveyId(inputRef.current.value)

        //     setEvalintorId(evalRef.current.value)

        // }

        setOpen(!open);

        if (open) return;
        setLoader(true);
        setDisabled(true);
        //props.setLoader(true);

        let res = await functionService.post("AssessmentUsers/getUsersByGroup", { "lGroupId": lGroupId });

        if (res.status === true) {
            setShowToast(true);
            let data = JSON.parse(res.data.data.result);
            let data1 = data.listUsers;
            setGroupUser(data1)
        } else {
            if (res.hasOwnProperty("data")) {
            }
            setShowToast1(true);
        }

        setLoader(false);
        //props.setLoader(false);

    };

    const handleClose = () => {
        setShow(false);
        setGuidId(0);
        setConfromModel(false)
        setMoveUser(false)
        setaddUser(false)
        setCopyUser(false)
        setEditGroup(false)
    }

    // ******************************remove api *****************
    const removeUsers = async (userId, GroupId) => {

        setConfromModel({ Uid: userId, Gid: GroupId, status: true })
        setShowss(false)
    };


    const handleRemove = async () => {
        setConfromModel(false);
        setDisabled(true);
        let formData = {
            "lUserId": confromModel.Uid,
            "lNewGroupId": 0,
            "lOldGroupId": confromModel.Gid

        };

        let res = await functionService.post(
            "AssessmentUsers/removeUserFromGroup",
            formData
        );

        let filterdata = groupUser.filter((items) => {
            return items.m_lUserId !== confromModel.Uid
        })
        setGroupUser(filterdata)


        if (res.status === true) {
            // console.log("succes", res)
            setShowToast(true);
        } else {
            if (res.hasOwnProperty("data")) {
                // (res.data.data.result);
            }
            setShowToast1(true);
        }
    }



    // *************move user to group *********


    const moveUserGroup = async (id, oldGroupId) => {
        setMoveUser({ Uid: id, OGid: oldGroupId, status: true })
        setShowss(false)

    }
    const MoveUserToGroup = async (e) => {
        e.preventDefault();
        setMoveUser({ status: false })
        setDisabled(true);
        let formData = {
            "lUserId": moveUser.Uid,
            "lNewGroupId": selectbox,
            "lOldGroupId": moveUser.OGid,
        };

        let res = await functionService.post(
            "AssessmentUsers/moveUserToGroup",
            formData
        );




        let filterdata = groupUser.filter((items) => {
            return items.m_lUserId != moveUser.Uid
        })

        setGroupUser(filterdata)

        if (res.status === true) {
            // console.log("succes", res)
            setShowToast(true);
        } else {
            if (res.hasOwnProperty("data")) {
                // (res.data.data.result);
            }
            setShowToast1(true);
        }

    }
    // ********************copy to group ***************
    const copyToGroup = async (id) => {
        setCopyUser({ Uid: id, status: true })
        setShowss(false)
    }

    const copyUserTogroup = async (e) => {
        e.preventDefault()
        setCopyUser({ status: false });
        setDisabled(true);
        let formData = {
            "lUserId": copyUser.Uid,
            "lGroupId": selectbox,
        };



        let res = await functionService.post(
            "AssessmentUsers/copyUserToGroup",
            formData
        );

        if (res.status === true) {
            // console.log("succes", res)
            setShowToast(true);
        } else {
            if (res.hasOwnProperty("data")) {
                // (res.data.data.result);
            }
            setShowToast1(true);
        }

    }


    //  *************************  add user in group *************
    const addUsers = (id) => {
        setaddUser({ Gid: id, status: true })
    }
    const AddUserToGroup = async () => {
        // debugger;
        setAddMember(false)
        let user_name = document.getElementById('user_name').value;
        let last_name = document.getElementById('last_name').value;
        let user_email = document.getElementById('user_email').value;
        if (user_name == "" || user_email == "") {
            alert("Please fill in required fields");
            return;
        }


        setaddUser(false);
        setDisabled(true);
        let formData = {
            "lUserId": 0,
            "lGroupId": addUser.Gid,
            "szFirstName": user_name,
            "szLastName": last_name,
            "szEmailAddress": user_email,
        };

        let res = await functionService.post(
            "AssessmentUsers/createUserForGroup",
            formData
        );

        // let response = Object.keys(res.data.result)  

        if (res.status === true) {
            // console.log("succes", res)
            setShowToast(true);
        } else {
            if (res.hasOwnProperty("data")) {
                // (res.data.data.result);
            }
            setShowToast1(true);
        }

    }

    // ************** remove group api **********
    const removeGroups = async (GroupId) => {

        setConfromModelg({ Gid: GroupId, status: true })
        setShowss(false)
    };
    const removeGroup = async () => {
        setConfromModelg(false)
        setConfromModel(false);
        setDisabled(true);
        let formData = {
            "lGroupId": confromModelg.Gid,
        };

        let res = await functionService.post(
            "AssessmentUsers/removeGroup",
            formData
        );
        // let filterdata = props.groupsList.filter((items) => {
        //     return items.m_lGroupId != confromModelg.Gid
        // })  
        // props.setgroupsList(filterdata) 
        if (res.status === true) {

            if (res.data.data.result == true) {
                let filterdata = props.groupsList.filter((items) => {
                    return items.m_lGroupId != confromModelg.Gid
                })
                props.setgroupsList(filterdata)

            }
            // console.log("succes", res)
            setShowToast(true);
        } else {

        }

    }


    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowss(false)

            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {

            document.removeEventListener("click", handleClickOutside);
        };
    });


    const getData = async () => {
        setLoader(true);
        let res = await functionService.post('Assessment/getAssessmentsList');
        if (res && res.status === true) {
            //console.log("getAssessmentsList",JSON.parse(res.data.data.result));					
            setAssesmentList(JSON.parse(res.data.data.result));
            // console.log('assessment list ', JSON.parse(res.data.data.result))
        }
        else {
            //if(res == null || (res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser'))){
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            window.location = "/login";
            return;
            //}
        }
        setLoader(false);
    }
    const getData1 = async () => {
        setLoader(true);
        //console.log("User from reducer", user);
        let res = await functionService.post('Assessment/getLinkedAssessments');
        if (res && res.status === true) {
            // console.log("getAssessmentsList", JSON.parse(res.data.data.result));
            setLinkedAssesmentList(JSON.parse(res.data.data.result));
            // console.log('linkedAssessment',JSON.parse(res.data.data.result) )
        }
        setLoader(false);
    }

    useEffect(() => {
        localStorage.setItem('currentStep', 'false');
        if (localStorage.getItem('currentUser')) {
            //user = localStorage.getItem('currentUser');
            getData();
            getData1();
        }
    }, [deleted]);

    const handleInputCheckBox = (event) => {
        const handleCheckBoxValue = event.target.value;
        const checked = event.target.checked;
        if (checked) {
            setCheckBoxValue([
                ...checkBoxValue, handleCheckBoxValue
            ]);
            
        } else {

            setCheckBoxValue(
                checkBoxValue.filter((id) => (id != handleCheckBoxValue))
            )
        }

    }


    const handleInput = (event) => {
        const handleCheckBoxValue = event.target.value;
        const checked = event.target.checked;

        if (checked) {
            setCheckBoxValue1([
                ...checkBoxValue1, handleCheckBoxValue
            ])
        } else {

            setCheckBoxValue1(
                checkBoxValue1.filter((id) => (id != handleCheckBoxValue))
            )
        }


    }

    const getSelectValue = (id) => {
        let found = props.obj.listAssessments.find(element => element.m_lSurveyId === id);

        if (found === undefined) {
            return false;
        } else {
            return true;
        }
    }
    const getSelectValue1 = (id) => {
        let found = props.obj.listEvalinators
            .find(element => element.m_lEvalinatorId === id);


        if (found === undefined) {
            return false;
        } else {
            return true;
        }
    }


    const saveGroup = async () => {
        setEditConform(false)
        setEditGroup(false)
        // console.log('listAssessment', checkBoxValue1)
        // console.log('listLinkedAssessment', checkBoxValue)
        // console.log('lGroupId', editGroup.Gid)
        // console.log('szGroupName', GroupNameRef.current.value)

        let formData = {
            lGroupId: editGroup.Gid,
            szGroupName: editGroup.name,
            listAssessments: checkBoxValue1,
            listLinkedAssessments: checkBoxValue
        }

        let res = await functionService.post(
            "AssessmentUsers/createGroup",
            formData
        );


        if (res.status === true) {
            props.handleGetGroup()

            setShowToast(true);
        } 
    }



    return (
        <>
            <ListGroup ref={wrapperRef} style={{ width: '100%' }}>
                <ListGroup.Item className={styless.listGroupItems}>
                    <div className={styless.groupName} ><strong>{props.obj.m_szGroupName}</strong> <storng>{` ${props.obj.m_nNumMembers} Members `
                    }</storng></div>
                    <div lassName={styless.ImgDiv}>
                        {props.obj.m_lGroupId > 0 ? <> <img className={styless.dotbtn} src={pre3dot} alt='logo' onClick={() => setShowss({ id: props.obj.m_lGroupId, status: !showss.status })} /> <Button
                            variant="outline-primary" aria-controls="example-collapse-text"
                            onClick={() => setEditGroup({ Gid: props.obj.m_lGroupId, name: props.obj.m_szGroupName, status: !showss.status })}   >
                            <FontAwesomeIcon icon={faEdit} size={"sm"} />
                        </Button> </> : null}

                        {showss.status && props.obj.m_lGroupId === showss.id ? <div style={{ right: '33px' }} className={styless.btnGroup} >

                            {props.obj.m_lGroupId > 0 ?
                                (
                                    <>
                                        <div className={styless.btnItems}>
                                            <a onClick={() => removeGroups(props.obj.m_lGroupId)} >Remove</a>
                                        </div>
                                    </>
                                ) : ""}
                        </div> : null
                        }
                        <Button
                            variant="outline-primary"
                            // className={styless.view_link}
                            onClick={() => getUserGroupItem(props.obj.m_lGroupId)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >

                            <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
                        </Button>


                        {/* <img onClick={() => getUserGroupItem(props.obj.m_lGroupId)} src={open ? Uparrow : DownArrow} className={styless.Uparrow} alt="" /> */}
                    </div>
                </ListGroup.Item>
                <Collapse in={open} className={styles.dashanalytics}>
                    <div id="example-collapse-text" >
                        <div className={styles.GroupContainer}>
                            <ListGroup.Item className={`${styless.listGroupItems} ${styless.listGroupHead}`}>
                                <strong>Members</strong>
                                <div  >

                                    <div className={styless.ViewButtonGroup}>
                                        {props.obj.m_lGroupId > 0 ?
                                            (
                                                <>
                                                    <Form.Select ref={evalRef} onChange={(e) => setEvalintorId(e.target.value)
                                                    }
                                                        aria-label=" How’s your social selling?" style={{ width: '250px' }}>
                                                        <option value=""> Select Linked Assessment </option>
                                                        {
                                                            props.obj.listEvalinators
                                                                .map((obj) => (

                                                                    <option value={obj.m_lEvalinatorId} >{obj.m_szEvalinatorName
                                                                    }</option>


                                                                ))
                                                        }

                                                    </Form.Select>
                                                    <a variant="outline-primary"
                                                        target="_blank" href={`/analyticsresultevalgroup?id=${evalinatorId}&groupId=${props.obj.m_lGroupId}`} className={evalinatorId === 0 ? `${styless.view_link} ${styless.btnDisabled}` : styless.view_link}>View</a>
                                                </>
                                            )
                                            : ""
                                        }

                                    </div>

                                    <div style={{ marginTop: '5px' }} className={styless.ViewButtonGroup}>

                                        {props.obj.m_lGroupId > 0 ?
                                            (
                                                <>
                                                    <Form.Select ref={inputRef} onChange={(e) => setSurveyId(e.target.value)
                                                    }
                                                        aria-label=" How’s your social selling?" style={{ width: '250px' }}>
                                                        <option value=""> Select Assessment </option>
                                                        {
                                                            props.obj.listAssessments.map((obj) => (

                                                                <option value={obj.m_lSurveyId} >{obj.m_szSurveyName}</option>


                                                            ))
                                                        }

                                                    </Form.Select>
                                                    <a variant="outline-primary"
                                                        target="_blank" href={`/analyticsresultgroup?id=${surveyId}&groupId=${props.obj.m_lGroupId}`} className={surveyId === 0 ? `${styless.view_link} ${styless.btnDisabled}` : styless.view_link}>View</a>
                                                </>
                                            )
                                            : ""
                                        }

                                    </div>
                                </div>

                                <Button onClick={() => addUsers(props.obj.m_lGroupId)} className={styless.view_link} >
                                    Add Members
                                </Button>
                            </ListGroup.Item  >
                            {
                                Object.values(groupUser).map((value) => (

                                    <ListGroup.Item className={styless.listGroupItems}>

                                        <p>{value.m_szFirstName} {value.m_szLastName} </p>
                                        <div className={styless.ListGroupGmailItem}>{value.m_szUserEmailAddress}
                                            <br />
                                            <span className='text-muted'>
                                                {(value && value.m_listProfileValues && value.m_listProfileValues).join(" | ")}
                                            </span>
                                        </div>

                                        <div >
                                            <img className={styless.dotbtn} onClick={() => setShowss({ id: value.m_lUserId, status: !showss.status })} src={pre3dot} alt='logo' />
                                        </div>
                                        {showss.status && value.m_lUserId === showss.id ? <div className={styless.btnGroup} >

                                            {props.obj.m_lGroupId > 0 ?
                                                (
                                                    <>
                                                        <div className={styless.btnItems}>
                                                            <a onClick={() => removeUsers(value.m_lUserId, props.obj.m_lGroupId)} >Remove</a>
                                                        </div>

                                                        <div className={styless.btnItems}>
                                                            <a onClick={() => moveUserGroup(value.m_lUserId, props.obj.m_lGroupId)} >move</a>
                                                        </div>

                                                    </>
                                                ) : ""}

                                            <div className={styless.btnItems}>

                                                <a onClick={() => copyToGroup(value.m_lUserId)} >copy</a>
                                            </div>

                                        </div> : null
                                        }
                                    </ListGroup.Item>
                                ))
                            }

                        </div>
                    </div>
                </Collapse>
            </ListGroup >

            {/* model show  */}
            < ConfirmModal
                show={confromModel.status}
                handleClose={() => setConfromModel(false)}
                handleAction={handleRemove}
                data={"0"}
            />
            <ConfirmModal
                show={confromModelg.status}
                handleClose={() => setConfromModelg(false)}
                handleAction={removeGroup}
                data={"0"}
            />
            <ConfirmModal
                show={editConfrom}
                handleClose={() => setEditConform(false)}
                handleAction={saveGroup}
                data={"0"}
            />
            <ConfirmModal
                show={addMember}
                handleClose={() => setAddMember(false)}
                handleAction={AddUserToGroup}
                data={"0"}
            />


            {/* *********************** add user in group ************ */}

            <Modal show={addUser.status} onHide={handleClose} className={styles.modalTemplete}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modal_header}>Add New User</Modal.Title>
                </Modal.Header>
                <Form method="post">
                    <Modal.Body className={styles.modalBody}>

                        <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                            <Form.Label>First Name*</Form.Label>
                            <Form.Control id='user_name' className={styles.formControl} type="text" placeholder="Enter first name" name="user_name" />

                            <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                            {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                        </Form.Group>
                        <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control id='last_name' className={styles.formControl} type="text" placeholder="Enter user last name" name="group_name" />

                            <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                            {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                        </Form.Group>
                        <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                            <Form.Label>Email Address*</Form.Label>
                            <Form.Control id='user_email' className={styles.formControl} type="email" placeholder="Enter user Email" name="user_email" />

                            <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                            {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer className={styles.modal_footer}>
                        <Button variant="primary"  onClick={()=>setAddMember(true)}>
                            Continue
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* **************************move user to group***************** */}
            <Modal show={moveUser.status} onHide={handleClose} className={styles.modalTemplete}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modal_header}>Move User</Modal.Title>
                </Modal.Header>
                <Form method="post" onSubmit={MoveUserToGroup}>
                    <Modal.Body className={styles.modalBody}>

                        <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                            <Form.Label>Select Group</Form.Label>
                            <Form.Select onChange={(e) => setSelectbox(e.target.value)} aria-label="Select group to move to" style={{ width: '256px' }}>
                                {/* <option>How’s your social selling?</option> */}
                                {
                                    props.groupsList.map((obj) => (
                                        <option value={obj.m_lGroupId}>{obj.m_szGroupName}</option>
                                    ))
                                }
                            </Form.Select>



                            <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                            {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer className={styles.modal_footer}>
                        <Button variant="primary" type="submit" onClick={()=>setAddMember(true)} >
                            Continue
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* ***************copy user to grup model *********** */}
            <Modal show={copyUser.status} onHide={handleClose} className={styles.modalTemplete}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modal_header}>Copy User To Another Group</Modal.Title>
                </Modal.Header>
                <Form method="post" onSubmit={copyUserTogroup}>
                    <Modal.Body className={styles.modalBody}>

                        <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                            <Form.Label>Select Group</Form.Label>
                            <Form.Select onChange={(e) => setSelectbox(e.target.value)} aria-label="Select Group" style={{ width: '256px' }}>
                                {/* <option>How’s your social selling?</option> */}
                                {
                                    props.groupsList.map((obj) => (
                                        <option value={obj.m_lGroupId}>{obj.m_szGroupName}</option>
                                    ))
                                }
                            </Form.Select>
                            <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                            {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer className={styles.modal_footer}>
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* ***************edit group *********** */}
            <Modal show={editGroup.status} onHide={handleClose} className={styles.modalTemplete}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modal_header}>Edit Group</Modal.Title>
                </Modal.Header>
                <Form method="post" >
                    <Modal.Body className={styles.modalBody}>

                        <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                            <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                                <Form.Label>Group Name </Form.Label>
                                <Form.Control ref={GroupNameRef} defaultValue={editGroup.name} id='last_name' className={styles.formControl} type="text" placeholder="Enter user last name" name="group_name" />

                                <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                                {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                            </Form.Group>
                            <Form.Group className="mb-3 relative" >
                                <Form.Label > Select assessments</Form.Label>

                                {
                                    assesmentList.map((obj, index) => (
                                        <>
                                            <Form.Check key={index} defaultChecked={getSelectValue(obj.m_lSurveyId
                                            )} value={obj.m_lSurveyId} aria-label="option 1" label={obj.m_szSurveyName} onChange={handleInput} />

                                        </>
                                    ))
                                }




                            </Form.Group>
                            <Form.Group className="mb-3 relative" >
                                <Form.Label> Select Linked  assessments</Form.Label>

                                {
                                    linkedAssesmentList.map((obj, index) => (
                                        <>
                                            <Form.Check key={index} defaultChecked={getSelectValue1(obj.m_lEvalinatorId)} value={obj.m_lEvalinatorId
                                            } aria-label="option 1" label={obj.m_szEvalinatorName
                                            } onChange={(event)=>handleInputCheckBox(event)} />

                                        </>
                                    ))
                                }

                            </Form.Group>
                            <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                            {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer className={styles.modal_footer}>
                        <Button variant="primary" onClick={()=> setEditConform(true)}>
                            Continue
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default RespondentGroupList;