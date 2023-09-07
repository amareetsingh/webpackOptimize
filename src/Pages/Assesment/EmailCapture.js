import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  checkOptionSetting, functionService, getColor } from "../../Context/functions"
import styles from '../Front/evalinator.module.css'

function EmailCapture(props) {
  
  return (
    <div>
       <>
                <h3 className={styles.innerSubHeading} style={{color:getColor(props.row,3)}} dangerouslySetInnerHTML={{
                                __html: ((props.row && props.row.goAssessment) && props.row.goAssessment.szName)
                                }}></h3>
                    <div className={styles.Benchmarkformpage}>
                        <div className={styles.benchmarkformMain}>
                        <Form>
                           <h2  className={styles.headingform}>{functionService.getButtonText(props.row,10,'Leave your email and save your score')}</h2>
                           <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                            
                             <Form.Control placeholder='First Name' type="text" onChange={(e)=>{props.setformData({...props.formData,szFirstName:e.target.value})}}/>
                             {(props.errors && props.errors.hasOwnProperty('szFirstName')) && <p className="error errcont">Required</p>}
                          </Form.Group>
                          {checkOptionSetting(65, 1,props.row && props.row.gdictOptions) &&
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                             <Form.Control  placeholder='Last Name'  type="text" onChange={(e)=>{props.setformData({...props.formData,szLastName:e.target.value})}} />
                             {(props.errors && props.errors.hasOwnProperty('szLastName')) && <p className="error errcont">Required</p>}
                          </Form.Group>
                           }
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                          
                             <Form.Control placeholder='Email'   type="text"  onChange={(e)=>{props.setformData({...props.formData,szEmailAddress:e.target.value})}} />
                             {(props.errors && props.errors.hasOwnProperty('szEmailAddress')) && <p className="error errcont">Required</p>}
                          </Form.Group>
                          <Form.Group className={styles.registraioncheckbox} controlId="exampleForm.ControlInput1">
                                <Form.Control  type="checkbox" onChange={(e)=>{props.setformData({...props.formData,szPrivacyConsent:e.target.checked})}} />
                                <label>I have read and agree with the <a  rel="noopener noreferrer" target="_blank" href={`${(props.row && props.row.goAssessment && props.row.goAssessment.oAuthor) && props.row.goAssessment.oAuthor.szPrivacyURL !== "" ? props.row.goAssessment.oAuthor.szPrivacyURL : 'https://evalinator.com/privacy-policy' }`} >privacy policy</a></label>
                                {(props.errors && props.errors.hasOwnProperty('szPrivacyConsent')) && <p className="error errcont">Please accept term & conditions!<br/></p>}
                          </Form.Group>
                          {props.needToVerify === false ?
                           <div className={styles.textCenter}> <Button style={{ background: getColor(props.row,2),color:getColor(props.row,5) }} variant="primary" type="button" onClick={()=>{props.handleSubmit()}}>
                              {functionService.getButtonText(props.row,3,'Continue')}
                            </Button></div>
                            :
                            <>
                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                               <Form.Label>Verification Code</Form.Label>
                               <Form.Control  type="text"  onChange={(e)=>{props.setformData({...props.formData,otp:e.target.value})}} />
                             </Form.Group>
                            <Button className={styles.textCenter} style={{ background: getColor(props.row,2),color:getColor(props.row,5) }} variant="primary" type="button" onClick={()=>{props.handleOTPVerification()}}>
                              Verify
                            </Button>
                            {props.message !== "" && <p className='error-mmesage'>{props.message}</p>}
                            </>
                          }
                        </Form>
                        {checkOptionSetting(60, 0,props.row && props.row.gdictOptions) &&
                           <div className={styles.textCenter}> <span className={styles.skipsteps} onClick={()=>{ props.setCurrentStage(props.currentStage+1,'skip'); [props.setRegisterFormHandle](true);}}>
                              {functionService.getButtonText(props.row,5,'Skip this step')}
                              </span></div>
                           }
                          
                      
                        </div>
                    </div>
                   
                </>
    </div>
  )
}

export default EmailCapture