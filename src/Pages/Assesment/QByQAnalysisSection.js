import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "../Analyticsresult/analyticsresult.module.css";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { checkOptionSetting } from "../../Context/functions";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import GoalsList from "../Analyticsresult/GoalsList";
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import Questionlist from '../Front/Questionlist'

function QByQAnalysisSection({
  resultData,
  options,
  listAnalysis,
  setLoader,
  setResultData,
  szTitle,
}) {
  //   const [showQuestionList, setShowQuestionList ] = useState(false)
  //   const[questionOptions,setQuestionOptions]=useState({});
  //   const[currentStage,setCurrentStage]=useState(-1);

  useEffect(() => {
    // make some API call or do some computation based on param
    // set the state with the new data
    // setData(newData);
    // console.log('resultData changed!');
  }, [options]);

  return (
    <div>
      {/* {(checkOptionLanding(95, 1, (resultData && resultData.gData)) || checkOptionLanding(95, 2, (resultData && resultData.gData))) && */}

      <Container className={styles.printPage}>
        {/* <div className={styles.analyticsListing}>
          <Row className={styles.mainContainerAnalyticsLisiting}>
            <Col>
              <h2 style={{ textAlign: "center" }}>{szTitle}</h2>
            </Col>
          </Row>
        </div> */}
              <h2 style={{ textAlign: "center" }}>{szTitle}</h2>

        {Object.keys(resultData).length > 0 &&
          listAnalysis.map((obj, index) => (
            <Row className={styles.questionDiv} key={index}>
              <Col>
                <div className={styles.analyticsListing}>
                  <Row className={styles.mainContainerAnalyticsLisiting}>
                    {checkOptionSetting(210, 1, options) && (
                      <div className={styles.analyticsListingleftbar}>
                        <CircularProgressbarWithChildren
                          value={(obj.sScore / obj.sMaxScore) * 100}
                          styles={buildStyles({
                            strokeLinecap: "butt",
                            textSize: "32px",
                            pathTransitionDuration: 0.5,
                            pathColor: `#473E8F`,
                            textColor: "#000",
                            trailColor: "#C4C4C4",
                            backgroundColor: "#000",
                          })}
                        >
                          <div style={{ fontSize: 20, marginTop: -5 }}>
                            <strong>{obj.sScore}</strong>{" "}
                            {obj.sMaxScore > 0 && `/ ${obj.sMaxScore}`}
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    )}
                    <div
                      className={
                        checkOptionSetting(190, 1, options)
                          ? styles.analyticsListingBody
                          : styles.analyticsListingBodyItem
                      }
                    >
                      <div className={styles.toplistingSection}>
                        <h4>{obj.szTitle}</h4>
                        {/* <div>
													<Tabs
														defaultActiveKey="1"
														id="justify-tab-example"
														className="mb-3"
														justify
														
													>
																						
														<Tab eventKey="1" title={obj.szTitle}>
														
														</Tab>
														<Tab eventKey="2" title="Loooonger Tab">

                                                       
															
														</Tab>
														
													</Tabs>

													<h4> hello</h4>
											
												</div> */}
                        {/* <p>	{obj.szDesc}</p> */}
                        <p dangerouslySetInnerHTML={{ __html: obj.szDesc }} />
                      </div>
                      <div className={styles.KnowMorenew}>
                        {/* { console.log('resultdata',resultData.gData)} */}

                        {checkOptionSetting(190, 1, options) &&
                          resultData &&
                          resultData.oUser &&
                          resultData.oUser.m_lUserId !== 0 && (
                            <GoalsList
                              setLoader={setLoader}
                              resultData={resultData}
                              row={obj}
                              setResultData={setResultData}
                            />
                          )}
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
      </Container>
      {/* } */}
    </div>
  );
}

export default QByQAnalysisSection;
