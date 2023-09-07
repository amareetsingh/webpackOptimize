import React, {  useState } from 'react';
import styles from '../settingstyle.module.css';
import {Form} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { functionService } from '../../../Context/functions';
import Toaster from '../../../Components/Toaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faUnlink, faTrash, faEdit, faChevronDown, faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function ProfileListItem(props) {
   //console.log("props.row",props.row);
   const[fieldID,setFieldID]=useState(0);
   const[handleInput,setHandleInput]=useState('');
   const [showContent, setShowContent] = useState(false);
   const params = useParams();
   const[disabled,setDisabled]=useState(false);
   const [message, setMessage] = useState("Updation Failed!!");
   const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
   //console.log("props.row",props.row);
   const handleSubmit = async()=>{    
              
        if(handleInput === ""){
         setMessage("Please enter a value");
         setShowToast1(true);
         return;
        }
        if(disabled === true){ return false;}
        setDisabled(true);   
        props.setLoader(true)
        let res = await functionService.post('ProfileFields/addFieldValue',{
            "assessmentId": params.id,
            "userId": 0,
            "lFieldId": props.row.m_lQuestionId,
            "lFieldValueId":fieldID,
            "szFieldValue": handleInput
          });          
        if(res !== false && res.status !== false){
           setHandleInput('');
           setFieldID(0);
           props.getFieldList();
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
        setDisabled(false);
        props.setLoader(false)
   }
   const handleshowContent = () =>{
      setShowContent(!showContent)      
  }
   const handleMapUnMap = async (type='unmapField')=>{
      if(disabled === true){ return false;}
        setDisabled(true);
      props.setLoader(true)
      let res = await functionService.post('ProfileFields/'+type,{
         "assessmentId": params.id,
         "userId": 0,
         "lFieldId": props.row.m_lQuestionId,
       });      
     if(res !== false && res.status !== false){
         setShowToast(true)
        props.getFieldList();
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
     setDisabled(false);
      props.setLoader(false)
   } 
	return (
        <>
        <div className={styles.profileListBox}>
           <div className={styles.questionsboxbg1}>
              <div>
               <h4>{props.row.m_szQuestionText }</h4>
               <p>({props.row.m_listResponseOptions.length} values)</p>
              </div>

              <div>
                 {props.row && props.row.m_bIsMapProfileField === false ? 
               <span className={styles.mapItem} onClick={()=>{handleMapUnMap("mapField");}}>
                     <FontAwesomeIcon icon={faLink} size={'sm'}/> Map
               </span>
               : 
               <span className={styles.mapItem1} onClick={()=>{handleMapUnMap("unmapField");}}>
                  <FontAwesomeIcon icon={faUnlink} size={'sm'}/> Unmap
               </span>
               }
               <span onClick={handleshowContent} className={styles.btn_accord}>
                  <FontAwesomeIcon icon={faChevronDown} size={'sm'} className= {showContent === true ? "rotate" : "norotate"}/>
               </span>
              </div>
            </div>
           {showContent &&
           <div className={styles.optionItemList}>
                <div className={styles.valueslisting}>                     
                         <Form.Control type="text" placeholder="Enter a new value" 
                         value={handleInput}
                         onChange={(e)=>setHandleInput(e.target.value)}
                         />
                     
                   <Button onClick={handleSubmit} className={styles.btn_skyblue}> {fieldID === 0 ? 'Add New Value' : 'Update Value'} </Button>
                </div>
                <ul>
                    {props.row.m_listResponseOptions && props.row.m_listResponseOptions.map((obj,index)=>(
                          <li key={index}>
                             <label>{obj.m_szResponseText}</label>   
                             <div>                               
                              <span className={styles.banneredit} onClick={()=>{setFieldID(obj.m_lResponseId); setHandleInput(obj.m_szResponseText)}}>
                                 <FontAwesomeIcon icon={faEdit} size={'sm'}/></span>
                              <span className={styles.bannerremove} ><FontAwesomeIcon icon={faTrash} size={'sm'}/></span>
                             </div>
                          </li>  
                    ))}
                </ul>
           </div>
         }   
         </div> 
         <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Updated Successfully!!" toasticon={faCheckCircle}/>
        <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message={message} toasticon={faBan}/>
        </>
	);
}

export default ProfileListItem;
