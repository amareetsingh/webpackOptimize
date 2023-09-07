import React, { useEffect, useReducer, useState } from 'react';
import styles from './dashboard.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { functionService } from '../../Context/functions';
import LinkedRespondent from './LinkedRespondent';
import Noassessment from '../../assets/images/noasses.png';
import { AuthReducer, initialState } from '../../Context/reducer';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Toaster from '../../Components/Toaster';
import { useHistory, useParams } from "react-router-dom";
import LinkedAssessmentPopup from './LinkedAssessmentPopup';
const LinkedAssessments = (props) => {
	const [linkedAssesmentList, setLinkedAssesmentList] = useState([]);
	const [loader, setLoader] = useState(false);
	const [showtoast, setShowToast] = useState(false);
	const [user] = useReducer(AuthReducer, initialState);
	const handleCloseFeedback = () => setShowfeedback(false);
	const handleShowFeedback = () => setShowfeedback(true);
	const [showfeedback, setShowfeedback] = useState(false);
	const getData = async () => {
		setLoader(true);
		//console.log("User from reducer", user);
		let res = await functionService.post('Assessment/getLinkedAssessments');
		if (res && res.status === true) {
			// console.log("getAssessmentsList",JSON.parse(res.data.data.result));					
			setLinkedAssesmentList(JSON.parse(res.data.data.result));
			// console.log('linkedAssessment',JSON.parse(res.data.data.result) )
		}
		setLoader(false);
	}

	useEffect(() => {

		getData();
	}, []);

	const history = useHistory();

	const handleBack = () => {

		history.push("/dashboard");
	};

	return (
		<>
			<Header loader={loader} />
			<Toaster showtoast={showtoast} toggleShowToast={setShowToast} bgclass="success" status="Success" message="Successfully cloned!!" toasticon={faCheckCircle} />
			<div className={styles.dashboardPage}>
				<Container>
					<div className={styles.container}>
						<div className={styles.dashboard_content}>
							<div className={styles.assent}>
								<div className={styles.ViewButtonGroup}>
									<p ><Link to='/dashboard' className={`${styles.navLinks} ${styles.paddingLeftRight}`}  >My Assessments</Link>  |</p>
									<p><Link to="/preregistration" className={`${styles.paddingLeftRight} ${styles.navLinks} `} >Respondent Groups</Link> |</p>
									<p><strong >Linked Assessments</strong></p>
								</div>

								<button onClick={handleShowFeedback} className={styles.create_btn} >
									Create Linked Assessment
								</button>
							</div>
							{/* {console.log("Dashboard user:", user)} */}
							{(linkedAssesmentList.length !== 0) ? <>
								{linkedAssesmentList && linkedAssesmentList.map((obj, index) => (
									<div className={styles.create_row} key={index}>
										<div className={styles.action_status}>
											<p dangerouslySetInnerHTML={{
												__html: obj && obj.m_szEvalinatorName
											}}></p>

										
										</div>
									
										<LinkedRespondent handleShowFeedback={handleShowFeedback} obj={obj} setLoader={setLoader} getData={getData} />
									</div>
								))}</>
								:
								<div className={styles.no_asses}>
									<img src={Noassessment} alt="no assessment" />

								</div>}
						</div>

					</div>

					<LinkedAssessmentPopup
						getData={getData}
						handleClose={handleCloseFeedback}
						setLoader={setLoader}
						showfeedback={showfeedback}
						setShowfeedback={setShowfeedback}
					/>
				</Container>
			</div>
			<Footer />
		</>
	)
}

export default LinkedAssessments