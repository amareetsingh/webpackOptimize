import React, { useState }  from 'react';
import styles from './evalinator.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { functionService, getColor, checkOptionSetting } from '../../Context/functions';
// import ReactGA from 'react-ga';
//import gtag from 'ga-gtag';
//import { GOOGLE_ANALYTICS_TAG } from '../../Components/API';

function ProfileForm({row,currentStage,setCurrentStage,setProfileData,profileData}) {

    //const szAssessmentId='assess' + row && row.goAssessment && row.goAssessment.nId;
    const lAssessmentId=row && row.goAssessment && row.goAssessment.nId;

    const[errors,setErrors]=useState({});
   
    const handleSubmit = (e)=>{
   
        e.preventDefault();
        const formData = e.target.elements;
   
        let array = {};
   
        Object.keys(formData).forEach((element)=>{
            if(typeof formData[element].name !== 'undefined'){
                array[formData[element].name] = formData[element].value;
            }
        })
        let data = functionService.validateError(array);
        if(Object.keys(data).filter(x => data[x] === true).length > 0){ setErrors(data); return;} else{ setErrors({})} 
        
        /*if (GOOGLE_ANALYTICS_TAG && szAssessmentId) {
            gtag('event', 'SubmitProfile', {
                'label': {szAssessmentId},
                });
        
        }*/

        if(lAssessmentId > 0  && checkOptionSetting(230, 1, row && row.gdictOptions) == false)
            functionService.sendTrackingData('assess/postTrackingEvent', {
            "assessId": lAssessmentId,
            "eventId": 30
            });
            
        setCurrentStage(currentStage+1);
    }
	return (

                <>
                <h3 className={styles.innerSubHeading} style={{color:getColor(row,3)}} dangerouslySetInnerHTML={{
                                __html: ((row && row.goAssessment) && row.goAssessment.szName)
                                }}></h3>
                    <div className={styles.Benchmarkformpage}>
                    
                        <div className={styles.benchmarkformMain}>
                       
                        <Form onSubmit={handleSubmit} action="#">
                           <h2 className={styles.headingform}>Benchmark Yourself On These Parameters</h2>
                           {(row && row.glistProfileQuestions) && row.glistProfileQuestions.map((obj,index)=>(
                               <Form.Group className={styles.form_group} controlId="exampleForm.ControlInput1" key={index}>
                               <Form.Label>{obj.m_szQuestionText}</Form.Label>
                                <Form.Select name={`profileForm${obj.m_lQuestionId}`} aria-label="Default select example" onChange={(e)=>setProfileData({...profileData,[obj.m_lQuestionId]:e.target.value})}>
                                    <option value="">Select a response</option>
                                    {(obj.m_listResponseOptions).map((item,keyIndex)=>(
                                        <option key={keyIndex} value={item.m_lResponseId}>{item.m_szResponseText}</option>
                                    ))}
                                    
                                </Form.Select>
                                {(errors && errors.hasOwnProperty('profileForm'+obj.m_lQuestionId)) && <p className="error errcont">Please fill required field!</p>}
                              </Form.Group>
                           )) }
                           <div className={styles.textCenter}>
                            <Button name="button" style={{ background: getColor(row,2),color:getColor(row,5) }} className='mt-2' value="submit" variant="primary" type="submit">
                             Continue
                            </Button></div>
                        </Form>
                        </div>
                    </div>
                </>
	);
}

export default ProfileForm;
