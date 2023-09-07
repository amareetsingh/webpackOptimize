import React, {  useState } from 'react';
import styles from './evalinator.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import {  checkOptionSetting, functionService, getColor } from '../../Context/functions';
import Toaster from '../../Components/Toaster'; 
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import ReactGA from 'react-ga';
//import gtag from 'ga-gtag';
//import { GOOGLE_ANALYTICS_TAG } from '../../Components/API';

function RegistrationForm({setRegisterFormHandle,row,currentStage,setCurrentStage,setLoader,setAssesmentToken}) {
   const[formData,setformData]=useState({"guid":0,"szFirstName":'',"szLastName":'',"szEmailAddress":'',"szPrivacyConsent":false,"szDummy":'Dummy'});
	const[needToVerify,setNeedToVerify]=useState(false);
   const[message,setMessage]=useState('');
   const[errors,setErrors]=useState({});
   const params = useParams();
   const [showtoast, setShowToast] = useState(false);
   const [showtoast1, setShowToast1] = useState(false);
   const toggleShowToast = () => setShowToast(!showtoast);
   const toggleShowToast1 = () => setShowToast1(!showtoast1);

   //const szAssessmentId='assess' + row && row.goAssessment && row.goAssessment.nId;
   const lAssessmentId=row && row.goAssessment && row.goAssessment.nId;

   const handleSubmit = async()=>{

      if(checkOptionSetting(65, 2,row && row.gdictOptions)){
         formData.szLastName = formData.szFirstName;
      }
      //console.log("formData",formData)
      let data = functionService.validateError(formData);
      if(checkOptionSetting(65, 2,row && row.gdictOptions)){
         formData.szLastName = '';//formData.szFirstName"";
      }

      //console.log("data",data)
      if(Object.keys(data).filter(x => data[x] === true).length > 0){ setErrors(data); return;} else{ 
         	
      if(formData.szPrivacyConsent === false){
         setErrors({szPrivacyConsent:true});
         return; 
      }else{
         setErrors({});
      }
   }
      setMessage('');
      setLoader(true);

      /*if (GOOGLE_ANALYTICS_TAG && szAssessmentId) {
         gtag('event', 'SubmitEmail', {
            'label': {szAssessmentId},
            });
      }*/

      formData.guid = params.id;
      formData.szPrivacyConsent = "Y";

      let res = await functionService.post('Assess/submitEmailAddress',formData);

      if(res.status !== false){  
         
         if(lAssessmentId > 0  && checkOptionSetting(230, 1, row && row.gdictOptions) == false)
         functionService.sendTrackingData('assess/postTrackingEvent', {
         "assessId": lAssessmentId,
         "eventId": 50
         });

         if(row.gEmailValidationRequired === 1){           

            setNeedToVerify(true);            

         }else{            

            localStorage.setItem("emailToken",res.data.data.token);
            {formData && formData.szEmailAddress &&
               localStorage.setItem("respondentEmailAddress",formData.szEmailAddress);}
               
            setRegisterFormHandle(true);

            setCurrentStage(currentStage+1,res.data.data.token)
         }
      }else{
         setShowToast1(true)
         
      }
      setLoader(false);
   }
   
   const handleOTPVerification = async()=>{
      setMessage('');
      setLoader(true);
      let res = await functionService.post('Assess/verify',{"szEmailAddress":formData.szEmailAddress,"szAccessCode": formData.otp});
      if(res.status !== false){
         setShowToast(true)
         localStorage.setItem("emailToken",res.data.data.token);
         setCurrentStage(currentStage+1,res.data.data.token);
         setRegisterFormHandle(true);
         
      }else{
         setMessage('Please check OTP again!');
         setShowToast1(true)        
      }
      setLoader(false);
   }

   return (

                <>
                <h3 className={styles.innerSubHeading} style={{color:getColor(row,3)}} dangerouslySetInnerHTML={{
                                __html: ((row && row.goAssessment) && row.goAssessment.szName)
                                }}></h3>
                    <div className={styles.Benchmarkformpage}>
                        <div className={styles.benchmarkformMain}>
                        <Form>
                           <h2 className={styles.headingform}>{functionService.getButtonText(row,10,'Leave your email and save your score!')}</h2>
                           <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                            
                             <Form.Control placeholder='First Name' type="text" onChange={(e)=>{setformData({...formData,szFirstName:e.target.value})}}/>
                             {(errors && errors.hasOwnProperty('szFirstName')) && <p className="error errcont">Please fill required field!</p>}
                          </Form.Group>
                          {checkOptionSetting(65, 1,row && row.gdictOptions) &&
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                             <Form.Control  placeholder='Last Name'  type="text" onChange={(e)=>{setformData({...formData,szLastName:e.target.value})}} />
                             {(errors && errors.hasOwnProperty('szLastName')) && <p className="error errcont">Please fill required field!</p>}
                          </Form.Group>
                           }
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                          
                             <Form.Control placeholder='Email'   type="email"  onChange={(e)=>{setformData({...formData,szEmailAddress:e.target.value})}} />
                             {(errors && errors.hasOwnProperty('szEmailAddress')) && <p className="error errcont">Please fill required field!</p>}
                          </Form.Group>
                          <Form.Group className={styles.registraioncheckbox} controlId="exampleForm.ControlInput1">
                                <Form.Control  type="checkbox" onChange={(e)=>{setformData({...formData,szPrivacyConsent:e.target.checked})}} />
                                <label>I have read and agree with the <a  rel="noopener noreferrer" target="_blank" href={`${(row && row.goAssessment && row.goAssessment.oAuthor) && row.goAssessment.oAuthor.szPrivacyURL !== "" ? row.goAssessment.oAuthor.szPrivacyURL : 'https://evalinator.com/privacy-policy' }`} >privacy policy</a></label>
                                {(errors && errors.hasOwnProperty('szPrivacyConsent')) && <p className="error errcont">Please accept term & conditions!<br/></p>}
                          </Form.Group>
                          {needToVerify === false ?
                           <div className={styles.textCenter}> <Button style={{ background: getColor(row,2),color:getColor(row,5) }} variant="primary" type="button" onClick={()=>{handleSubmit()}}>
                              {functionService.getButtonText(row,3,'Continue')}
                            </Button></div>
                            :
                            
                            <>
                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <p> Please check your email for the verification code we have sent you.  </p>
                               {/* <Form.Label>Verification Code</Form.Label> */}
                               <Form.Control placeholder='Verification Code'  type="text"  onChange={(e)=>{setformData({...formData,otp:e.target.value})}} />
                             </Form.Group>
                            <Button style={{ background: getColor(row,2),color:getColor(row,5) }} variant="primary" type="button" onClick={()=>{handleOTPVerification()}}>
                              Verify
                            </Button>
                            {message !== "" && <p className='error-mmesage'>{message}</p>}
                            </>
                          }
                        </Form>
                        {checkOptionSetting(60, 0,row && row.gdictOptions) &&
                           <div className={styles.textCenter}> <span className={styles.skipsteps} onClick={()=>{ setCurrentStage(currentStage+1,'skip'); setRegisterFormHandle(true);}}>
                              {functionService.getButtonText(row,5,'Skip this step')}
                              </span></div>
                           }
                          
                      
                        </div>
                    </div>
                    <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Updated Successfully!!" toasticon={faCheckCircle}/>
                  <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message="Updation Failed!!" toasticon={faBan}/>
                </>
	);
}

export default RegistrationForm;
