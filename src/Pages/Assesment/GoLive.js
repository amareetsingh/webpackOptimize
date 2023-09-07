import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { checkOptionSetting } from '../../Context/functions';
import styles from './assesment.module.css';

function GoLive(props) {
   

	return (
            <>
             <Col  sm={9} className={styles.clientDetails}>
						
						<div className={styles.mainContainerViewLive}>
							<Row >
                            <Col >
									<div className={styles.viewLiveBox}>
										{checkOptionSetting(40,1, props.currentAssesment && props.currentAssesment.gData && props.currentAssesment.gData.gdictOptions)}
										<h2>Direct Links</h2>
                                        <label>Share a direct link with others by email or over social media. No changes on your website are needed.</label>
										<p>{props.iframeAssesmentUrl}</p>
                                        <label>If you have designed your own landing page and want to send users directly to the assessment, then use this link below:</label>
										<p>{checkOptionSetting(40,2, props.currentAssesment && props.currentAssesment.gData && props.currentAssesment.gData.gdictOptions) ?  props.iframeQuestionUrl : props.iframeRegUrl}</p>
									</div>
								</Col>
                                </Row>
								<hr/>
                                <Row >

								<Col >
									<div className={styles.viewLiveBox}>
										{checkOptionSetting(40,1,props.currentAssesment && props.currentAssesment.gData && props.currentAssesment.gData.gdictOptions)}
										<h2>Whitelabeling Links</h2>
                                        <label>Use the following suggested html code to embed the assessment on your website. You can do so inside an existing page, or on a new page of your website. </label>
										<label>This link will show the landing page of your assessment</label>
                                        <p>{`<iframe src="${props.iframeAssesmentUrl}" title= "${props.currentAssesment.m_szSurveyName} (${props.currentAssesment && props.currentAssesment.m_szAssessmentType})"></iframe>`}</p>
										{checkOptionSetting(40,2,props.currentAssesment && props.currentAssesment.gData && props.currentAssesment.gData.gdictOptions) ? 
										<>
										<label>To send users directly to the assessment, use this html code below:</label>
										<p>{`<iframe src="${props.iframeQuestionUrl}" title= "${props.currentAssesment.m_szSurveyName} (${props.currentAssesment && props.currentAssesment.m_szAssessmentType})"></iframe>`}</p>
										</>			
										:
										<>
										<label>To send users directly to the assessment, use this html code below:</label>
										<p>{`<iframe src="${props.iframeRegUrl}" title= "${props.currentAssesment.m_szSurveyName} (${props.currentAssesment && props.currentAssesment.m_szAssessmentType})"></iframe>`}</p>
										</>	
										}
                                        <label>Your developer can adjust the height, width, scroll, border and other properties of the iframe as needed. </label>
									</div>
								</Col>
							</Row>
						</div>
						</Col> 
            </>
	);
}

export default GoLive;
