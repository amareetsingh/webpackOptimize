import React, { useState, useEffect, useCallback } from "react";
import styles from "./dashboard.module.css";
import style from "../Settings/settingstyle.module.css";
import { useHistory } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { functionService } from "../../Context/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import GraphData from "../Front/GraphData";
import ConfirmModal from "../../Components/Confirmmodal/ConfirmModal";
import Toaster from "../../Components/Toaster";
import RespondentItem from "./RespondentItem";
import QuestionShow from "./QuestionShow";
// import { useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Pagination from './Pagination'

function Respondent(props) {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [openss, setOpenss] = useState(false);
  const history = useHistory();
  const [respondentList, setRespondentList] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [graphDatas, setGraphDatas] = useState([]);
  const [message, setMessage] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState([]);
  const [tabActive, setTabActive] = useState(3);
  const [profileGraph, setProfileGraphData] = useState([]);
  const [startRow, setStartRow] = useState(0)
  const pageSize = 20;
  const [endRow, setEndRow] = useState(pageSize)
  const [dimensionChart, setDimensionChart] = useState([]);

  // const params = useParams();
  // const dateFormatter = (dt) => {
  //   var date = new Date(dt + "Z");
  //   var options = { year: "numeric", month: "short", day: "2-digit" };
  //   return new Intl.DateTimeFormat("en-GB", options)
  //     .format(date)
  //     .replace(/ /g, "-");
  // };


  const handleSelect = (key) => {
    if (key === '2') {
      handleActionShow()
      setTabActive(1)

    } else if (key === '1') {
      setTabActive(0)

    } else if (key === '3') {
      setTabActive(2)
      handleGetDimensionAnalytics()
    }else if(key === '4'){
      setTabActive(3)
    }
  }

  const handleActionShow = async () => {
    if (content.length > 0) {
      // alert("returning?");
      return;

    }
    props.setLoader(true);

    let res = await functionService.post(
      "Assessment/getQuestionAnalytics", {
      lAssessmentId: props.obj.m_lSurveyId,
    });

    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        let data = JSON.parse(res.data.data.result);
        // console.log("gsdugjsg", data);

        setContent(Object.values(data.oQuestionAnalytics));
        setGraphDatas(data.oQuestionAnalytics.oChartData);
      }
    } else {
      if (
        res.error &&
        res.error.response &&
        res.error.response.status === 401 &&
        localStorage.getItem("currentUser")
      ) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.location = "/login";
        return;
      }

    }
    props.setLoader(false);
  };
  const handleGetDimensionAnalytics = async () => {
    if (Object.keys(dimensionChart).length > 0) {
      // alert("returning?");
      return;

    }

    props.setLoader(true);
    let res = await functionService.post(
      "Assessment/getDimensionAnalytics", {
      lAssessmentId: props.obj.m_lSurveyId,
      lStartRow: 0,
      lEndRow: 0
    });

    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        let data = JSON.parse(res.data.data.result);
        setDimensionChart(data.dictChartData);


      }
    }
    props.setLoader(false);
  };
  // useEffect(() => {
  //   if (openss === true) {
  //     handleActionShow();
  //   }
  // }, [openss]);
  const handleRespondent = async () => {
    props.setLoader(true);
    let formData = {
      lAssessmentId: props.obj.m_lSurveyId,
      lStartRow: startRow,
      lEndRow: endRow,

    };
    let res = await functionService.post(
      "Assessment/getSummaryAnalytics",
      formData
    );


    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        let result = JSON.parse(res.data.data.result);
        setRespondentList(result.listRespondents);
        setGraphData(result.dictChartData);
        setProfileGraphData(result.dictProfileCharts);


      }
    } else {
      if (
        res.error &&
        res.error.response &&
        res.error.response.status === 401 &&
        localStorage.getItem("currentUser")
      ) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.location = "/login";
        return;
      }
    }
    props.setLoader(false);
  };
  useEffect(() => {
    if (open === true) {
      handleRespondent();
    }
  }, [open, startRow, endRow]);
  const handleDelete = () => {
    setShow(true);
  };

  // handleCloses
  const handleAction = async () => {
    if (disabled === true) {
      return;
    }
    setDisabled(true);
    props.setLoader(true);
    let res = await functionService.post("Assessment/removeAssessment", {
      evalinatorId: 0,
      surveyId: props.obj.m_lSurveyId,
    });
    //console.log("lplplp", props);
    if (res !== false && res.status !== false) {
      setShowToast(true);
    } else {
      setShowToast1(true);
      setMessage(res.error.response.result);
    }
    setDisabled(false);
    props.setLoader(false);
    setShow(false);
    props.setDeleted(new Date().getTime());
  };

  if (endRow > props.obj.m_lNumTotalRespondents) {
    setEndRow(props.obj.m_lNumTotalRespondents)
  }

  return (
    <>
      <Toaster
        showtoast={showtoast}
        toggleShowToast={toggleShowToast}
        bgclass="success"
        status="Success"
        message="Deleted Successfully!!"
        toasticon={faCheckCircle}
      />
      <Toaster
        showtoast={showtoast1}
        toggleShowToast={toggleShowToast1}
        bgclass="danger"
        status="Error"
        message={message}
        toasticon={faBan}
      />
      <div className={styles.rowsection} >
        <div className={styles.scored_status}>
          <p >{props.obj.m_szAssessmentType}</p>
          
          {props.obj.m_lNumAnonRespondents > 0 
          ? (<>
            <span>Responses with Email: {props.obj.m_lNumTotalRespondents}</span>
          <span>&nbsp;Anonymous Responses: {props.obj.m_lNumAnonRespondents}</span>
          <span>&nbsp;(Total: {props.obj.m_lNumAnonRespondents + props.obj.m_lNumTotalRespondents})</span>
          </>)
          : <span>Responses: {props.obj.m_lNumTotalRespondents}</span> 
          }

          <span className={styles.cloneBtn} onClick={() => {props.handleClone(props.obj.m_szSurveyGUID);}}>
          Clone
          </span>

          {props.user &&
            props.user.oUser &&
            props.user.oUser.m_nUserType === 1 && (
              <>
                <span className={styles.userName}>
                  {props.obj.m_oCreatedByUser &&
                    props.obj.m_oCreatedByUser.m_szFirstName}{" "}
                  {props.obj.m_oCreatedByUser &&
                    props.obj.m_oCreatedByUser.m_szLastName}
                </span>
                {/* <span
                  className={styles.cloneBtn}
                  onClick={() => {
                    props.handleClone(props.obj.m_szSurveyGUID);
                  }}
                >
                  Clone
                </span> */}
              </>
            )}
        </div>
        <div className={styles.content_btn}>
          {/* <button className={styles.view_btn} onClick={()=>{history.push(functionService.convertToSlug(props.obj.m_szSurveyName)+"/assessment/"+props.obj.m_szSurveyGUID)}}>
								View Live
							   </button> */}


          {props.obj.m_nPublishStatus !== 0 && (
            <a
              className={styles.view_btn}
              rel="noopener noreferrer"
              target="_blank"
              href={
                functionService.convertToSlug(props.obj.m_szSurveyName) +
                "/assessment/" +
                props.obj.m_szSurveyGUID
              }
            >
              <FontAwesomeIcon icon={faEye} size={"sm"} />
              <span className={styles.toolstip}>View</span>
            </a>
          )}
          <button
            className={styles.edit_btn}
            onClick={() => {
              history.push("/assesment/" + props.obj.m_lSurveyId);
            }}
          >
            <FontAwesomeIcon icon={faEdit} size={"sm"} />
            <span className={styles.toolstip}>Edit</span>
          </button>
          <button className={styles.trash_btn} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} size={"sm"} />
            <span className={styles.toolstip}>Delete</span>
          </button>
          {props.obj.m_nPublishStatus !== 0 && (
            <button
              className={styles.analytic_btn}
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <FontAwesomeIcon icon={faChartLine} className="me-1" />{" "}
              <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
              <span className={styles.toolstip}>Analytics</span>
            </button>
          )}
        </div>
      </div>
      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        handleAction={handleAction}
        data={"0"}
      />

      <Collapse in={open} className={styles.dashanalytics}>
        <div id="example-collapse-text">
          {/* <Row className="align-items-center">
            {graphData &&
              Object.keys(graphData).map((obj, index) => (
                <Col key={index} lg={6} className="ps-4 pe-4">
                  <GraphData data={graphData} title={false} chartType={obj} />
                </Col>
              ))}
          </Row>
          <Row className="align-items-center">
            {profileGraph &&
              Object.keys(profileGraph).map((obj, index) => (
                <Col key={index} lg={6} className="ps-4 pe-4">

                  <GraphData data={profileGraph} title={false} chartType={obj} />
                </Col>
              ))}
          </Row> */}


          <Tabs style={{ fontSize: '20px' }}
            justify
            defaultActiveKey="4"
            // id="uncontrolled-tab-example"
            className="mt-3"
            onSelect={(key) => handleSelect(key)}

          >

          <Tab tabClassName={tabActive === 3 ? `${styles.profileTabitem} ${styles.tabactive}` : styles.profileTabitem} eventKey="4" title="Summary">
              <span className={styles.dashanalytics}>
                <ul className={styles.respondents}>
                  <Row className="align-items-center">
                    {graphData &&
                      Object.keys(graphData).map((obj, index) => (
                        <>
                        <Row style={{marginBottom: '50px'}}>
                        <Col className='col-sm-2'></Col>
                        <Col key={index} lg={6} className="ps-4 pe-4" >
                          <GraphData data={graphData} title={false} chartType={obj} />
                        </Col>
                        </Row>
                        </>
                      ))}
                  </Row>
                  <Row className="align-items-center">
                    {profileGraph &&
                      Object.keys(profileGraph).map((obj, index) => (
                        <>
                        <Row style={{marginBottom: '50px'}}>
                        <Col className='col-sm-2'></Col>
                        <Col key={index} lg={6} className="ps-4 pe-4">
                          <GraphData data={profileGraph} title={false} chartType={obj} />
                        </Col>
                        </Row>
                        </>
                      ))}
                  </Row>

                </ul>
              </span>

            </Tab>

            <Tab eventKey="1" title={`${props.obj.m_lNumTotalRespondents} Respondents`} tabClassName={tabActive === 0 ? `${styles.profileTabitem} ${styles.tabactive}` : styles.profileTabitem}>
              <div className={styles.dashanalytics}>
                <ul className={styles.respondents}>
                  {respondentList.length > 0 &&
                    respondentList.map((obj, index) => (
                      <li key={index}>
                        {

                          <RespondentItem user={props.user} respondentList={respondentList} setRespondentList={setRespondentList} lAssessmentId={props.obj.m_lSurveyId} obj={obj} key={index} setLoader={props.setLoader} setDeleted={props.setDeleted} />
                        }
                      </li>
                    ))}
                </ul>
                <Pagination pageSize={pageSize} total={props.obj.m_lNumTotalRespondents} endRow={endRow} setEndRow={setEndRow} setStartRow={setStartRow} startRow={startRow} />
              </div>

            </Tab>
            <Tab tabClassName={tabActive === 1 ? `${styles.profileTabitem} ${styles.tabactive}` : styles.profileTabitem} eventKey="2" title="Question Response Analysis">
              <span className={styles.dashanalytics}>
                <ul className={styles.respondents}>
                  {content.length > 0 && content.map(((obj, index) => (
                    <li key={index}>
                      {
                        <QuestionShow content={content} key={index} obj={obj} />
                      }
                    </li>
                  )))}
                </ul>
              </span>

            </Tab>
            <Tab tabClassName={tabActive === 2 ? `${styles.profileTabitem} ${styles.tabactive}` : styles.profileTabitem} eventKey="3" title="Dimension Analysis">
              <span className={styles.dashanalytics}>
                <ul className={styles.respondents}>
                  <div className={styles.dimenstionChart}>
                    {Object.keys(dimensionChart).length > 0 ?
                      <GraphData data={dimensionChart}
                        title={false} chartType='90' /> : <h3> No Dimensions Available </h3>}
                  </div>
                </ul>
              </span>

            </Tab>



          </Tabs>
          {/* <Row>
            <Col>
              <div className={styles.respondent_section}>
                <span className={styles.mainSpan}>
                  <h3> Question Analytics </h3>
                  <button
                    className={styles.analytic_btn1}
                    onClick={() => { setOpenss(!openss); handleActionShow(); }}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    <FontAwesomeIcon icon={openss ? faAngleUp : faAngleDown} />
                    <span className={styles.toolstip}>Open  </span>
                  </button>
                </span>
                <Collapse in={openss} className={styles.dashanalytics}>

                  <ul className={styles.respondents}>
                    {content.length > 0 && content.map(((obj, index) => (
                      <li key={index}>
                        {
                          <QuestionShow key={index} obj={obj} />
                        }
                      </li>
                    )))}
                  </ul>

                </Collapse>
              </div>
            </Col>
          </Row> */}
          {/* <Row> */}
          {/* <Col>
              <div className={styles.respondent_section}>
                <span className={styles.mainSpan}>
                  <h3>
                    {respondentList.length} Respondents{" "}
                    <span> (0 chose to stay anonymous ) </span>
                  </h3>
                  {props.obj.m_nPublishStatus !== 0 && (
                    <button
                      className={styles.analytic_btn1}
                      onClick={() => setOpens(!opens)}
                      aria-controls="example-collapse-text"
                      aria-expanded={opens}
                    >
                      <FontAwesomeIcon icon={opens ? faAngleUp : faAngleDown} />
                      <span className={styles.toolstip}>Analytics</span>
                    </button>
                  )}
                </span>
                <Collapse in={opens} className={styles.dashanalytics}>
                  <ul className={styles.respondents}>
                    {respondentList.length > 0 &&
                      respondentList.map((obj, index) => (
                        <li key={index}>
                          {

                            <RespondentItem user={props.user} respondentList={respondentList} setRespondentList={setRespondentList} lAssessmentId={props.obj.m_lSurveyId} obj={obj} key={index} setLoader={props.setLoader} setDeleted={props.setDeleted} />
                          }
                        </li>
                      ))}
                  </ul>
                </Collapse>
              </div>
            </Col> */}

          {/* <Col>
							<div className={styles.respondent_section}>
								<Accordion defaultActiveKey="0" >
									<Accordion.Item eventKey="0">
										<Accordion.Header>
											<h3>{respondentList.length} Respondents <span> (0 chose to stay anonymous ) </span></h3>
										</Accordion.Header>
										<Accordion.Body>
											<ul className={styles.respondents}>
												{respondentList.length > 0 && respondentList.map((obj, index) => (
													<li key={index}>
														<div className={styles.innerlistgoals}>
															<div className={styles.listleftside}>
																<div className={styles.listleftsidein}>
																	<h3>{`${obj.m_oRespondent.m_szFirstName} ${obj.m_oRespondent.m_szLastName}`}   </h3>
																	<p className={styles.goalsCounter}>{obj.m_nNumGoalsSet} Goals</p>
																</div>
																<Link to="../analyticsresult" className={styles.view_link} >View </Link>


															</div>

															<div className={styles.listbottomside}>
																<p>Email: <span>{obj.m_oRespondent.m_szUserEmailAddress}</span></p>
																<p className={styles.completedgoals}>
																	{obj.m_bIsComplete ? 'Completed: ' : 'Not Completed'} {dateFormatter(obj.m_dtDateTaken)}
																</p>
															</div>
														</div>
													</li>
												))}

											</ul>
										</Accordion.Body>
									</Accordion.Item>

								</Accordion>
							</div>
						</Col> */}
          {/* </Row> */}

        </div>
      </Collapse>
    </>
  );
}

export default Respondent;
