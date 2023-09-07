import React, { useState } from 'react';
import { Button, Collapse, Form, Image, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { functionService } from '../../../Context/functions';
import Dimensionscorelist from '../Dimensionscorelist';
import styles from '../settingstyle.module.css';
import DimForm from './Dimform';
import FeedbackForm from './Feedbackform';
import Toaster from '../../../Components/Toaster';
import { faBan, faCheckCircle, faChevronDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import WarningIcon from '../../../assets/images/warning.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DimList({getAllDim,obj,formData,setFormData, setLoader,setCurrentAssesment,  currentAssesment }) {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const[modalData,handleModal]=useState({status:false,dimId:0});
    const[fdbkOpen,handleFeedbackOpen]=useState(false)
    const params = useParams();
    const[disabled,setDisabled]=useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const[errors,setErrors]=useState({});
    const handleOpen = ()=>{
        setOpen2(false);
        let defaultAttr = {
            "assessmentId": params.id,
            "lDimensionId": obj.m_lDimensionId,
            "szDimName": obj.m_szDimensionName,
            "szDimDesc": obj.m_szDimensionDesc,
            "szDimTagLine": obj.m_szDimensionTagLine
          };
          setFormData(defaultAttr);
        setOpen(!open);
    }
    const handleAdd = async()=>{
        let data = functionService.validateError({"szDimName":formData.szDimName});
        if(Object.keys(data).filter(x => data[x] === true).length > 0){ setErrors(data); return;} else{ setErrors({})} 	
        if(disabled === true){ return false;}
        setDisabled(true);
        setLoader(true);
        let res = await functionService.post('Dimensions/save',formData);
        if(res !== false && res.status !== false){
            setCurrentAssesment({...currentAssesment,m_dictDimensions:JSON.parse(res.data.data.result)});
            // getAllDim();
            //setOpen(false)
            setShowToast(true);
            obj.m_szDimensionName = formData.szDimName ;
            obj.m_szDimensionDesc = formData.szDimDesc ;
            obj.m_szDimensionTagLine = formData.szDimTagLine ;
        }else{
            setShowToast1(true)
            if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
				localStorage.removeItem('currentUser');
				localStorage.removeItem('token');
				window.location = "/login";
				return;
			  }
        }
        setDisabled(false);
        setLoader(false);
     } 
     const handleDelete = async()=>{
        if(disabled === true){ return false;}
        setDisabled(true);
        setLoader(true);
        let res = await functionService.post('Dimensions/removeDimensions',{
            "lAssessmentId": params.id,
            "lDimensionId": modalData.dimId
          });
        if(res !== false && res.status !== false){
            getAllDim();
            setOpen(false)
            setShowToast(true)
        }else{
            setShowToast1(true)
            if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
				localStorage.removeItem('currentUser');
				localStorage.removeItem('token');
				window.location = "/login";
				return;
			  }
        }
        setDisabled(false);
        setLoader(false);
        handleModal({status:false,dimId:0});
     }
   return (
        <>
                   <div className={styles.mianboxheaderratingbands1}>
                            <h4><span className={styles.taglineheading}>{obj.m_szDimensionName}</span></h4>
                            <div className={styles.rightsideeditremove}>                               
                                <span className={styles.btn_edit}  onClick={() => handleOpen()} aria-controls="example-collapse-text"  aria-expanded={open}> <FontAwesomeIcon icon={faEdit}  /> <span  className= {open === true ? "rotate" : "norotate"}></span></span>
                                <span className={styles.btn_remov}  onClick={() => {handleModal({status:true,dimId:obj.m_lDimensionId})}} > <FontAwesomeIcon icon={faTrash}  /> </span>
                                <span className={styles.btn_lightblue} onClick={() => {setOpen2(!open2);  setOpen(false);}} aria-controls="example-collapse-text"  aria-expanded={open2}>Feedback Text <FontAwesomeIcon icon={faChevronDown} size={'sm'} className= {open2 === true ? "rotate" : "norotate"}/></span>
                            </div>
                        </div>
                        
                        <div className={styles.collapseiinner}>
                        <Collapse in={open}>
                            <div id="example-collapse-text" className={styles.editDimensions}>
                                <div className={styles.mianboxinnerbodyratingbands}>
                                     <DimForm editorData={obj.m_szDimensionDesc} errors={errors} formData={formData} setFormData={setFormData} setOpen={setOpen} handleAdd={handleAdd} isCreate={false}/>
                                </div>
                            </div>
                        </Collapse>

                        <Collapse in={open2}>
                            <div id="example-collapse-text" className={styles.editDimensions}>
                                <div className={styles.mianboxinnerbodyratingbands}>
                                    <div className={styles.feedbackcollaps}>
                                        <p>
                                            You can configure feedback or advice to be shown to users based on their scores for each dimension. After you specify the score ranges and texts below, choose the option (under 'Options') to show Feedback by dimension instead of Feedback per question
                                            {/*Hint: For this assessment, users can receive a minimum of 0 and a maximum of 5 per dimension*/}
                                        </p>
                                        <div className={styles.headerfeedbackcoppalse}>
                                            <h2>Feedback or Advice Based on Dimension Score</h2>
                                            {fdbkOpen === false  && 
                                            <span className={styles.btn_skyblue} onClick={()=>handleFeedbackOpen(!fdbkOpen)}>Create New</span>
                                            }
                                            </div>
                                        { fdbkOpen &&
                                            <div className={styles.scorelistDimensions}>
                                                <div className={styles.addDimensionScore}>
                                                    <FeedbackForm getAllDim={getAllDim} m_lDimensionId={obj.m_lDimensionId} id={0} setLoader={setLoader} handleFeedbackOpen={handleFeedbackOpen}/>
                                                </div>
                                            </div>
                                        }
                                        { obj && obj.m_listFeedbackTexts.map((res,index)=>(
                                            <Dimensionscorelist  assessmentId= { params.id } getAllDim={getAllDim} m_lDimensionId={obj.m_lDimensionId} key={index} data={res} setLoader={setLoader}/>
                                        ))}
                                        
                                        

                                    </div>
                                   
                                </div>
                            </div>
                        </Collapse>
                        </div>
        <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Updated Successfully!!" toasticon={faCheckCircle}/>
        <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message="Updation Failed!!" toasticon={faBan}/>                 
        <Modal show={modalData.status} onHide={() => handleModal({status:false,dimId:0})} className={styles.modalZapierTemplete}>
                <Form method="post"> 
                    <div className={styles.modalZapierBody}>
                        {/* <Image src={WarningIcon} alt='icon' /> */}
                        <h2>Are you sure? </h2>
                        <div className={styles.modelbody_button_main}>                           
                            <Button className= {styles.closebtn} type="button" onClick={() => handleModal({status:false,dimId:0})}> Cancel</Button>
                            <Button variant="danger" type="button" onClick={handleDelete}>Confirm</Button>
                        </div>                        
                    </div>
                </Form>
            </Modal>
        
        </>
	);
}

export default DimList;
