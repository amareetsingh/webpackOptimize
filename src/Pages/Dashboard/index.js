import React,{useEffect, useReducer, useState} from 'react';
import styles from './dashboard.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { functionService } from '../../Context/functions';
import Respondent from './Respondent';
import Noassessment from '../../assets/images/noasses.png';
import { AuthReducer, initialState } from '../../Context/reducer';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Toaster from '../../Components/Toaster';
function Dashboard(props) {
	const[assesmentList,setAssesmentList]= useState([]);
	const[linkedAssesmentList,setLinkedAssesmentList]= useState([]);
	const[loader,setLoader]=useState(false);
	const[deleted,setDeleted]=useState(0);
	const [showtoast, setShowToast] = useState(false);
	const [user] = useReducer(AuthReducer,initialState);
	const getData = async()=>{
		setLoader(true);
		//console.log("User from reducer", user);
		let res = await functionService.post('Assessment/getAssessmentsList');
		if(res && res.status === true){
			// console.log("getAssessmentsList",JSON.parse(res.data.data.result));					
			setAssesmentList(JSON.parse(res.data.data.result));
			}
			else {
			//if(res == null || (res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser'))){
				localStorage.removeItem('currentUser');
				localStorage.removeItem('token');
				window.location = "/login";
				return;
			  //}
		}
		setLoader(false);
	}
	useEffect(() => {
		localStorage.setItem('currentStep','false');
		if(localStorage.getItem('currentUser')){
			//user = localStorage.getItem('currentUser');
			getData();
		}
	},[deleted]);

	const handleClone = async(szGuid)=>{

		if (window.confirm('Are you sure you want to clone this assessment? Only last published changes will be cloned.') === false)
			return;

		setLoader(true);
		let res = await functionService.post('Assessment/clone',{szGuid:szGuid,szName: "string"});
		if(res.status === true){
			setShowToast(true);
			getData();
		}
		setLoader(false);
	}

	const dateFormatter = (dt) => {
		var date = new Date(dt + 'Z');
		var options = { year: 'numeric', month: 'short', day: '2-digit' };
		return (new Intl.DateTimeFormat('en-GB', options).format(date)).replace(/ /g, '-');
	}

 

	return (
		<>
		<Header loader={loader}/>
		<Toaster showtoast={showtoast} toggleShowToast={setShowToast} bgclass="success" status="Success" message="Successfully cloned!!" toasticon={faCheckCircle} />
		<div className={styles.dashboardPage}> 
			<Container>
			<div className={styles.container}> 
				<div className={styles.dashboard_content}>
				  <div className={styles.assent}>
				  	<div className={styles.ViewButtonGroup}>
						<p><strong className={styles.paddingLeftRight}>My Assessments</strong >  |</p>
						<p><Link to="/preregistration" className={`${styles.paddingLeftRight} ${styles.navLinks} `} >Respondent Groups</Link> |</p>
						<p><Link to = '/linkedAssessments' className={styles.navLinks}  >Linked Assessments</Link></p>
                    </div>
					   
					   {/* <Link to="/templates" className={styles.create_btn} >
						Create Assessment
					   </Link> */}

						<Link
							to="/templates"
							className={`${styles.create_btn} ${assesmentList.length === 0 ? styles['flash-button'] : ''}`}
						>
							Create Assessment
						</Link>


				  </div>
				  {/* {console.log("Dashboard user:", user)} */}
				  {(assesmentList.length !== 0) ? <>
				  {assesmentList && assesmentList.map((obj,index)=>(
				  	<div  className={styles.create_row} key={index}>
					   <div className={styles.rowsection}>
					     <div className={styles.action_status}>
						 <p   dangerouslySetInnerHTML={{
                                            __html: obj && obj.m_szSurveyName
                                          }}></p>  
						  
						  
						   {obj.m_nPublishStatus === 1 ?
							<span className={styles.publise}>Published</span>
							:
							obj.m_nPublishStatus === 0 ?
							<span className={styles.not_publise}>Not Published</span>
							:							
							<span className={styles.not_publise_pending}>Published Pending Changes</span>
							}
							<p className={styles.date}>{dateFormatter(obj.m_dtCreated)  }</p>
						   </div>
	{/* {console.log("obj",obj.m_dtCreated)}; */}
						   
					   </div>	
									   
					   <Respondent obj={obj} setLoader={setLoader} setDeleted={setDeleted} user={user} handleClone={handleClone}/>
					</div> 
				   ))}</>
				   :
				   <div className={styles.no_asses}>
				   	<img src={Noassessment} alt="no assessment" />
					   
				   </div>}
				</div>
				
			</div>	
			</Container>
		</div>
		<Footer/>
		</>
	);
}

export default Dashboard;
