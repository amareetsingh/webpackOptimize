import React, {useState, useEffect} from 'react';
import styles from './thanks.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import {Container, Row} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Thankyou(props) {
	const [login, setLogin] = useState(false)
	const [stripeStatus, setStripeStatus] = useState('false');
	const location = useLocation();

	useEffect(() => {

		let user = localStorage.getItem('currentUser');
		if(user){
			setLogin(true)
		}

		const search = location.search;
		const params = new URLSearchParams(search);
		const success = params.get("success");
		//alert('param ' + success);
		if(success !== '' && success !== '') {
			setStripeStatus(success);
		}		
		//alert('stripeStatus ' + stripeStatus);	

	  }, [stripeStatus]);
	return (
		<>
		<Header/>
		
		<div className={styles.thankyou_page}>				
			<Container fluid>
				<Row>
					<div className={styles.topbanner}>
						<div className={styles.thankinner}>
						{stripeStatus && stripeStatus == 'true' && 
							
								<>
								<h3>You have successfully subscribed!</h3> 
								{/* <p>Please check your email  to activate your account </p> */}
								</>
							
							}							
							{stripeStatus && stripeStatus == 'false' && 
								<>
								<h3>You were not subscribed successfully.</h3>
								<p>Please check your email to activate your account and login. You can then subscribe from your profile section. </p>
								</>

							} 
						
						{login ? <Link to=""><FontAwesomeIcon icon={faArrowLeft} />Back to Home</Link>
							:
							<Link to="">Go to Login</Link>
							}	
						</div>					
					</div>					
				</Row>
			</Container>              
			  
		</div>
		<Footer />
		</>
	);
}

export default Thankyou;
