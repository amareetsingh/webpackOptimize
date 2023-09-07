import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import {Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { functionService } from '../../Context/functions';
function AccountVerify(props) {
	const[accounrVerified,setAccountVerified]=useState(false);
	const[message,setMessage]=useState('Please wait we are checking your account verification !!');
	const searchParam = new URLSearchParams(window.location.search);
	
	const code = searchParam.get('code');
	
	const email = searchParam.get('email');
	const[loader,setLoader]=useState(false);
	const getVerifyAccount = async(code,email)=>{
		setLoader(true);
		let res = await functionService.post('User/confirm',{
			"code": code.replaceAll(" ","+"),
			"email": email
		  });
		  setLoader(false);
		  
		 if(res !== false && res.status !== false){
			
			if(res.data.data.statusCode === 200){
				setAccountVerified(true);
				setMessage('Your account is successfully verified!!');
			} else{
				
				setMessage(res.data.data.result);
			}
			
		 }else{
			
			 if(res.hasOwnProperty("data")){
				
				setMessage("Some Error occured!");
			 }else{
				setMessage("Some Error occured!");
			 }
		 } 
	}
	useEffect(()=>{
		getVerifyAccount(code,email);
	},[]);
	return (
		<>
		<Header loader={loader}/>
		
		<div className={styles.verify_page}>				
			<Container fluid>
				<Row>
					<div className={styles.topbanner}>
						<div className={styles.thankinner}>
							<h3>{message}</h3>
							{accounrVerified && <p>Welcome to Evalinator! We’re glad you have decided to join us.</p>	}						
							<Link to="">Go to Login</Link>								
						</div>					
					</div>					
				</Row>
			</Container>              
			  
		</div>
		<Footer />
		</>
	);
}

export default AccountVerify;
