import React, { useState } from 'react';
import styles from './pricing.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Container, Image, Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Settingicon from "../../assets/images/Settings.svg"; 
import Swipeicon from "../../assets/images/Swipe.svg";
import Trendingicon from "../../assets/images/Trending.svg";
import SubscribeToProduct from '../../Stripe_com/SubscribeToProduct';
import Faq from './Faq';
import {FaqData} from './FaqData';

function Pricing(props) {

	function handleDiscoveryCallClick() {
		// Your JavaScript code to run when the button is clicked goes here
		// You can open a new window or perform any other actions you need.
		window.open('https://calendly.com/evalinator/30min', '_blank'); // This opens a new window with a specific URL
	}

	const[loader,setLoader]=useState(false);

	return (
		<div style={styles.container}>
			<Header loader={loader}/>
			<div className={styles.pricing_top}>
				<Container >
					{/* <h1>Sign up now and lock in up to 30% off!</h1> */}
					<h1>Fast-Track Growth: Start Today With a Risk Free Trial</h1>
					<p>Use a system of engaging expert quizzes, assessments, and goal setting to generate qualified leads, personalize your sales followups, and expand existing relationships.</p>
					{/* <p>Engage like an expert should. Upgrade each customer touchpoint into a conversation.</p> */}
				</Container >
			</div>

			<div className={styles.plansection}>
				<Container >
					{/* <Row>
						<Col md={12}><p>Sign up now and lock in 30% OFF. Offer expires at the end of our early access program. Thank you for considering Evalinator!</p>
						</Col>
					</Row> */}
					<Row>
						<Col><SubscribeToProduct setLoader={setLoader}/>
						</Col>						
					</Row>						

					{/* <h2>Choose Right Plan For You</h2> */}
					{/*<h2>Choose your plan</h2>*/}
					
										
          			
				</Container >


					
			</div>

			<div>
				<Container >		
				<div><br></br>* Custom plans are possible. Please contact us.</div>
				<div>*** <b>Coaches</b>: Free customizable templates for Wheel of Life, DISC, Big 5, Storytelling, Human Design Type, and more!
				</div>
				</Container>
			</div>

			<div className={styles.how_it_works}>
			<Container>
				<h2 className={styles.faq_title}>Choose Our Guided Plan</h2>
				<p>Leverage our expertise and white glove service. Launch & start engaging your audience <strong>within days</strong>.</p>
				<Row className={styles.works_rows}>
						<Col sm={1} className={styles.work_part}></Col>
						<Col sm={10} className={styles.work_part}>
							<ul style={{textAlign: 'left', listStylePosition: 'inside' }}>
								<li style={{ textIndent: '-25px' }}>Live workshops for a fully personalized experience</li>
								<li style={{ textIndent: '-25px' }}>Workshop 1: Analyze your target audience, solutions & services. Brainstorm your assessment. Review integration needs for your CRM or email marketing system. </li>   
								<li style={{ textIndent: '-25px' }}>Create your assessment including your own branding, questions, scoring, rating tiers, personalized feedback text, and any other content as needed</li>
								<li style={{ textIndent: '-25px' }}>Workshop 2:  Live test with you and refine your assessment, test the integration, and help host on your website.</li>
								<li style={{ textIndent: '-25px' }}>Be available to make edits and adjustments as you test it out</li>
								<li style={{ textIndent: '-25px' }}>** Bonus: Your first month of subscription is included!</li>
							</ul>
						</Col>
				</Row>	

				<br></br>
					<h3>$599, one time</h3><br></br>
				<Button 
					className={styles.btntrial} 
					style={{ display: 'block', margin: '0 auto' }}
					onClick={handleDiscoveryCallClick}
				>
					Schedule a Consultation
				</Button>

			</Container>

				
        	</div>

			<div className={styles.faq_price}>
				<Container>
					<h2 className={styles.faq_title}>Frequently Asked Questions</h2>
					<div className={styles.faq_list}>
						{FaqData && FaqData.map((item, index) => {
							return(
							<Faq key={index} title = {item.title} content= {item.content}/>
							)
						})}
						
					</div>
					
				</Container>
			</div>

			<div className={styles.how_it_works}>
				<Container >
					<h2>How it works</h2>
					<p>Just 3 simple steps. Let your expertise shine.</p>
					<Row className={styles.works_rows}>
						<Col sm={4} className={styles.work_part}>
							<div className={styles.icons}>
								<Image src={Settingicon} alt="setting-icon" />
							</div>
								<h3>Envision</h3>
								<p>Organize your unique expertise to create an engaging interactive model of what good looks like. Engage clients by starting with the big picture. Use our quick start templates.</p>
							
						</Col>
						<Col sm={4} className={styles.work_part}>
							<div className={styles.icons_one}>
								<Image src={Swipeicon} alt="setting-icon" />
							</div>							
								<h3>Generate Leads & Strategize</h3>
								<p>Help client determine where they are in their journey. Build confidence and create engagement to collaborate on a roadmap of actions. Be 100% client centric.</p>
						</Col>
						<Col sm={4} className={styles.work_part}>
							<div className={styles.icons_two}>
								<Image src={Trendingicon} alt="setting-icon" />
							</div>
								<h3>Personalize & Grow</h3>
								<p>Create systematic growth by tailoring your services and products to meet the client needs you have collaboratively defined with them. Be the partner they can trust.</p>
							
						</Col>
						<Button className={styles.btntrial}>Start Your Free 14 Day Trial </Button> 

					</Row>

				</Container >
			</div>


			<Footer />
		</div>
	);
}

export default Pricing;
