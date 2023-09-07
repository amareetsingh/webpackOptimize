import React, { useEffect, useState } from 'react';
import styles from './templates.module.css';
import Footer from '../../Components/Footer';
import {Breadcrumb} from "react-bootstrap";
import Header from '../../Components/Header';
import box_images from './box_images.png';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import { useAuthState } from '../../Context';
import { functionService } from '../../Context/functions';
import Toaster from '../../Components/Toaster'; 
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Templates(props) {
	const userDetails = useAuthState();
	const [show, setShow] = useState(false);
	const[templateId,setTemplateId]=useState(0);
	const[guidId,setGuidId]=useState(0);
	const [showtoast, setShowToast] = useState(false);
	const [showtoast1, setShowToast1] = useState(false);
	const toggleShowToast = () => setShowToast(!showtoast);
	const toggleShowToast1 = () => setShowToast1(!showtoast1);
  	const handleClose = () =>{
		setShow(false);
		setGuidId(0);
	  } 
  	const handleShow = (id=0) => {
		setShow(true);
		setGuidId(id);
	}
  	const[templateList,setTemplateList] = useState([]);
  	const[errors,setErrors]=useState({});
  	const history = useHistory();
 	const[loader,setLoader]=useState(false);
  	
  //	console.log(userDetails);
	const handleSubmit = async(e) => {
		e.preventDefault();
		const{assesement_name,templateType}=e.target.elements;
		let data = functionService.validateError({assesement_name:assesement_name.value,templateType:templateType.value});
		
		if(Object.keys(data).filter(x => data[x] === true).length > 0){ setErrors(data);  return;} else{ setErrors({})} 	
	  	
		setLoader(true);
		let res = {};
		
		if(guidId !== 0){
			res = await functionService.post('Assessment/createFromTemplate',{szGuid:guidId,szName: assesement_name.value});
			//console.log("res",res);
		}else{
			res = await functionService.post('Assessment/saveAssessment',{'toolId':0,'toolDesc':'','toolDescPostCompletion':'','toolName':assesement_name.value,'assessmentType':templateType.value,'userId':userDetails.id,"listMetadata":[]});
		}
		
		setLoader(false);
		if(res.status === true && res.data.data.statusCode === 200){
			let data = JSON.parse(res.data.data.result);
			history.push("/assesment/"+data.m_lSurveyId);
		}	else{
			setShowToast1(true)	
			if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
				localStorage.removeItem('currentUser');
				localStorage.removeItem('token');
				window.location = "/login";
				return;
			}		
		}		 
	};

  const handleBack= ()=>{
	  history.push("/dashboard");
  }
  const handleTemplateList = async(e) => {
	setLoader(true);
	let res = await functionService.get('Assessment/getAssessmentTemplates');
	//console.log("resssss",res)
	if(res.status === true){
		setTemplateList(JSON.parse(res.data.result))
		
	}
	
	
	setLoader(false);

  }
  useEffect(() => {
	handleTemplateList();


},[]);
// console.log("setTemplateList",templateList)
	return (
		<div className={styles.dashboardPage}>
		<Header loader={loader}/>	
          <div className={styles.templatesPage}>
           <div className={styles.breadcrumb}>
           <Container >
	          <Breadcrumb>
				  <Breadcrumb.Item onClick={handleBack}>Dashboard</Breadcrumb.Item>
				  <Breadcrumb.Item  className={styles.active}>Templates</Breadcrumb.Item>
				</Breadcrumb>
				</Container >
            </div>

            <div className={styles.templates_content}>
            	<div className={styles.templates_box}>
            	<Container >
					   <Row>
					    <Col sm={4} className={styles.blacktemplete}>
							
            				<div className={styles.useblackTemplete}>	            				
		            				<h4>Start From Scratch</h4>
		            												
		            				 <button onClick={()=>handleShow(0)}>
										Create New
									</button>	                           
								</div>
						</Col>
						{templateList && templateList.map((obj,index)=>(
							<Col sm={4} className={styles.blacktemplete} key={index}>
					        <div className={styles.templete_design}>
								<div className={styles.imageBox}>
					    	  <img src={functionService.awsBucketImage(obj && obj.m_oMedia) !== false ? functionService.awsBucketImage(obj && obj.m_oMedia) :box_images} alt="logo" />
							  </div>
								<div className={styles.box_design}>
		            				<h4 dangerouslySetInnerHTML={{__html: obj.m_szSurveyName}}></h4>
		            				<p>{obj.m_szSurveyDesc}</p>
		            				<button className={styles.useTemplete} onClick={()=>{handleShow(obj.m_szSurveyGUID); setTemplateId(obj.m_lSurveyId)}}>Use Template</button>
		            				<a rel="noopener noreferrer" href={functionService.convertToSlug(obj.m_szSurveyName) + "/assessment/" + obj.m_szSurveyGUID} target="_blank" className={styles.useView} >View</a>
									{/* <a className={styles.useView} target="_blank" href={functionService.convertToSlug(props.obj.m_szSurveyName)+"/assessment/"+props.obj.m_szSurveyGUID} >
								View Live
							   </a> */}
		            			</div>   				
							 </div>
						</Col>
						))}
					    

 
 <Modal show={show} onHide={handleClose} className={styles.modalTemplete}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modal_header}>Create your Assessment </Modal.Title>
        </Modal.Header>
        <Form method="post" onSubmit={handleSubmit}>
		<Modal.Body className={styles.modalBody}>
        
  <Form.Group className="mb-3 relative" controlId="formBasicEmail">
    <Form.Label>Assesment Name</Form.Label>
    <Form.Control className={styles.formControl} type="text" placeholder="Enter assesment name" name="assesement_name"/>
	<Form.Control className={styles.formControl} type="hidden" value={templateId}  name="templateId" />
	{(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
  </Form.Group>
  {guidId === 0 ? 
  <Form.Group className="mb-3 relative" controlId="formBasicEmail">
   <Form.Label>Assessment Type</Form.Label>
<Form.Select  className={styles.formControl} name="templateType">
		{/* {assesTypeList && assesTypeList.map((obj,index)=>(
			<option key={index} value={obj.assessment_type}>{obj.assessment_type_name}</option>
		))} */}

<option value="">Select Assessment Type</option>
  <option value="1">Personality Assessment</option>
  <option value="2">Scored Assessment</option>
  <option value="3">Wheel of Life</option>
  {/*<option value="4">Stackholder analysis</option> */}
	 </Form.Select>
	 {(errors && errors.hasOwnProperty('templateType')) && <p className="error errcont">Please fill required field!</p>}
    </Form.Group>
	:
	<input type={"hidden"} name="templateType" value="1"/>
}	
</Modal.Body>
        <Modal.Footer className={styles.modal_footer}>
          <Button variant="primary" type="submit">
           Continue
          </Button>
        </Modal.Footer>
		</Form>
      </Modal>
									 
					  </Row>

                </Container>
             
                </div>
          </div>
      </div>
	  <Footer />
	  <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message="Updated Successfully!!" toasticon={faCheckCircle}/>
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message="Some error occurs!!" toasticon={faBan}/>
		</div>
	);
}

export default Templates;
