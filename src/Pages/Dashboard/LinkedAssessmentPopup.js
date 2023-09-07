import React, { useEffect, useRef, useState } from 'react';
import styles from '../Assesment/assesment.module.css';
import { Button } from "react-bootstrap";
import { Offcanvas } from 'react-bootstrap';
import { functionService } from '../../Context/functions';
import { useParams } from "react-router-dom";
import TextEditor from '../../Components/TextEditor';
import Toaster from '../../Components/Toaster';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '../../Components/Confirmmodal/ConfirmModal'
import Form from 'react-bootstrap/Form';

function LinkedAssessmentPopup(props) {

    const params = useParams();
    const tableRef = React.createRef();
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const [successMessage, setSuccMessage] = useState("Updated Successfully!");
    const [showfeedback, setShowfeedback] = useState(false);
    // const [isChecked, setIsChecked] = useState({ id: null, status: false });

    const [assesmentList, setAssesmentList] = useState([]);
    const [deleted, setDeleted] = useState(0);

    const [loader, setLoader] = useState(false);

    const [checkedState, setCheckedState] = useState([]);

   
    const inputNameRef = useRef(null)
    const inputDescRef = useRef(null)
    const [show, setShow] = useState(false)
    
    const handleOnChange = (event, position) => {
        const handleCheckBoxValue = event.target.value;

      
        let preData = checkedState;
        const checked = event.target.checked;
        if (checked) {
            preData.push(handleCheckBoxValue);

        } else {
            preData.pop(handleCheckBoxValue);

        }
        setCheckedState(preData);


    };
    
    const handleSubmit = async () => {
        setShow(false)
        props.setLoader(true);
        props.setShowfeedback(false)

        let formData = {
            lEvalinatorId: props.predefinedValue?.m_lEvalinatorId,
            szName: inputNameRef.current.value,
            szDesc: inputDescRef.current.value,
            nChartType: 0,
            listMappedAssessments: checkedState,

        }

        let res = await functionService.post('Assessment/saveLinkedAssessment', formData);

        if (res !== false && res.status !== false) {
            setShowToast(true);
            props.getData()
        } else {
            setShowToast1(true);
        }


        props.setLoader(false);
    }

    const getData = async () => {
        setLoader(true);
        let res = await functionService.post('Assessment/getAssessmentsList');
        if (res && res.status === true) {
            //console.log("getAssessmentsList",JSON.parse(res.data.data.result));					
            setAssesmentList(JSON.parse(res.data.data.result));
            let abc = JSON.parse(res.data.data.result);
            var temp = [];
            abc.forEach((element, index) => {
                let found = props.m_listTools?.find(m_l => m_l === element.m_lSurveyId);
                if (found > 0) {
                    temp.push(element.m_lSurveyId);
                }

            });
            //setCheckedState(new Array(Object.keys(abc).length).fill(false));
            setCheckedState(temp);


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

    useEffect(() => {
        localStorage.setItem('currentStep', 'false');
        if (localStorage.getItem('currentUser')) {
            //user = localStorage.getItem('currentUser');
            getData();
        }
    }, [deleted]);

    


    // const getSelectValue = (id) => {
    //     let found = props.m_listTools?.find(element => element === id);
    //     if (found > 0) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    
    return (
        <>
            <Offcanvas show={props.showfeedback} placement='end' className={styles.scorecanvas}>
                <Offcanvas.Header className={styles.scorefeedbackheader}>
                    <Offcanvas.Title className={styles.feedbackcanvasttl}> Create Linked Assessment
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={styles.canvasfeedbackbody} ref={tableRef}>
                    <Form method="post" className={styles.blacktemplete} >
                        <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                            <Form.Label> Name</Form.Label>
                            <Form.Control defaultValue={props.predefinedValue?.m_szEvalinatorName} ref={inputNameRef} className={styles.formControl} type="text" placeholder="Enter assesment name" name="name" />

                        </Form.Group>


                        <Form.Group className="mb-3 relative">
                            <Form.Label> Description </Form.Label>

                            <Form.Control ref={inputDescRef}
                                defaultValue={props.predefinedValue?.m_szEvalinatorDesc}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}

                                name='description'
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 relative"  >
                            <Form.Label> Select assessments</Form.Label>

                            {

                                assesmentList.map((obj, index) => (
                                    <>
                                    {console.log('checkedState', checkedState[index])}
                                        <Form.Check type="checkbox" key={index} value={obj.m_lSurveyId} aria-label="option 1" label={obj.m_szSurveyName} 
                                            defaultChecked={(checkedState[index])}
                                            onChange={(ev) => handleOnChange(ev, index)} />

                                    </>
                                ))
                            }


                        </Form.Group>
                    </Form>
                </Offcanvas.Body>
                <div className={styles.scoringBodybtn}>
                    <Button className={styles.bgwhitebtn} onClick={props.handleClose}>Cancel</Button>{' '}
                    <Button className={styles.scoringbtns} onClick={() => setShow(true)}>Save</Button>{' '}
                </div>
            </Offcanvas>
            <ConfirmModal
                show={show}
                handleClose={() => setShow(false)}
                handleAction={handleSubmit}
                data={"0"}
            />

            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message={successMessage} toasticon={faCheckCircle} />
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message="Updation Failed!!" toasticon={faBan} />
        </>
    );
}

export default LinkedAssessmentPopup;
