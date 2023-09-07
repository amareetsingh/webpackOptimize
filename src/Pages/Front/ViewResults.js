import React, {  useState } from 'react';
import styles from './evalinator.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { functionService, getColor } from '../../Context/functions';
import Toaster from '../../Components/Toaster'; 
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ViewResults({row,setLoader}) {
   //console.log("koo",row)
   const[formData,setformData]=useState({"guid": "0",
   "szEmailAddress": "",
   "szFirstName": "string",
   "szLastName": "string",
   "szPrivacyConsent": "string",
   "szDummy": "string"});
	const[needToVerify,setNeedToVerify]=useState(false);
   const[message,setMessage]=useState('');
   const[errors,setErrors]=useState({});
   const params = useParams();
   const history = useHistory();
   const [showtoast, setShowToast] = useState(false);
   const [showtoast1, setShowToast1] = useState(false);
   const toggleShowToast = () => setShowToast(!showtoast);
   const toggleShowToast1 = () => setShowToast1(!showtoast1);

   const handleSubmit = async()=>{
      let data = functionService.validateError(formData);
      if(Object.keys(data).filter(x => data[x] === true).length > 0){ setErrors(data); return;} else{ setErrors({})} 	
      setMessage('');
      setLoader(true);
      formData.guid = params.id;
      let res = await functionService.post('Assess/submitReturningUserEmailAddress',formData);
      if(res.status !== false){         
           setNeedToVerify(true);            
           setShowToast(true);
      }else{
         setShowToast1(true)
         setMessage("Sorry, we are unable to proceed.");
      }
      setLoader(false);
   }
   
   const handleOTPVerification = async()=>{
      setMessage('');
      setLoader(true);
      let res = await functionService.post('Assess/verifyReturningUser',{"guid":params.id,"szEmailAddress":formData.szEmailAddress,"otp": formData.otp});
      if(res.status !== false){
         //setShowToast(true)
         localStorage.setItem("emailToken",res.data.data.token);
         functionService.setAssesmentResult(res.data.data.result);
         history.push("/analyticsresult");  
         return false;
         
      }else{
         setMessage('Sorry, we could not authorize you.');
         setShowToast1(true)        
      }
      setLoader(false);
   }

   return (

                <>
                    <div  className={styles.Benchmarkformpage}>
                        <div className={styles.benchmarkformMain}>
                        <Form>
                           <h2 className={styles.headingform}>Please enter your email address</h2>
                          
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                            
                             <Form.Control  type="text"  placeholder='Email Address' onChange={(e)=>{setformData({...formData,szEmailAddress:e.target.value})}} />
                             {(errors && errors.hasOwnProperty('szEmailAddress')) && <p className="error errcont">Please fill required field!</p>}
                          </Form.Group>
                          {needToVerify ? 
                          <>
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                            
                             <Form.Control placeholder='Verification Code' type="text"  onChange={(e)=>{setformData({...formData,otp:e.target.value})}} />
                             {(errors && errors.hasOwnProperty('otp')) && <p className="error errcont">Please fill required field!</p>}
                          </Form.Group>
                          <Button  style={{ background: getColor(row,2),color:getColor(row,5),  }} variant="primary" type="button" onClick={()=>{handleOTPVerification()}}>
                              Verify
                            </Button>
                          </>
                          :
                          <>
                          <Form.Group className={styles.registraioncheckbox} controlId="exampleForm.ControlInput1">
                                <Form.Control  type="checkbox" onChange={(e)=>{setformData({...formData,szPrivacyConsent:e.target.checked ? "Y":false})}} />
                                <label>I have read and agree with the <a rel="noopener noreferrer" target="_blank" href={`${(row && row.goAssessment && row.goAssessment.oAuthor) && row.goAssessment.oAuthor.szPrivacyURL}`} >privacy policy</a></label>
                          </Form.Group>
                           
                            <Button style={{ background: getColor(row,2),color:getColor(row,5) }} variant="primary" type="button" onClick={()=>{handleSubmit()}}>
                              Continue
                            </Button>
                           </>
                           }
                        </Form>
                       
                      
                        </div>
                    </div>
                    <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Please check your email for the confirmation code" toasticon={faCheckCircle}/>
                  <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message={message} toasticon={faBan}/>
                </>
	);
}

export default ViewResults;
