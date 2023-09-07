import React, { useState } from 'react';
import DOMPurify from "dompurify";
import { functionService } from '../../Context/functions';
import styles from './analyticsresult.module.css';
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import deleteIcon from "../../assets/images/delete.svg";
import checkIcon from "../../assets/images/check_circle.svg";
import GoalsComment from './GoalsComment';
import Toaster from '../../Components/Toaster';
import { faBan, faCheckCircle, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextEditor from '../../Components/TextEditor';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";


function GoalsList(props) {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [showtoast, setShowToast] = useState(false);
	const [showtoast1, setShowToast1] = useState(false);
	const toggleShowToast = () => setShowToast(!showtoast);
	const toggleShowToast1 = () => setShowToast1(!showtoast1);
	const handleClose = () => setOpenModal(false);
	const [openModal, setOpenModal] = useState(false);
	const [currentGoal, setCurrentGoal] = useState();
	
	var dateStart = new Date(); // Now
	var date = new Date(); // Now
	date.setDate(date.getDate() + 30);

	const [formData, setFormData] = useState({
		lGoalId: 0, 
		dueDate: date.getFullYear() + "-" + (('0' + (date.getMonth() + 1)).slice(-2)) + "-" + (('0' + date.getDate()).slice(-2)),
		startDate: dateStart.getFullYear() + "-" + (('0' + (dateStart.getMonth() + 1)).slice(-2)) + "-" + (('0' + dateStart.getDate()).slice(-2)),
		szGoalDesc: ''
	});

	const getDateForSelection = (date1) =>
	{
		let date2 = functionService.convertDate(date1);
		let date = new Date(date2);
		let date3 =  date.getFullYear() + "-" + (('0' + (date.getMonth() + 1)).slice(-2)) + "-" + (('0' + date.getDate()).slice(-2));
		// console.log("date value being set to :" + date3);
		return date3;
	}


	const handleEditGoal = (goalRow) => {
		setCurrentGoal(goalRow);
		setFormData({ 
			// lGoalId: goalRow.m_lGoalId, 
			szGoalDesc: goalRow.m_szGoalDesc, 
			dueDate: getDateForSelection(goalRow.m_dtGoalDueDate), 
			startDate: getDateForSelection(goalRow.m_dtGoalStartDate)
		});
		setOpenModal(true);
	}

	//console.log('props.resultData',formData)	
	const getGolas = async () => {
		let defaultData = {
			"lAssessmentId": props.resultData && props.resultData.lAssessmentId,
			"lRespondentId": (props.resultData && props.resultData.oUser) && props.resultData.oUser.m_lUserId,

		};
		// changed by manish to get current token	
		let additionalToken = functionService.getCurrentToken();
		//if(localStorage.getItem('localAssesmentToken')){ additionalToken=localStorage.getItem('localAssesmentToken');}	
		// end manish

		let res = await functionService.post('Assess/getAnalysisDetails', defaultData, additionalToken);
		if (res !== false && res.status !== false) {
			if (res.data.data.statusCode === 200) {
				let data = JSON.parse(res.data.data.result);
				// console.log("data",data)
				let array = { ...props.resultData };
				array['oAssessmentGoals'] = data.oAssessmentGoals;
				array['listAnalysis'] = data.listAnalysis;
				array['dictGoals'] = data.dictGoals;
				array['nDimQuestionGoals'] = data.nDimQuestionGoals;
				array['nTotalQuestionGoals'] = data.nTotalQuestionGoals;
				props.setResultData(array);
				functionService.setAssesmentResult(JSON.stringify(array))
			}
		} else {
			if (res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')) {
				localStorage.removeItem('currentUser');
				localStorage.removeItem('token');
				window.location = "/login";
				return;
			}
		}
	}
	const handleSubmit = async (lGoalId) => {
		if (disabled === true) { return; }
		setDisabled(true);
		props.setLoader(true);

		let defaultFormData = {
			"lAssessmentId": props.resultData && props.resultData.lAssessmentId,
			"lRespondentId": (props.resultData && props.resultData.oUser) && props.resultData.oUser.m_lUserId,
			"nGoalType": props.row.nType,
			"lGoalTypeId": props.row.lId,
			"lGoalId": lGoalId > 0 ? lGoalId : 0,
			"szGoalDesc": formData.szGoalDesc,
			"startDate": formData.startDate, //new Date(),
			"dueDate": formData.dueDate
		};

		// changed by manish to get current token	
		let additionalToken = functionService.getCurrentToken();
		//let additionalToken = '';
		//if(localStorage.getItem('localAssesmentToken')){ additionalToken=localStorage.getItem('localAssesmentToken');}		
		// end manish

		let res = await functionService.post('Goals/addGoal', defaultFormData, additionalToken);
		if (res !== false && res.status !== false) {
			getGolas(); // TO DO need to remove this call...
			// console.log("goal updated");
			setFormData({ lGoalId: 0, szGoalDesc: '' });
			setOpenModal(false);
			// console.log("form data goal id reset to 0");
			setShowToast(true)
		} else {
			setShowToast1(true)
		}

		setDisabled(false);
		props.setLoader(false);
	}


	const handleRemoveGoal = async (lGoalId) => {

		if (disabled === true) { return; }

		if (window.confirm('Are you sure you want to remove this goal?') === false)
			return;

		setDisabled(true);
		props.setLoader(true);

		//alert('in handle remove goal:' + lGoalId);

		let defaultFormData = {
			"lAssessmentId": props.resultData && props.resultData.lAssessmentId,
			"lGoalId": lGoalId
		};

		// changed by manish to get current token	
		let additionalToken = functionService.getCurrentToken();
		//let additionalToken = '';
		//if(localStorage.getItem('localAssesmentToken')){ additionalToken=localStorage.getItem('localAssesmentToken');}		
		// end manish

		let res = await functionService.post('Goals/removeGoal', defaultFormData, additionalToken);
		if (res !== false && res.status !== false) {
			getGolas();
			//setFormData({dueDate:'',szGoalDesc:''});
			setShowToast(true)
		} else {
			setShowToast1(true)
		}

		setDisabled(false);
		props.setLoader(false);
	}


	const handleCompleteGoal = async (lGoalId) => {

		if (disabled === true) { return; }

		if (window.confirm('Are you sure you want to mark this goal as completed?') === false)
			return;

		setDisabled(true);
		props.setLoader(true);

		//alert('in handle remove goal:' + lGoalId);

		let defaultFormData = {
			"lAssessmentId": props.resultData && props.resultData.lAssessmentId,
			"lGoalId": lGoalId
		};

		// changed by manish to get current token	
		let additionalToken = functionService.getCurrentToken();
		//let additionalToken = '';
		//if(localStorage.getItem('localAssesmentToken')){ additionalToken=localStorage.getItem('localAssesmentToken');}		
		// end manish

		let res = await functionService.post('Goals/completeGoal', defaultFormData, additionalToken);
		if (res !== false && res.status !== false) {
			getGolas();
			//setFormData({dueDate:'',szGoalDesc:''});
			setShowToast(true)
		} else {
			setShowToast1(true)
		}

		setDisabled(false);
		props.setLoader(false);
	}

	//  *********************TextEditor ***********

	const handleTextData = (val) => {

		setFormData({ ...formData, szGoalDesc: val });

	};

	// console.log("GraphDara",formData.szGoalDesc)
	return (
		<>
			<div className={styles.analyticsListingmanagegoals}>
				<h5 onClick={() => setOpen(!open)}>Create or Manage your Goals <span className={styles.analytcounticsListingmanagegoals}>{props.row.listGoals.length}</span> <span className={styles.viewallgoals}>View <FontAwesomeIcon icon={open === false ? faChevronRight : faChevronDown} /></span></h5>
				<Form  >
					<Form.Group className={styles.formField}>
						<TextEditor
							datas={
								(formData.szGoalDesc) || ""
							}
							classes="dimDescription"
							formData={""}

							setFormData={formData.szGoalDesc}

							handleTextData={handleTextData}
							dataKey='golDescription'
							height='150'

						/>

					</Form.Group>
					<Form.Group className={styles.lisitngformgroup} controlId="formBasicEmail">
						{/* <Form.Control type="email" placeholder="Enter your goal"
							value={formData.szGoalDesc}
							onChange={(e) => { setFormData({ ...formData, szGoalDesc: e.target.value }) }}
						/> */}
						{/* <span className={styles.bytextlisitng}>By</span> */}

						<Form.Control type="date" placeholder="20 Oct, 2021"
							value={formData.startDate}
							onChange={(e) => { setFormData({ ...formData, startDate: e.target.value }) }}
						/>

						<Form.Control type="date" placeholder="20 Oct, 2021"
							value={formData.dueDate}
							onChange={(e) => { setFormData({ ...formData, dueDate: e.target.value }) }}
						/>
						<Button
							onClick={() => handleSubmit(0)}

						>
							Add Goal
						</Button>

					</Form.Group>

				</Form>
				<Collapse in={open}>
					<div id="example-collapse-text">

						{props.row.listGoals.length > 0 && props.row.listGoals.map((goalRow, index) => (

							<div key={index} className={styles.collapseMainanalystic}>
								<div className={styles.goalslistheadermain}>
									<div className={`${styles.goalsheaderpart} ${styles.goalssheaderPartFlex}`}>
										<div
											dangerouslySetInnerHTML={{
												__html: DOMPurify.sanitize("</h3>" + goalRow.m_szGoalDesc + "</h3>")
											}}

										>
										</div>
										{/* {console.log('goal row', goalRow)} */}
										<div className={styles.floatRight}>
											{/* <h3>{goalRow.m_szGoalDesc}</h3> */}

											<p className={styles.cretaeddategoals}>Start: {functionService.convertDate(goalRow.m_dtGoalStartDate)}</p>
											<p className={styles.duedategoals}>Due: {functionService.convertDate(goalRow.m_dtGoalDueDate)}</p>
										</div>		

									</div>
									<div className={styles.iconsheaderpart}>
										{goalRow.m_nGoalStatus != 2 && (
											<div>
												<span> <FontAwesomeIcon icon={faEdit} size={"sm"} className={styles.goalEdit} onClick={() => handleEditGoal(goalRow)} /></span>
												<span> <img src={deleteIcon} title='Remove Goal' alt='Remove Goal' onClick={() => { handleRemoveGoal(goalRow.m_lGoalId); }} /> </span>
												<span><img src={checkIcon} title='Mark Goal Completed' alt='Mark Goal As Completed' onClick={() => { handleCompleteGoal(goalRow.m_lGoalId); }} /> </span>
												
											</div>
										)}
										{goalRow.m_nGoalStatus == 2 && <span>Completed</span> }

									</div>
								</div>

                            
								<GoalsComment  getGolas={getGolas} resultData={props.resultData} commentRow={goalRow} row={props.row} setLoader={props.setLoader} />

							</div>
						))}

					</div>
				</Collapse>

				<Modal show={openModal} onHide={handleClose} className={styles.modalTemplete}>
					<Modal.Header closeButton className={styles.modalHeader}>
						<Modal.Title className={styles.modal_header}>Edit Goals</Modal.Title>
					</Modal.Header>
					{/* {console.log('current goal', currentGoal)} */}
					<Form>
						<Modal.Body className={styles.modalBody}>

							<Form.Group className={styles.formField}>
								<Form.Label>Edit Goal</Form.Label>

								{/* { setFormData({ ...formData, lGoalId: (currentGoal && currentGoal.m_lGoalId) }) } */}
								<TextEditor
									datas={
										(formData.szGoalDesc) || ""
									}
									classes="dimDescription"
									formData={""}

									// setFormData={currentGoal && currentGoal.m_szGoalDesc}

									handleTextData={handleTextData}
									dataKey='goalDescription'
									height='200'

								/>

							</Form.Group>

							<Form.Group className="mb-3 relative" controlId="formBasicEmail">
								<Form.Label>Start</Form.Label>

								<Form.Control type="date" placeholder="20 Oct, 2021"
									// value={currentGoal && getDateForSelection(currentGoal.m_dtGoalStartDate)}
									value={formData.startDate}
									onChange={(e) => { setFormData({ ...formData, startDate: e.target.value }) }}
								/>

							</Form.Group>
							<Form.Group className="mb-3 relative" controlId="formBasicEmail">
								<Form.Label>Due</Form.Label>

								<Form.Control type="date" placeholder="20 Oct, 2021"
									// value={currentGoal && getDateForSelection(currentGoal.m_dtGoalDueDate)}
									value={formData.dueDate}
									onChange={(e) => { setFormData({ ...formData, dueDate: e.target.value }) }}
								/>

							</Form.Group>

						</Modal.Body>
						<Modal.Footer className={styles.modal_footer}>
							<Button variant="primary" onClick={() => handleSubmit(currentGoal && currentGoal.m_lGoalId)} >
								Submit
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
				<Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message="Updated Successfully!!" toasticon={faCheckCircle} />
				<Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message="Updation Failed!!" toasticon={faBan} />
			</div>
		</>
	);
}
export default GoalsList;