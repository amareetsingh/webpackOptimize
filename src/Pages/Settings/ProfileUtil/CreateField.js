import React, {  useState } from 'react';
import styles from '../settingstyle.module.css';
import {Form} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { functionService } from '../../../Context/functions';
import Toaster from '../../../Components/Toaster';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


function CreateFieldForm(props) {
    const params = useParams();
    const[formData,setFormData]=useState({szFieldName:'',szFieldVal:''});
    const[disabled,setDisabled]=useState(false);
   const[message, setMessage] = useState("Some error occurs!");
    const [showtoast, setShowToast] = useState(false);
  const [errors] = useState({});
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);

    //let data = functionService.validateError(formData);    
    //if (Object.keys(data).filter(x => data[x] === true).length > 0) { setErrors(data); return; } else { setErrors({}) }

    const handleSubmit = async ()=>{
        if(disabled === true){ return false;}
        setDisabled(true);
        props.setLoader(true)
        const defaultAttr = {
            "assessmentId": params.id,
            "userId": 0,
            "szFieldName": formData.szFieldName,
            "listFieldValues": (formData.szFieldVal).split(",")
          };
        let res = await functionService.post('ProfileFields/createField',defaultAttr);
        //console.log("handleSubmit", res.data.data.result)
        if(res !== false && res.status !== false){
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
    
	return (
        <>
            <div className={styles.creatednewfields}>
                <h3>Create a new profile field here</h3>
                <Form>
                    <Form.Group className={styles.cretaeprofilefields}>
                    <Form.Control type="text" placeholder="Enter Profile Field Name" 
                        value={formData.szFieldName}
                        onChange={(e)=>{setFormData({...formData,szFieldName:e.target.value})}}
                    />
              {(errors && errors.hasOwnProperty('szFieldName')) && <p className="error errcont">Please fill required field!</p>}

                    </Form.Group>
                    <Form.Group className={styles.cretaeprofilefields}>
                    <Form.Control type="text" placeholder="Enter values separated by comma" 
                        value={formData.szFieldVal}
                        onChange={(e)=>{setFormData({...formData,szFieldVal:e.target.value})}}
                    />
              {(errors && errors.hasOwnProperty('szFieldVal')) && <p className="error errcont">Please fill required field!</p>}

                    </Form.Group>
                        <Button className={styles.btn_skyblue} type="button" onClick={handleSubmit}>
                            Save
                        </Button>
                </Form>
            </div>
            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Updated Successfully!!" toasticon={faCheckCircle}/>
        <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message={message} toasticon={faBan}/>             
                
        </>
	);
}

export default CreateFieldForm;
