import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getPreviewColor, checkOptionSetting, functionService} from "../../Context/functions";
import styles from '../Front/evalinator.module.css';

function EmailCaptureAdmin(props) {
  //console.log(props.formData);
  let defaultColor = { btnBg: `rgba(71, 62, 143)`, txtColor: `rgba(245, 245, 245)`, titleColor: `rgba(0, 0, 0,1)`, bgColor: `rgba(241,241,241,1)` };
  const [colorPicker, setColorPicker] = useState(defaultColor);
  const [surveyContent, setSurveyContent] = useState({});
  /*Form variable*/

  const getData = async (data) => {
          const defaultAttr = {
                  "toolId": data && data.m_lSurveyId,
                  "toolName": data && data.m_szSurveyName,
                  "toolDesc": data && data.m_szSurveyDesc,
                  "toolDescPostCompletion": data && data.m_szSurveyDescPostCompletion,
                  "assessmentType": data && (data.m_nAssessmentType + ""),
                  "userId": 0
          }
          setSurveyContent(data); 
          //console.log("data", data)
          if (data && data.m_szSurveyName && data.m_oColorScheme.m_dictColors) {
                  defaultColor = {
                          btnBg: data.m_oColorScheme.m_dictColors[2],
                          txtColor: data.m_oColorScheme.m_dictColors[5],
                          titleColor: data.m_oColorScheme.m_dictColors[3],
                          bgColor: data.m_oColorScheme.m_dictColors[1]

                  };
                  setColorPicker(defaultColor);
          }
          let dataKeys = { btnBg: "2", txtColor: "5", titleColor: "3", bgColor: "17" };

          defaultAttr['listMetadata'] = [];
          Object.keys(dataKeys).forEach(element => {
                  defaultAttr['listMetadata'].push({ type: "3", key: dataKeys[element], value: defaultColor[element] });
          });
          let dataObject = Object.keys(data).length > 0 ? (data && data['m_oEvalCustomizations'] && data['m_oEvalCustomizations']['m_dictEvalCustomizations']) : {};
          if(dataObject){
          Object.keys(dataObject).forEach(element => {
                  defaultAttr['listMetadata'].push({ type: "9", key: element, value: dataObject[element] });
          });
          }


          props.setFormData(defaultAttr)
  }
  useEffect(() => {
          if (Object.keys(props.currentAssesment).length > 0) {
                  getData(props.currentAssesment);

          }
  }, [props.currentAssesment]);
  const setFormUpdatedData = () => {
          let dataKeys = { btnBg: "2", txtColor: "5", titleColor: "3", bgColor: "1" };
          let dataArray = { ...props.formData };
          dataArray['listMetadata'] = [];
          Object.keys(dataKeys).forEach(element => {
                  dataArray['listMetadata'].push({ type: "3", key: dataKeys[element], value: colorPicker[element] });
          });
          let data = Object.keys(props.currentAssesment).length > 0 ? props.currentAssesment['m_oEvalCustomizations']['m_dictEvalCustomizations'] : {};
          Object.keys(data).forEach(element => {
                  dataArray['listMetadata'].push({ type: "9", key: element, value: data[element] });
          });

          props.setFormData(dataArray);
          // console.log("array Landing",props.formData);
  }
  useEffect(() => {
          setFormUpdatedData();
  }, [colorPicker]);
  return (
    <div>
       <>
       
                <h3 className={styles.innerSubHeading} style={{color:getPreviewColor(props.currentAssesment,6)}} dangerouslySetInnerHTML={{
                                __html: ((props.currentAssesment) && props.currentAssesment.m_szSurveyName)
                                }}></h3>
                    <div className={styles.Benchmarkformpage}>
                        <div className={styles.benchmarkformMain}>
                        <Form >
                           <h2  className={styles.headingform} style={{color:getPreviewColor(props.currentAssesment,6)}}> {functionService.getCustomizeText(props.currentAssesment, 10,"Don't lose your results. Save them.")}</h2>
                           <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                            
                             <Form.Control placeholder='First Name' type="text"/>
                            
                          </Form.Group>
                          {checkOptionSetting(65, 1,props.currentAssesment && props.currentAssesment.oResults && props.currentAssesment && props.currentAssesment.oResults.gData && props.currentAssesment && props.currentAssesment.oResults.gData.gdictOptions) &&
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                             <Form.Control  placeholder='Last Name'  type="text" />
                            
                          </Form.Group>
                           }
                          <Form.Group className={styles.fgroup} controlId="exampleForm.ControlInput1">
                          
                             <Form.Control placeholder='Email'   type="text"  />
                            
                          </Form.Group>
                          <Form.Group className={styles.registraioncheckbox} controlId="exampleForm.ControlInput1">
                                <Form.Control  type="checkbox" />
                                <label>I have read and agree with the <a  rel="noopener noreferrer" target="_blank" href={`${(props.row && props.row.goAssessment && props.row.goAssessment.oAuthor) && props.row.goAssessment.oAuthor.szPrivacyURL !== "" ? props.row.goAssessment.oAuthor.szPrivacyURL : 'https://evalinator.com/privacy-policy' }`} >privacy policy</a></label>
                              
                          </Form.Group>


                          <div className={styles.textCenter}> <Button style={{ background: props.currentAssesment.m_oColorScheme.m_dictColors[2],color : props.currentAssesment.m_oColorScheme.m_dictColors[5] }} variant="primary" type="button">
                          {functionService.getCustomizeText(props.currentAssesment, 3,"Continue")}
                            </Button></div>
                          {/* {props.needToVerify === false ?
                           <div className={styles.textCenter}> <Button style={{ background: getColor(props.row,2),color:getColor(props.row,5) }} variant="primary" type="button" onClick={()=>{props.handleSubmit()}}>
                              {functionService.getButtonText(props.row,3,'Continue')}
                            </Button></div>
                            :
                            <>
                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                               <Form.Label>Verification Code</Form.Label>
                               <Form.Control  type="text"  onChange={(e)=>{props.setformData({...props.formData,otp:e.target.value})}} />
                             </Form.Group>
                            <Button style={{ background: getColor(props.row,2),color:getColor(props.row,5) }} variant="primary" type="button" onClick={()=>{props.handleOTPVerification()}}>
                              Verify
                            </Button>
                            {props.message !== "" && <p className='error-mmesage'>{props.message}</p>}
                            </>
                          } */}
                        </Form>
                        {checkOptionSetting(60, 0,props.currentAssesment && props.currentAssesment && props.currentAssesment.oResults && props.currentAssesment && props.currentAssesment.oResults.gData && props.currentAssesment.oResults.gData.gdictOptions) &&
                           <div className={styles.textCenter}> <span className={styles.skipsteps} >
                      
                              {functionService.getCustomizeText(props.currentAssesment, 5, "Skip this step")}
                              </span></div>
                           }
                          
                      
                        </div>
                    </div>
                   
                </>
    </div>
  )
}

export default EmailCaptureAdmin