import React, { useEffect, useRef, useState } from 'react';
import styles from './assesment.module.css';
import { Form, Modal, Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import { Offcanvas } from 'react-bootstrap';
import { functionService } from '../../Context/functions';
import { useParams } from "react-router-dom";
import TextEditor from '../../Components/TextEditor';
import Toaster from '../../Components/Toaster';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import WarningIcon from '../../assets/images/warning.png';

import arrowdowncollapse from '../../assets/images/arrowdowncollapse.svg';
import editimage from '../../assets/images/editicon.svg';
import deleteimage from '../../assets/images/deleteicon.svg';
import FeedbackList from './FeedbackList';



function QuestionFeedback(props) {
    // let question = props.currentQuestion;

    const [open, setOpen] = useState(false);

    const [mappingList, setMappingList] = useState();
    const [disabled, setDisabled] = useState(false);
    const [questFormData, setQuestFormData] = useState({});
    const params = useParams();
    const tableRef = React.createRef();
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const [successMessage, setSuccMessage] = useState("Updated Successfully!");
    const [editorKey, setEditorKey] = useState(0);
    const [editorText, setEditorText] = useState('');
    const [feedbackID, setFeedBackID] = useState(0);
    const [showFeedback, handleFeedbackClose] = useState(false);
    const [feedbackFormShow, setFeedbackFormShow] = useState(false);
    const defaultData = {
        "assessmentId": params.id,
        "userId": 0,
        "lQuestionId": props.currentQuestion.m_lQuestionId,
        "szRangeId": "0",
        "szStartScore": "",
        "szEndScore": "",
        "szFeedbackText": ""
    }
    const [formData, setFormData] = useState(defaultData);

    const removefeebackitem = (data) => {
        handleFeedbackClose(true);
        setFeedBackID(data.m_lFeedBackTextId);
    }


    // const handleGetList1 = ()=>{
    //     setMappingList(question?.m_listRangeFeedbackTexts);
    //     setEditorText('');
    //     setFormData(defaultData);
    //     setFeedbackFormShow(false);

    // }


    const handleGetList = async () => {
       
        // props.setLoader(true);
      
        setMappingList(props.currentQuestion?.m_listRangeFeedbackTexts);
        setEditorText('');
        setFormData(defaultData);
        setFeedbackFormShow(false);
        /*  let res = await functionService.post('Question/getQuestionRangeFeedbackTexts',
              {
                  "assessmentId": params.id,
                  "userId": 0,
                  "lQuestionId": props.currentQuestion.m_lQuestionId
              }
          )
          //console.log("feedbackres", questFormData)
          if (res !== false && res.status !== false) {
              if (res.data.data.statusCode === 200) {
                  let data = JSON.parse(res.data.data.result);
                  setMappingList(data.m_listRangeFeedbackTexts);
                  setEditorText('');
                  setFormData(defaultData);
                  setFeedbackFormShow(false);
  
  
                  //console.log("data",data);
              }
          } else {
              if (res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')) {
                  localStorage.removeItem('currentUser');
                  localStorage.removeItem('token');
                  window.location = "/login";
                  return;
              }
          }
          props.setLoader(false);*/
    }
    const removeFeedback = async () => {
        props.setLoader(true);
        let dataObj = {
            "assessmentId": params.id,
            "userId": 0,
            "lQuestionId": props.currentQuestion.m_lQuestionId,
            "szRangeId": feedbackID + "",
            "szStartScore": "string",
            "szEndScore": "string",
            "szFeedbackText": "string"
        }
        let res = await functionService.post('Question/removeQuestionFeedbackRange', dataObj);
        if (res.status === true) {
            let response = JSON.parse(res.data.data.result);
            props.updateQuestionTostate(response);
            handleGetList();
            setSuccMessage("Successfully Removed!!");
            setShowToast(true);
            handleFeedbackClose(false);
        }
        props.setLoader(false);
    }
    useEffect(() => {
        if (props.currentQuestion) {
            setQuestFormData(props.currentQuestion);
        }
        setFormData(defaultData);
    }, [props.currentQuestion]);

    useEffect(() => {
        if (props.showfeedback === true) {
            handleGetList();
        }
    }, [props.showfeedback]);

    const handleEdit = (data) => {
        let dataObj = { ...formData };
        dataObj.szRangeId = data.m_lFeedBackTextId + "";
        dataObj.szStartScore = data.m_dStartScore + "";
        dataObj.szEndScore = data.m_dEndScore + "";
        dataObj.szFeedbackText = data.m_szFeedbackText;
        setEditorText(data.m_szFeedbackText);
        dataObj.userId = 1;
        setFormData(dataObj);
        tableRef.current.scrollTop = 0;
        setFeedbackFormShow(true);

    }
    //console.log("handlesubmit",editorKey)
    const handleSubmit = async () => {
        if (disabled === true) { return false; }
        setDisabled(true);
        props.setLoader(true);
        formData.userId = 0;
        //formData.szFeedbackText = editorText; // manish - get the editor text
        let res = await functionService.post('Question/saveQuestionFeedbackRange', formData);
        if (res !== false && res.status !== false) {
            //console.log("feed", res)
            if (res.data.data.statusCode === 200) {
                setFeedbackFormShow(false);
                setShowToast(true);
                setFormData(defaultData);
                let response = JSON.parse(res.data.data.result);
                props.updateQuestionTostate(response);
                handleGetList();
        setMappingList(response.m_listRangeFeedbackTexts);
                

            
                setEditorText('');
                setEditorKey(new Date().getTime());
            } else {
                setShowToast1(true)
            }
        } else {
            if (res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                window.location = "/login";
                return;
            } else {
                setShowToast1(true);
            }
        }
        props.setLoader(false);
        setDisabled(false);
    }
    const handleTextData = (data) => {
        let dataArray = { ...formData };
        dataArray.szFeedbackText = data.toString();
        //setEditorText(dataArray.szFeedbackText); // manish - commented because this was resetting the cursor in the texteditor everytime
        setFormData(dataArray);
        
    }
    return (
        <>
            <Offcanvas show={props.showfeedback} placement='end' className={styles.scorecanvas}>
                <Offcanvas.Header className={styles.scorefeedbackheader}>
                    <Offcanvas.Title className={styles.feedbackcanvasttl}> Feedback   {((mappingList && mappingList.length !== 0)) && <span className={styles.addNewFeedback}
                        onClick={() => setFeedbackFormShow(!feedbackFormShow)}>Add New  <FontAwesomeIcon icon={faAngleDown} className={feedbackFormShow === true ? "rotate" : "norotate"} />   </span>}

                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={styles.canvasfeedbackbody} ref={tableRef}>
                    {((mappingList && mappingList.length === 0) || feedbackFormShow === true) &&
                        <div className={styles.feedbackinnerdata}>
                            <p className={styles.feedbackboxquestion}>{(questFormData && typeof questFormData.m_szQuestionText !== "undefined") ? questFormData.m_szQuestionText : ''}</p>

                            <Form className={styles.inputrow}>
                                <div className={styles.inputinner}>
                                    <Form.Group className={styles.setinputwidth} controlId="graterscore">
                                        <Form.Label>Score greater than:</Form.Label>
                                        <Form.Control type="text" placeholder="i.e. 1"
                                            onChange={(e) => { setFormData({ ...formData, szStartScore: e.target.value }) }}
                                            value={formData.szStartScore}
                                        />
                                    </Form.Group>
                                    <Form.Group className={styles.setinputwidth} controlId="lessscore">
                                        <Form.Label>Score less than or equal to:</Form.Label>
                                        <Form.Control type="text" placeholder="i.e. 1"
                                            onChange={(e) => { setFormData({ ...formData, szEndScore: e.target.value }) }}
                                            value={formData.szEndScore}
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                                    <Form.Label>Feedback Texts</Form.Label>
                                    {/* <Form.Control as="textarea" rows={3} 
                                        onChange={(e)=>{ setFormData({...formData,szFeedbackText:e.target.value})}}
                                        value={formData.szFeedbackText}
                                        /> */}

                                    <TextEditor
                                        datas={editorText + ""}
                                        classes="dimDescription"
                                        formData={formData}
                                        editorKey={editorKey}
                                        // setFormData={setFormData}
                                        handleTextData={handleTextData}
                                    //dataKey='szRatingBandDesc'
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                    }
                    {mappingList && mappingList.map((obj, index) => (
                        <div className={styles.feedbackupdatebox} key={index}>
                           
                            <FeedbackList obj={obj} handleEdit={handleEdit} removefeebackitem={removefeebackitem} />




                        </div>
                    ))}



                </Offcanvas.Body>
                <div className={styles.scoringBodybtn}>
                    <Button className={styles.bgwhitebtn} onClick={props.handleClose}>Cancel</Button>{' '}
                    <Button className={styles.scoringbtns} onClick={handleSubmit}>Save</Button>{' '}
                </div>
            </Offcanvas>
            <Modal show={showFeedback} onHide={() => handleFeedbackClose(false)}>

                <Modal.Body className={styles.textcenter}>
                    <div className={styles.modelbody_deletepopup}>

                        <h2>Are you sure?</h2>
                        <p></p>

                        <div className={styles.modelbody_button_main}>
                            <Button variant="light" onClick={() => handleFeedbackClose(false)}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={() => { removeFeedback() }}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message={successMessage} toasticon={faCheckCircle} />
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message="Updation Failed!!" toasticon={faBan} />
        </>
    );
}

export default QuestionFeedback;
