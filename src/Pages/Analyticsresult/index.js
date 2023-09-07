import React, { useEffect, useState } from "react";
import styles from "./analyticsresult.module.css";
// import Footer from "../../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Container, ModalFooter } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ProfileChart1 } from "../Assesment/ProfileChart";
// import minilogofooter from "../../assets/images/Mini_logo-footer.png";
import "react-circular-progressbar/dist/styles.css";
import printIcon from "../../assets/printIcon.svg";
// import {CircularProgressbarWithChildren,buildStyles} from "react-circular-progressbar";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
// import GoalsDashboard from './GoalsDashboard'
import GoalsDashboard1 from "./GoalsDashboard1";
import MaturityChart from "./MaturityChart";
import RatingBandsTabbed from "../../Components/Sections/RatingBandsTabbed";
import DimensionsTabbed from "../../Components/Sections/DimensionsTabbed";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheckCircle,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import {
  checkOptionSetting,
  functionService,
  getColor,
} from "../../Context/functions";
import GraphData from "../Front/GraphData";

import Loader from "../../Components/Loader";
import Promotions from "../Assesment/Promotions";
import QByQAnalysisSection from "../Assesment/QByQAnalysisSection";
import Questionlist from "../Front/Questionlist";
import GanttChart from "../../Components/GanttChart";
import GoalsList from "./GoalsList";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function AnalyticsresultPage(props) {
  const [loader, setLoader] = useState(false);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [resultData, setResultData] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [apiColl, setApiColl] = useState(false);
  const [completedGoals, setCompletedGoals] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  let goalStatus;

  const [settingActiveTab, setSettingActiveTab] = useState(0);
  const [show, setShow] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (key) => {
    setSettingActiveTab(key);
  };

  const getBandIndex = (resultData) => {
    /*let index =
      resultData.gData &&
      resultData.gData.glistBands.findIndex(
        (item) => item.m_nRatingScaleSeqNum === resultData.nRatingSeqNum
      );
*/
      let index =
      resultData.gData &&
      resultData.gData.glistBands.find(band => band.m_nRatingScaleSeqNum === resultData.nRatingSeqNum).m_nRatingScaleSeqNum;
    
    //console.log('index', index);
    return index;
  };

  /*const data = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
      {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(71, 62, 143, 0.2)',
      borderColor: 'rgba(71, 62, 143, 1)',
      borderWidth: 1,
      },
    ],
    };*/
  const nTotalQuestionGoals =
    (resultData && resultData.nTotalQuestionGoals) || "0";
  const nDimQuestionGoals = (resultData && resultData.nDimQuestionGoals) || "0";
  let nAssessmentGoals = "0";

  if (
    resultData &&
    resultData.oAssessmentGoals &&
    resultData.oAssessmentGoals.listGoals
  ) {
    nAssessmentGoals = resultData.oAssessmentGoals.listGoals.length.toString();
  }
  const sum = parseInt(nTotalQuestionGoals) + parseInt(nDimQuestionGoals) + parseInt(nAssessmentGoals);

  useEffect(() => {
    if (params.get("id") != null) {
      var nId = 0;
      if (params.get("nIterationId") != null) {
        nId = params.get("nIterationId");
      }

      const getData = async () => {
        setLoader(true);
        let res = await functionService.post("Assessment/getRespondentsView", {
          lAssessmentId: params.get("id"),
          lRespondentId: params.get("respondId"),
          nIterationId: nId,
        });

        if (res.status === true) {
          if (res.data.data.statusCode === 200) {
            // JSON.parse(res.data.data.result);
            setResultData(JSON.parse(res.data.data.result));
            // getButtonBgColor(JSON.parse(res.data.data.result));
            // console.log("resultData", resultData);
          }
        } else {
          // if (
          //   res.response &&
          //   res.response.status === 401 &&
          //   localStorage.getItem("currentUser")
          // ) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          window.location = "/login";
          return;
          // }
        }
        setLoader(false);
      };
      getData();
    } else {
      let response = functionService.getAssesmentResult();

      // const lAssessmentId =
      //   response &&
      //   response.gData &&
      //   response.gData.goAssessment &&
      //   response.gData.goAssessment.nId;
      // console.log("results page id", szAssessmentId);

      setResultData(response);

      // if (lAssessmentId > 0 && checkOptionSetting(230,1, response && response.gData && response.gData.gdictOptions) == false)
      //   functionService.sendTrackingData("assess/postTrackingEvent", {
      //     assessId: lAssessmentId,
      //     eventId: 70,
      //   });
    }
  }, []);

  function handleCheckboxChange(event, id) {
    const isChecked = event.target.checked;
    const checkboxValue = event.target.value;
    if (isChecked) {
      setCheckedValues((prevValues) => [...prevValues, checkboxValue]);
      setCheckedCount((prevCount) => prevCount + 1);
    } else {
      setCheckedValues((prevValues) =>
        prevValues.filter((value) => value !== checkboxValue)
      );
      setCheckedCount((prevCount) => prevCount - 1);
    }
  }

  const handleCompare = async() => {
    // let res = await functionService.post("api url ", {
    //   nIterationId:checkedValues
    // });

    console.log("date > nIterationId   ", checkedValues);
    setCheckedCount(0);
    setShow(false)

  };
  return (
    <>
      {/* ************** model *************
       */}

      <div className={styles.analyticsresultPage}>
        {/* <Header /> */}
        <Loader loader={loader} />
        {/* <Container fluid className={styles.topheaderAnalytics}>
			<form></form>
		</Container> */}

        <Container
          className={
            checkOptionSetting(
              170,
              2,
              resultData && resultData.gData && resultData.gData.gdictOptions
            )
              ? ""
              : styles.fluidContainer
          }
        >
          <div className="resutlPageBreak">
            <Row className={styles.mainImageDiv}>
              <Col>
                <div
                  style={
                    checkOptionSetting(
                      170,
                      1,

                      resultData &&
                        resultData.gData &&
                        resultData.gData.gdictOptions &&
                        resultData.gData.goAssessment &&
                        resultData.gData.goAssessment.szImageURL !== ""
                    )
                      ? {}
                      : {
                          background: getColor(
                            resultData && resultData.gData,
                            1
                          ),
                        }
                  }
                  className={`${styles.mainContainerAnalytics} ${
                    checkOptionSetting(
                      170,
                      2,
                      resultData &&
                        resultData.gData &&
                        resultData.gData.gdictOptions
                    )
                      ? styles.landingshortBanner
                      : styles.landingtallBanner
                  }`}
                >
                  <div className={styles.landingfullImage}>
                    {resultData &&
                      resultData.gData &&
                      resultData.gData.goAssessment &&
                      resultData.gData.goAssessment.szImageURL !== "" && (
                        <img
                          src={resultData.gData.goAssessment.szImageURL}
                          className={styles.pexelsback}
                          alt={
                            resultData &&
                            resultData.gData &&
                            resultData.gData.goAssessment &&
                            resultData.gData.goAssessment.szName
                          }
                        />
                      )}

                    {/* <img
                      src={printIcon}
                      alt="print"
                      className={styles.printbtn}
                      onClick={() => window.print()}
                    /> */}
                  </div>

                  {/* {checkOptionSetting(70, 0, resultData && resultData.gData) &&
              checkOptionSetting(140, 0, resultData && resultData.gData) ? (
                ""
              ) : (
                <h1
                  style={{ color: getColor(resultData && resultData.gData, 3) }}
                >
                  <span>
                    {resultData &&
                    resultData.oUser &&
                    resultData.oUser.m_szFirstName
                      ? resultData.oUser.m_szFirstName + ", y"
                      : "Y"}
                  </span>
                  our results are in!
                </h1>
              )} */}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        {checkOptionSetting(
          70,
          1,
          resultData && resultData.gData && resultData.gData.gdictOptions
        ) &&
          resultData &&
          resultData.gData && (
            // resultData.gData.nType !== "3" &&
            <div className={styles.roundcircelresult}>
              <h4>
                {/* {console.log("resultData.szScoreTitle", resultData)} */}
                {resultData &&
                  resultData.szScoreTitle !== "" &&
                  resultData.szScoreTitle}{" "}
                {resultData &&
                  resultData.gData &&
                  resultData.gData.nType !== "1" && (
                    <span>
                      {checkOptionSetting(
                        70,
                        1,
                        resultData &&
                          resultData.gData &&
                          resultData.gData.gdictOptions
                      ) &&
                        resultData &&
                        resultData.sFinalScore !== 0 && (
                          <>
                            {resultData && resultData.sFinalScore}{" "}
                            {checkOptionSetting(
                              72,
                              1,
                              resultData &&
                                resultData.gData &&
                                resultData.gData.gdictOptions
                            ) && <> / {resultData && resultData.sMaxScore} </>}
                          </>
                        )}
                    </span>
                  )}
              </h4>
            </div>
          )}
        {/* <div className={styles.mainresultbox} > */}
        <div className={styles.resultbox}>
          <Row>
            <div>
              <div
                className={styles.title}
                style={{ color: getColor(resultData && resultData.gData, 6) }}
              >
                <span>{resultData.szAssessmentName}</span>
                <span className={styles.AsseseementUser}>
                  {resultData &&
                  resultData.oUser &&
                  resultData.oUser.m_szFirstName
                    ? resultData.oUser.m_szFirstName + ", y"
                    : "Y"}
                  our results are in!
                  {/* <br  /> */}
                </span>
                <span className={styles.UserEmail}>
                  {resultData &&
                    resultData.oUser &&
                    resultData.oUser.m_szUserEmailAddress &&
                    resultData.oUser.m_szUserEmailAddress}
                </span>
                {/* <span className={`${styles.assessmentName} ${styles.titleboxdate}`}>
            {resultData.szAssessmentName}


            </span> */}
              </div>
            </div>
          </Row>
          <img
                      src={printIcon}
                      alt="print"
                      className={styles.printbtn}
                      onClick={() => window.print()}
                    />
          <div className={styles.titlebox1main}>
            {resultData &&
              resultData.listIterations &&
              resultData.listIterations.map((obj) => (
                <div
                  key={
                    "titlebox" + resultData &&
                    resultData.lIterationId &&
                    resultData.lIterationId
                  }
                  className={
                    resultData &&
                    resultData.lIterationId &&
                    resultData.lIterationId === obj.nIterationId
                      ? styles.active
                      : styles.titlebox1
                  }
                >
                  {checkOptionSetting(
                    70,
                    1,
                    resultData &&
                      resultData.gData &&
                      resultData.gData.gdictOptions
                  ) && (
                    <div className={styles.checktitle}>
                      {/* {obj && obj.oResult && obj.oResult.m_oFinalRatingScale && 
                        obj.oResult.m_oFinalRatingScale.m_szRatingScaleName != '' && obj.oResult.m_oFinalRatingScale.m_szRatingScaleName
                      } */}

                      {resultData &&
                        resultData.szScoreTitle !== "" &&
                        resultData.szScoreTitle}
                    </div>
                  )}

                  <div className={styles.headtop}>
                    <div className={styles.titleboxdate}>
                      <a
                        href={`/analyticsresult?id=${params.get(
                          "id"
                        )}&respondId=${params.get("respondId")}&nIterationId=${
                          obj.nIterationId
                        }`}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        {functionService.convertDate(obj.dtResponse)}
                      </a>

                      {checkOptionSetting(
                        70,
                        1,
                        resultData &&
                          resultData.gData &&
                          resultData.gData.gdictOptions
                      ) && (
                        <>
                          <Badge bg="primary">
                            {" "}
                            {obj &&
                              obj.oResult &&
                              obj.oResult.m_sFinalScore > 0 &&
                              obj.oResult.m_sFinalScore}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            
            {/* <button className="btn btn-primary" onClick={handleShow}>
              compare
            </button> */}

            {/* <input type='checkbox'/> 
            {functionService.convertDate(
              props.currentAssesment &&
                props.currentAssesment.oResults &&
                props.currentAssesment.oResults.dtResponse
            )} */}

            {/* 
          <div className={styles.titleboxbutton}>
              <Button className={styles.titlebutton}>Update</Button>
            </div> */}
          </div>
        </div>

        <div>
          {checkOptionSetting(
            82,
            1,
            resultData && resultData.gData && resultData.gData.gdictOptions
          ) && (
            <Container className="resutlPageBreak">
              <style>
                {`@media print {.resutlPageBreak{border-top:15px solid ${getColor(
                  resultData && resultData.gData,
                  2
                )};
          page-break-before:always;
          padding-left:50px;
          margin-top:40px}}`}
              </style>

              <Row>
                <Col className="justify-content-md-center text-center">
                  <div className={styles.contantforresult}>
                    <div className={styles.growthGrpah}>
                      <GraphData
                        data={resultData && resultData.dictChartData}
                        title={true}
                        chartType={"90"}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          )}

          {resultData &&
            resultData.gData &&
            !checkOptionSetting(
              75,
              0,
              resultData && resultData.gData && resultData.gData.gdictOptions
            ) && (
              <Container className="resutlPageBreak">
                <style>
                  {`@media print {.resutlPageBreak{border-top:15px solid ${getColor(
                    resultData && resultData.gData,
                    2
                  )}; page-break-before:always; padding-left:50px; margin-top:40px}}`}
                </style>

                <Row>
                  <Col className="justify-content-md-center text-center">
                    <div className={styles.contantforresult}>
                      <h2>{resultData && resultData.szRatingTitle}</h2>

                      {resultData && resultData.szRatingImageURL !== "" && (
                        <div
                          style={{ paddingTop: "20px" }}
                          className={styles.ratingImage}
                        >
                          <img
                            src={resultData && resultData.szRatingImageURL}
                            alt={
                              resultData &&
                              resultData.gData &&
                              resultData.gData.goAssessment &&
                              resultData.gData.goAssessment.szName
                            }
                          />
                        </div>
                      )}

                      <br></br>
                      <div
                        className={styles.textDescription}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            resultData && resultData.szRatingDesc
                          ),
                        }}
                      ></div>
                    </div>
                  </Col>
                </Row>
              </Container>
            )}

          {resultData &&
            resultData.gData &&
            checkOptionSetting(
              252,
              1,
              resultData && resultData.gData && resultData.gData.gdictOptions
            ) && (
              // resultData.gData.glistBands && Object.entries(resultData.gData.glistBands).length > 0 &&

              <Container className="resutlPageBreak">
                <style>
                  {`@media print {.resutlPageBreak{border-top:15px solid ${getColor(
                    resultData && resultData.gData,
                    2
                  )}; page-break-before:always; padding-left:50px; margin-top:40px}}`}
                </style>

                <Row>
                  <Col className="justify-content-md-center text-center">
                    <div className={styles.contantforresult}>
                      {/* <div className={styles.growthGrpah}> */}

                      <RatingBandsTabbed
                        bands={
                          resultData &&
                          resultData.gData &&
                          resultData.gData.glistBands
                        }
                        // selectedBand={resultData && resultData.nRatingSeqNum}
                        selectedBand={getBandIndex(resultData && resultData)}
                      />

                      {/* </div> */}
                    </div>
                  </Col>
                </Row>
              </Container>
            )}

          {/* {checkOptionSetting(82, 1, resultData && resultData.gData) && resultData && resultData.oMaturityData && resultData.oMaturityData.listActualRatings && Object.entries(resultData.oMaturityData.listActualRatings).length > 0 &&  */}
          {checkOptionSetting(
            270,
            1,
            resultData && resultData.gData && resultData.gData.gdictOptions
          ) &&
            resultData &&
            resultData.oMaturityData && (
              <Container className="resutlPageBreak">
                <style>
                  {`@media print {.resutlPageBreak{border-top:15px solid ${getColor(
                    resultData && resultData.gData,
                    2
                  )};
                page-break-before:always;
                padding-left:50px;
                margin-top:40px}}`}
                </style>

                <Row>
                  <Col className="justify-content-md-center text-center">
                    <div className={styles.contantforresult}>
                      {/* <div className={styles.growthGrpah}> */}

                      <MaturityChart
                        ratings={resultData.oMaturityData.listActualRatings}
                        levels={resultData.oMaturityData.listLevels}
                        levelColors={resultData.oMaturityData.dictLevelColors}
                        szTitle={resultData.oMaturityData.szTitle}
                        iterationId={resultData.lIterationId}
                      />

                      {/* </div> */}
                    </div>
                  </Col>
                </Row>
              </Container>
            )}

          {/* {console.log("gData", resultData && resultData.gData)} */}
          {resultData &&
            resultData.gData &&
            checkOptionSetting(262, 1, resultData && resultData.gData) && (
              // && resultData.gData.glistDimensions && Object.entries(resultData.gData.glistDimensions).length > 0
              <Container className="resutlPageBreak">
                <style>
                  {`@media print {.resutlPageBreak{border-top:15px solid ${getColor(
                    resultData && resultData.gData,
                    2
                  )}; page-break-before:always; padding-left:50px; margin-top:40px}}`}
                </style>

                <Row>
                  <Col className="justify-content-md-center text-center">
                    <div className={styles.contantforresult}>
                      <DimensionsTabbed
                        dimensions={
                          resultData &&
                          resultData.gData &&
                          resultData.gData.glistDimensions
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            )}

          {/* Now show the scores by dimension if available*/}
          {checkOptionSetting(
            275,
            1,
            resultData && resultData.gData && resultData.gData.gdictOptions
          ) && (
            <>
              {resultData && resultData.dictChartData[60] && (
                <Container className="resutlPageBreak">
                  <style>
                    {`@media print {.resutlPageBreak{border-top:15px solid ${getColor(
                      resultData && resultData.gData,
                      2
                    )};
              page-break-before:always;
              padding-left:50px;
              margin-top:40px}}`}
                  </style>

                  <Row>
                    <Col className="justify-content-md-center text-center">
                      <div className={styles.contantforresult}>
                        <div className={styles.growthGrpah}>
                          <GraphData
                            data={resultData && resultData.dictChartData}
                            title={true}
                            chartType={"60"}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
            </>
          )}

          {checkOptionSetting(
            110,
            1,
            resultData && resultData.gData && resultData.gData.gdictOptions
          ) && (
            <Container>
              {/* {console.log("resultData", resultData)} */}
              <ProfileChart1
                dictChartData={resultData && resultData.dictChartData}
                options={
                  resultData &&
                  resultData.gData &&
                  resultData.gData.gdictOptions
                }
              />
            </Container>
          )}
        </div>

        {/* {(checkOptionSetting(95,1,(resultData && resultData.gData)) || checkOptionSetting(95,2,(resultData && resultData.gData))) &&
				<Container >
					{ Object.keys(resultData).length > 0 && resultData.listAnalysis.map((obj,index)=>(
					
					<Row key={index}>
						<Col  >
					    <div className={styles.mainContainerAnalyticsLisiting}> 
						{(checkOptionSetting(210,1,(resultData && resultData.gData))) &&
							<div className={styles.analyticsListingleftbar}>
								
								<CircularProgressbarWithChildren value={((obj.sScore / obj.sMaxScore) * 100 )} styles={buildStyles({
										strokeLinecap: 'butt',
										textSize: '32px',
										pathTransitionDuration: 0.5,
										pathColor: `#473E8F`,
										textColor: '#000',
										trailColor: '#C4C4C4',
										backgroundColor: '#000',
									})}>
									<div style={{ fontSize: 20, marginTop: -5 }}>
										<strong>{obj.sScore}</strong> { obj.sMaxScore > 0 &&  `/ ${obj.sMaxScore}` }
									</div>
								</CircularProgressbarWithChildren>
							</div>
							}
							<div className={(checkOptionSetting(190,1,(resultData && resultData.gData))) ? styles.analyticsListingBody : styles.analyticsListingBodyItem}>
								<div className={styles.toplistingSection}>
									<h4>{obj.szTitle}</h4>
								 <p>	{obj.szDesc}</p> commented
																		<div dangerouslySetInnerHTML= {{__html: obj.szDesc}} />
								</div>
								{(checkOptionSetting(190,1,(resultData && resultData.gData)) && (resultData && resultData.oUser && resultData.oUser.m_lUserId !== 0)) &&
								<GoalsList setLoader={setLoader} resultData={resultData} row={obj} setResultData={setResultData}/>
							}
							</div>
						</div>
						
						</Col>
					</Row>
						
					))}
				</Container>
			} */}

        {/* {resultData.dictGoals && Object.keys(resultData.dictGoals).length > 0 && 
      <div className='resutlPageBreak'  >
      <Row>
            <Col>
              <div className={styles.contantforresult}>
                <GanttChart dictGoals={resultData.dictGoals} />
              </div>
            </Col>
        </Row>
      </div>
      } */}

        {checkOptionSetting(
          192,
          1,
          resultData && resultData.gData && resultData.gData.gdictOptions
        ) &&
          resultData &&
          resultData.oUser &&
          resultData.oUser.m_lUserId !== 0 && (
            <Container className="resutlPageBreak">
              {" "}
              {/* className={styles.GoalsSection} */}
              <Row>
                <Col>
                  <div className={styles.contantforresult}>
                    <h2 style={{ textAlign: "center" }}>
                      Goals Dashboard (
                      {sum === 0 || sum > 1 ? `${sum} goals` : `${sum} goal`})
                    </h2>

                    <Tabs
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: "20px",
                        fontSize: "18px",
                      }}
                      defaultActiveKey={"AssessmentGoals"}
                      id="uncontrolled-tab-example"
                      className={styles.customnavbarUl}
                      onSelect={handleSelect}
                    >

                      <Tab eventKey="AssessmentGoals" title="Assessment Goals">
                        <div className={styles.KnowMorenew}>
                          {/* { console.log('resultdata',resultData.gData)} */}
                              <GoalsList  
                                setLoader={setLoader} 
                                resultData={resultData} 
                                row={resultData.oAssessmentGoals}
                                setResultData={setResultData}  />
                        </div>
                      </Tab>  

                       {/* now show the question goals...need to have a separate option for this  */}

                      {checkOptionSetting( 190, 1, resultData && resultData.gData 
                          && resultData.gData.gdictOptions
                      ) && 
                          <Tab eventKey="ListDashboard" title="Question Goals">
                            <GoalsDashboard1
                              settingActiveTab={settingActiveTab}
                              resultData={resultData}
                            />
                          </Tab>
                        }

                      {checkOptionSetting( 190, 1, resultData && resultData.gData 
                          && resultData.gData.gdictOptions
                      ) && 
                        <Tab eventKey="GanttChart" title="Question Goals Gantt Chart">
                          <GanttChart dictGoals={resultData.dictGoals} />
                        </Tab>
                      }
                    </Tabs>
                  </div>
                </Col>
              </Row>
            </Container>
          )}

        {/* <GoalsDashboard1 
        resultData={resultData} 
      /> */}
        {/* <h2 style={{ textAlign: 'center' }}>Goals Dashboard ({(sum > 0) ? `${sum} goals` : `${sum} goal`})</h2>
          <div className={styles.GoalsTabs}  >
            <a className={styles.heading} onClick={() => setCompletedGoals(false)} >All Goals</a>
            <a className={styles.heading} onClick={() => setCompletedGoals(true)}>Completed Goals</a>
            // <a className={styles.heading} onClick={() => getGanttDisplay(resultData)}>Gantt Chart Display</a>
          </div>


          {
            !showMore ?
              Object.values(resultData.dictGoals).sort((a, b) => a > b ? 1 : -1).slice(0, 5).map((goalRow, index) => (
                <GoalsDashboard goalRow={goalRow} index={index} completedGoals={completedGoals} />
              )) : Object.values(resultData.dictGoals).sort((a, b) => a > b ? 1 : -1).map((goalRow, index) => (
                <GoalsDashboard completedGoals={completedGoals} goalRow={goalRow} index={index} />
              ))}
          {
            Object.keys(resultData.dictGoals).length > 5 && <div className={styles.ShowMoreCss}>{
              !showMore ?
                <p onClick={() => setShowMore(true)}>Show More <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon> </p> : <p onClick={() => setShowMore(false)}>less <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></p>
            }
            </div>
          } */}

        {/* {console.log('resultData', resultData)} */}
        {(checkOptionSetting(
          95,
          1,
          resultData && resultData.gData && resultData.gData.gdictOptions
        ) ||
          checkOptionSetting(
            95,
            2,
            resultData && resultData.gData && resultData.gData.gdictOptions
          )) && (
          <div className="resutlPageBreak">
            <QByQAnalysisSection
              resultData={resultData}
              options={
                resultData && resultData.gData && resultData.gData.gdictOptions
              }
              setLoader={setLoader}
              listAnalysis={resultData.listAnalysis}
              setResultData={setResultData}
              szTitle="Detailed Results"
            />

            <div>
              {resultData.listAnalysis2 != null &&
              resultData.listAnalysis2.length > 0 ? (
                <div>
                  <QByQAnalysisSection
                    resultData={resultData}
                    options={
                      resultData &&
                      resultData.gData &&
                      resultData.gData.gdictOptions
                    }
                    setLoader={setLoader}
                    listAnalysis={resultData.listAnalysis2}
                    setResultData={setResultData}
                    szTitle="Question Results"
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}

        <div className="resutlPageBreak">
          {checkOptionSetting(
            180,
            1,
            resultData && resultData.gData && resultData.gData.gdictOptions
          ) && (
            <Container className={`resutlPageBreak`}>
              <Row>
                <Col>
                  <div className={styles.contantforresult}>
                    {" "}
                    <Promotions
                      showRedeem={true}
                      data={
                        resultData &&
                        resultData.gData &&
                        resultData.gData.goAssessment &&
                        resultData.gData.goAssessment.listPromotions &&
                        resultData.gData.goAssessment.listPromotions[0]
                      }
                      assessment={resultData}
                      btnBgColor={getColor(resultData && resultData.gData, 2)}
                      btnTextColor={getColor(resultData && resultData.gData, 5)}
                      btnText={functionService.getButtonText(
                        resultData && resultData.gData,
                        2
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>

        <div className="resutlPageBreak">
          {(checkOptionSetting(
            110,
            1,
            resultData && resultData.gData && resultData.gData.gdictOptions
          ) ||
            checkOptionSetting(
              110,
              2,
              resultData && resultData.gData && resultData.gData.gdictOptions
            )) && (
            <div className="resutlPageBreak">
              <div
                className={styles.footerimagesection}
                style={{
                  background: getColor(resultData && resultData.gData, 8),
                }}
              >
                <Container>
                  <div className={styles.footerimagesectioninnner}>
                    {/* <div className={styles.leftheadingfooter}>
							<h1>Is Your Website Ready For Growth?</h1>
						</div> */}
                    <div className={styles.rightheadingimagefooter}>
                      <div className={styles.imageboxfooter}>
                        {functionService.awsBucketImage(
                          resultData &&
                            resultData.oAuthor &&
                            resultData.oAuthor.m_oMedia
                        ) !== false && (
                          <img
                            className={styles.minilogofooterimage}
                            src={
                              functionService.awsBucketImage(
                                resultData &&
                                  resultData.oAuthor &&
                                  resultData.oAuthor.m_oMedia
                              ) !== false &&
                              functionService.awsBucketImage(
                                resultData &&
                                  resultData.oAuthor &&
                                  resultData.oAuthor.m_oMedia
                              )
                            }
                            alt="profile pic"
                          />
                        )}
                      </div>
                      <h1>
                        {resultData &&
                          resultData.oAuthor &&
                          resultData.oAuthor.m_szFirstName}{" "}
                        {resultData &&
                          resultData.oAuthor &&
                          resultData.oAuthor.m_szLastName}
                      </h1>
                      <p>
                        {resultData &&
                          resultData.oAuthor &&
                          resultData.oAuthor.m_szProfileDesc}{" "}
                      </p>
                      <a
                        rel="noopener noreferrer"
                        style={{
                          background: getColor(
                            resultData && resultData.gData,
                            2
                          ),
                          color: getColor(resultData && resultData.gData, 5),
                        }}
                        href={
                          resultData &&
                          resultData.oAuthor &&
                          resultData.oAuthor.m_szExternalProfileURL
                        }
                        target={"_blank"}
                        className={styles.KnowMorenew}
                      >
                        Know More
                      </a>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          )}

          {/*<Footer type={2} />*/}
        </div>
        {/* </div> */}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultData &&
            resultData.listIterations &&
            resultData.listIterations.map((obj) => (
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={obj.nIterationId}
                  onChange={handleCheckboxChange}
                  disabled={checkedCount >= 2}
                />
                <label class="form-check-label" for="defaultCheck1">
                  {functionService.convertDate(obj.dtResponse)}
                </label>
              </div>
            ))}
        </Modal.Body>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleCompare}>
            submit
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default AnalyticsresultPage;
