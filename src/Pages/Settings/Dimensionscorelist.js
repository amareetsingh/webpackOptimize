import React, {  useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { functionService } from '../../Context/functions';
import FeedbackForm from './DimUtil/Feedbackform';
import styles from './settingstyle.module.css';
import { faBan, faCheckCircle, faChevronDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Toaster from '../../Components/Toaster';
function Dimensionscorelist(props) {
    const [open, setOpen] = useState(false);
    const[feedBack,removeFeedback]=useState(false);
    const [showtoast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const handleFeedbackOpen = ()=>{
        setOpen(false)  
    }
    const removeFeedbackByDim = async()=>{
		props.setLoader(true);
       let dataObj =  {
        "assessmentId": props.assessmentId,
        "lDimensionId": props.m_lDimensionId,
        "lRangeId": props.data.m_lFeedBackTextId,
        "startScore": 0,
        "endScore": 0,
        "feedbackText": "string"
      }
		let res = await functionService.post('Dimensions/removeFeedbackRange',dataObj);
		if(res.status === true){
			props.getAllDim();
			
			setShowToast(true);
            removeFeedback(false);	 
		}
		props.setLoader(false);
	}     
	return (
        <>
            <div className={styles.scorelistDimensions}>
                <div className={styles.headerscorelistDimensions}>
                    <h2>For scores greater than 
                        <span className={styles.greaterthenzero}> {props.data.m_dStartScore} </span> 
                            and up to 
                        <span className={styles.scoreamountmax}> {props.data.m_dEndScore} </span> 
                    </h2>
                    <div>
                    <span className={styles.btn_skyblue} onClick={()=>{setOpen(!open)}}><FontAwesomeIcon icon={faEdit}  /> </span>
                    <span className={styles.btn_remov} onClick={()=>{removeFeedback(true)}}><FontAwesomeIcon icon={faTrash}  /></span>
                    </div>
                </div>
                <div className={styles.feedbackdetal} dangerouslySetInnerHTML={{__html: props.data.m_szFeedbackText }}>                
                {/* {props.data.m_szFeedbackText} */}
                </div>                
                {
                    open &&
              
                <div className={styles.scorelistDimensions}>
                     <div className={styles.addDimensionScore}>
                    <FeedbackForm getAllDim={props.getAllDim} m_lDimensionId={props.m_lDimensionId} 
                        id={props.data.m_lFeedBackTextId}
                        m_dStartScore={props.data.m_dStartScore}
                        m_dEndScore={props.data.m_dEndScore}
                        m_szFeedbackText={props.data.m_szFeedbackText}
                        setLoader={props.setLoader} 
                        handleFeedbackOpen={handleFeedbackOpen}                      
                        />
                    </div>
                    </div> 
                  }       
            </div>
            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Deleted Successfully!!" toasticon={faCheckCircle}/>
            <Modal show={feedBack} onHide={()=>removeFeedback(false)}>
									
									<Modal.Body className={styles.textcenter}>
									    <div className={styles.modelbody_deletepopup}>
											<h2>Are you sure?</h2>
											<p></p>

                                            <div className={styles.modelbody_button_main}>
                                                <Button variant="light" onClick={()=>removeFeedback(false)}>
                                                Close
                                                </Button>
                                                <Button variant="danger" onClick={()=>{removeFeedbackByDim()}}>
                                                    Delete
                                                </Button>
                                            </div>
										</div>
									</Modal.Body>
									
								</Modal>
        </>
	);
}

export default Dimensionscorelist;
