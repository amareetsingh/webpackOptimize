import React, { useEffect, useState } from 'react';
import styles from './settingstyle.module.css';
import Collapse from 'react-bootstrap/Collapse';

import { useParams } from 'react-router-dom';
import DimForm from './DimUtil/Dimform';
import { functionService } from '../../Context/functions';
import Toaster from '../../Components/Toaster';
import DimList from './DimUtil/DimList';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Dimensions(props) {
    //console.log("Dimensions",props.currentAssesment)
    const [open] = useState(false);
    const[errors,setErrors]=useState({});
    const [adddim, setAdddim] = useState(false);
    const [dimList, setDimList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const[message, setMessage] = useState("Some error occurs!");
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const params = useParams();
    let defaultAttr = {
        "assessmentId": params.id,
        "lDimensionId": 0,
        "szDimName": "",
        "szDimDesc": "",
        "szDimTagLine": ""
    };
    const [formData, setFormData] = useState(defaultAttr);
    
    // const getAllDim = async() => {
    //     let res = await functionService.post('Dimensions/getDimensions', { "assessmentId": params.id });
    //     if (res !== false && res.status !== false) {
    //         if (res.data.data.statusCode === 200) {
    //             setDimList(JSON.parse(res.data.data.result))
    //             // console.log("first", JSON.parse(res.data.data.result));
    //         }
    //     }else{
    //         if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
	// 			localStorage.removeItem('currentUser');
	// 			localStorage.removeItem('token');
	// 			window.location = "/login";
	// 			return;
	// 		  }
    //     }

    // }
    const getAllDim = async() => {
    if(props.currentAssesment !== undefined){ 
        if(props.currentAssesment.m_dictDimensions){
            var m_dictDimensions = props.currentAssesment.m_dictDimensions;
            //var theArray = mdictDimensions.filter(function(, index) { return theArray.hasOwnProperty(index); });
            setDimList(Object.values(m_dictDimensions));
            //console.log( "second",m_dictDimensions);
            //console.log("second",  Object.values(m_dictDimensions));
        } 

    }
    }

    const handleAdd = async () => {
        let data = functionService.validateError({"szDimName":formData.szDimName});
        if(Object.keys(data).filter(x => data[x] === true).length > 0){ setErrors(data); return;} else{ setErrors({})} 	
        if (disabled === true) { return false; }
        setDisabled(true);
        props.setLoader(true);
        let res = await functionService.post('Dimensions/save', formData);
        
        if (res !== false && res.status !== false) {
          
            let assessment = props.currentAssesment;
            assessment.m_dictDimensions = JSON.parse(res.data.data.result);
            //props.setCurrentAssesment({...props.currentAssesment,m_dictDimensions:JSON.parse(res.data.data.result)});
            props.setCurrentAssesment(assessment);
            
            getAllDim();
            setAdddim(false);
            setShowToast(true)
        } else {
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
        props.setLoader(false);
    }

    useEffect(() => {
        getAllDim();
    }, [params]);
    const handleAddToggle = () => {
        setFormData(defaultAttr);
        setAdddim(!adddim)
    }

    return (
        <>
            <div className={styles.Ratingbandsdetails}>
            <p>You can group questions into dimensions or categories. Scores will be rolled up and results can be displayed by dimensions, instead of by each question. This us helpful for more detailed assessments or quizzes.</p><br></br>
                <div className={styles.settingheaderbox}>
                
                    <h3>Dimensions</h3>
                    
                    <div className={styles.flexrightbutton}>
                        <span className={styles.btn_skyblue} onClick={() => handleAddToggle()}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}>Add Dimension</span>
                    </div>
                </div>

                <div className={styles.ratingbandsdetailsinnerbody}>

                    <Collapse in={adddim}>
                        <div id="example-collapse-text">
                            <div className={styles.mianboxratingbands}>
                                <div className={styles.mianboxheaderratingbands}>
                                    <h4>Add Dimension</h4>
                                </div>
                                <div className={styles.mianboxinnerbodyratingbands}>
                                    <DimForm errors= {errors} formData={formData} setFormData={setFormData} setOpen={setAdddim} handleAdd={handleAdd} setLoader={props.setLoader} />
                                </div>
                            </div>
                        </div>
                    </Collapse>

                    <div className={styles.mianboxratingbands1}>
                        {dimList && dimList.map((obj, index) => (

                            <div key={index}>
                                <DimList setCurrentAssesment={props.setCurrentAssesment}  currentAssesment={props.currentAssesment}   getAllDim={getAllDim} obj={obj} formData={formData} setFormData={setFormData} handleAdd={handleAdd} setLoader={props.setLoader} />

                            </div>))}
                    </div>


                </div>


            </div>
            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message="Updated Successfully!!" toasticon={faCheckCircle} />
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message={message} toasticon={faBan} />
        </>
    );
}

export default Dimensions;
