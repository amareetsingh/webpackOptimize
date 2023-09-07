import React, { useCallback, useEffect, useState } from 'react';
import styles from './settingstyle.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form} from "react-bootstrap";
import { functionService } from '../../Context/functions';
import { useParams } from 'react-router-dom';
import Toaster from '../../Components/Toaster'; 
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; 

function Options(props) {
   const [manageoption] = useState(true);
   const[optionsList,setOptionsList]=useState({});
   const[selectedOptions,setSelectedOptions]=useState({});
   const[disabled,setDisabled]=useState(false);
   const[message, setMessage] = useState("Some error occurs!");
   const [showtoast, setShowToast] = useState(false);
   const [showtoast1, setShowToast1] = useState(false);
   const toggleShowToast = () => setShowToast(!showtoast);
   const toggleShowToast1 = () => setShowToast1(!showtoast1);
   const params = useParams();

   const getAllOptions =  useCallback(async () =>  {
    // let res = await functionService.post('Settings/getAssessmentOptionsSettings',{
    //     "assessmentId": params.id,
    //     "userId": 0
    //   });
    // if(res !== false && res.status !== false){
    //    let data = JSON.parse(res.data.data.result);
    //    console.log("datadatadatadata",data);
    //    console.log(" old m_dictEvalOptionMeta",data.m_dictEvalOptionMeta);
    //    console.log(" old m_dictSelectedOption",data.m_dictSelectedOption);
    // //    setOptionsList(data.m_dictEvalOptionMeta);
    // //    setSelectedOptions(data.m_dictSelectedOption);       
    //    //console.log("options",data);
    // }else{
    //     if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
    //         localStorage.removeItem('currentUser');
    //         localStorage.removeItem('token');
    //         window.location = "/login";
    //         return;
    //       }
    // }
    //console.log(" new m_dictEvalOptionMeta",props.currentAssesment.m_dictEvalOptionMeta);
    //console.log(" new m_dictSelectedOption",props.currentAssesment.m_dictUserOptions);
    setOptionsList(props.currentAssesment.m_dictEvalOptionMeta);
       setSelectedOptions(props.currentAssesment.m_dictUserOptions);
    
 },[params])

 useEffect(()=>{
    getAllOptions();
 },[params,getAllOptions]);

  const handleAction = async (id,val)  =>{
    if(disabled === true){ return false;}
    setDisabled(true); 
    props.setLoader(true);
    props.setCurrentAssesment({...props.currentAssesment , m_nPublishStatus:3});
    let res = await functionService.post('Settings/saveOptionSettings',{
        "lAssessmentId": params.id,
        "dictOptions": {
          [id]: val
        }
      });
      //console.log("handleAction", res.data.data.result)
    if(res !== false && res.status !== false){
        // getAllOptions();
   
    let data = { ...props.currentAssesment };
    data.m_dictUserOptions[id] = parseInt(val);
    //console.log("data.m_dictUserOptions",data.m_dictUserOptions);
    functionService.setOptions(data.m_dictUserOptions);
    props.setCurrentAssesment(data);
        setShowToast(true)
    }else{
        setMessage(res.data.data.result)
        setShowToast1(true)
        if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            window.location = "/login";
            return;
          }
    }
        props.setLoader(false);
        setDisabled(false); 
    }
  




    return (
        <>
            <div className={styles.Ratingbandsdetails}>
                <div className={styles.settingheaderbox}>
                    <h3>Option Settings</h3>
                </div>
                <div className={styles.settingbodyboxcontant}>
                        <div className={styles.bodyQuestionlist}>
                            <Row>
                                { manageoption ? 
                               
                                <Col xs={12}>
                                    {optionsList && Object.keys(optionsList).map((obj,index)=>(
                                        <div className={styles.questionsbox} key={index}>
                                            { optionsList[obj].m_nSequenceNumber === 2 &&
                                            <>
                                            <h4>{optionsList[obj].m_szEvalOptionName}</h4>
                                            <Form>
                                              
                                                    <div key={`inlineradio`} className="mb-3">
                                                      { optionsList[obj].m_dictEvalOptionValues && Object.keys(optionsList[obj].m_dictEvalOptionValues).map((dataObj,jindex)=>(
                                                          <Form.Check key={jindex} name={`options${index}`} label={optionsList[obj].m_dictEvalOptionValues[dataObj].m_szEvalOptionValueName}  type={'radio'} id={`inlineradio-${index}-${jindex}`}  
                                                          className={styles.spacegroups} 
                                                          value={optionsList[obj].m_dictEvalOptionValues[dataObj].m_lEvalOptionValueId}
                                                          onChange={(e)=>{handleAction(optionsList[obj].m_lEvalOptionId,optionsList[obj].m_dictEvalOptionValues[dataObj].m_lEvalOptionValueId)}}
                                                          checked = {selectedOptions.hasOwnProperty(optionsList[obj].m_lEvalOptionId) && selectedOptions[optionsList[obj].m_lEvalOptionId] === optionsList[obj].m_dictEvalOptionValues[dataObj].m_lEvalOptionValueId ? true : false }
                                                          />
                                                         
                                                      ))}  
                                                     
                                                    </div>
                                               
                                                </Form>
                                                </>
                                            }
                                        </div>
                                    ))}
                                  
                                </Col>

                                :  
                                <Col>
                                    <div className={styles.questionsboxbg}>
                                        <h4>Show author profile on landing page</h4>
                                        <p>Top of Page</p>
                                    </div>
                                    <div className={styles.questionsboxbg}>
                                        <h4>Start page style</h4>
                                        <p>Full page display</p>
                                    </div>
                                    <div className={styles.questionsboxbg}>
                                        <h4>Start page banner image style</h4>
                                        <p>Full page display</p>
                                    </div>
                                </Col>
                                
                                }                                
                               
                            </Row>
                        </div>
                </div>
            </div>

            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Updated Successfully!!" toasticon={faCheckCircle}/>
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message={message} toasticon={faBan}/>
        </>
	);
}

export default Options;
