import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { functionService } from '../../../Context/functions';
import styles from '../settingstyle.module.css';
import Toaster from '../../../Components/Toaster';
import TextEditor from '../../../Components/TextEditor';

import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
function FeedbackForm(props) {
    const params = useParams();
    const[disabled,setDisabled]=useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const defaultArr = {
        "assessmentId": params.id,
        "lDimensionId": props.m_lDimensionId,
        "lRangeId": props.id,
        "startScore": props.m_dStartScore || '',
        "endScore": props.m_dEndScore || '',
        "feedbackText": props.m_szFeedbackText
      };
    const[formData,setFormData]=useState(defaultArr);

   const handleSubmit = async ()=>{
    if(disabled === true) { return false;}
    setDisabled(true);
    props.setLoader(true);
    if(formData.startScore === ""){ formData.startScore = 0;}
    if(formData.endScore === ""){ formData.endScore = 0;}
    let res = await functionService.post('Dimensions/saveFeedbackRange',formData);
    if(res !== false && res.status !== false){
       props.getAllDim();
       setShowToast(true)       
       if(props.id === 0){
        setFormData(defaultArr);
       } 
       formData.feedbackText ="";    
      props.handleFeedbackOpen(false)  
    }
    else{
        setShowToast1(true)
        if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            window.location = "/login";
            return;
          }
    }
    //props.handleFeedbackOpen(false)
    setDisabled(false);
    props.setLoader(false);
   }
   const handleCancel = () =>{
    props.handleFeedbackOpen(false)
   }

   const handleTextData = (data) => {
    let dataArray = {...formData};
    dataArray.feedbackText = data.toString();
    
    if(dataArray && dataArray.assessmentType !== ''){
            setFormData(dataArray)
    }
} 
    return (
    <>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                For scores greater than 
                <Form.Control type="number" placeholder="0" value={formData.startScore} onChange={(e)=>setFormData({...formData,startScore:e.target.value})}/> 
                Score less than or equal to: 
                <Form.Control type="number" placeholder="0" value={formData.endScore} onChange={(e)=>setFormData({...formData,endScore:e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               {/*  <Form.Control as="textarea" rows={3} placeholder="Share more information with users"
                value={formData.feedbackText} onChange={(e)=>setFormData({...formData,feedbackText:e.target.value})}
                /> */}
            <TextEditor
            datas={props.m_szFeedbackText !== undefined && props.m_szFeedbackText + ""}
            classes="feedbackDescription"
            formData={formData}
            //setFormData={setFormData}
            handleTextData={handleTextData}            
          />
            </Form.Group>
            <div className={styles.feedbackButtongroup}>
            <Button className={styles.btn_skyblue} onClick={handleSubmit}>Save</Button>
            <Button className={styles.btn_cancel} onClick={handleCancel}>Cancel</Button>
            </div>
        </Form>
       <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Updated Successfully!!" toasticon={faCheckCircle}/>
       <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message="Updation Failed!!" toasticon={faBan}/>
    </>   
	);
}

export default FeedbackForm;
