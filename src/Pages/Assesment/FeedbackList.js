import { faAngleDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import styles from './assesment.module.css';

function FeedbackList(props) {
  const[open,setOpen]=useState(false);
  

	return (
            <>
            <div className={styles.boxhead}>
							   <p className={styles.updatelevel}>For scores greater than {props.obj.m_dStartScore} and up to {props.obj.m_dEndScore}</p>
							   
                                        <div className={styles.btngroup}>
                                            <Button className={styles.bgwhitebtnaroow} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                                                <FontAwesomeIcon icon={faAngleDown}  />   
                                            </Button>
                                            <Button className={styles.bgwhitebtnedit} onClick={(e)=>{ props.handleEdit(props.obj);}}> 
                                                <FontAwesomeIcon icon={faEdit}  /> 
                                            </Button>{' '}
                                            <Button id="removefeeback" className={styles.bgredbtnwhite} onClick= {(e)=>props.removefeebackitem(props.obj) }> 
                                                <FontAwesomeIcon icon={faTrash} /> 
                                            </Button>{' '}
                                        </div>
						   </div>
            <Collapse in={open}>
                                <div id="example-collapse-text">
                                    <div className={styles.boxcontent}>
                                        <p className={styles.contentlevel} 
                                        dangerouslySetInnerHTML={{
                                            __html: ((props.obj.m_szFeedbackText) && props.obj.m_szFeedbackText)}}
                                        ></p>
                                        
                                        {/* <div className={styles.btngroup}>
                                            <Button className={styles.bgwhitebtn} onClick={(e)=>{ handleEdit(obj);}}>Edit</Button>{' '}
                                            <Button id="removefeeback" className={styles.bgredbtn} onClick= {props.removeFeeback }>Remove</Button>{' '}
                                        </div> */}
                                    </div>
                                </div>
                            </Collapse>
               
            </>
	);
}

export default FeedbackList;
