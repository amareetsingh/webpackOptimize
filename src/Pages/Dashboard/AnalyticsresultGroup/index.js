import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import styles from "../../Analyticsresult/analyticsresult.module.css";
import Table from 'react-bootstrap/Table';
// import Footer from "../../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ProfileChart1 } from "../../Assesment/ProfileChart";
// import minilogofooter from "../../assets/images/Mini_logo-footer.png";
import "react-circular-progressbar/dist/styles.css";
import printIcon from "../../../assets/printIcon.svg";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import viewLink from '../../../assets/view_link.svg';
import AssementScroreTable from './AssementScroreTable';

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
  getColor1,
} from "../../../Context/functions";
import GraphData from "../../Front/GraphData";
// import GoalsList from "./GoalsList";
import Loader from "../../../Components/Loader";
import Promotions from "../../Assesment/Promotions";
// import QByQAnalysisSection from "../../Assesment/QByQAnalysisSection";
import NoDataFound from "./NoDataFound";



ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function AnalyticsresultG(props) {

  const [loader, setLoader] = useState(false);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [resultData, setResultData] = useState({});
  const [options, setOptions] = useState({});
  const [colors, setColors] = useState({});
  const [media, setMedia] = useState({});
  const [finalResults, setFinalResults] = useState({});
  const [groups, setGroups] = useState([])
  const [dictScoresByUser, setdictScoresByUser] = useState([])

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


  useEffect(() => {
    if (params.get("id") != null) {
      const getData = async () => {
        setLoader(true);
        let res = await functionService.post("Assessment/getGroupResults", {
          lAssessmentId: params.get("id"),
          lGroupId: params.get("groupId"),
        });

        if (res.status === true) {
          if (res.data.data.statusCode === 200) {
            let groupresult = JSON.parse(res.data.data.result);
            console.log("getGroupddddd result", groupresult);
            if (Object.keys(groupresult.dictAssessmentScoresByUser).length > 0) {
              setResultData(groupresult);

              setOptions(groupresult.oAssessment.m_dictUserOptions);
              setColors(groupresult.oAssessment.m_oColorScheme);
              setMedia(groupresult.oAssessment.m_oMedia);
              setFinalResults(groupresult.oStatusSummary);
              setGroups(groupresult.oGroup.listUsers)
              setdictScoresByUser(groupresult.dictAssessmentScoresByUser)

            } else {
              setResultData(null);
            }
            // getButtonBgColor(JSON.parse(res.data.data.result));
          }
        } else {
          if (
            res.response &&
            res.response.status === 401 &&
            localStorage.getItem("currentUser")
          ) {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
            window.location = "/login";
            return;
          }
        }
        setLoader(false);

      };
      getData();

    }

  }, []);


  return (
    <div>
      {
        resultData ?
          <>
            <div className={styles.analyticsresultPage}>
              <Loader loader={loader} />
              <Container
                className={
                  checkOptionSetting(170, 2, options)
                    ? ""
                    : styles.fluidContainer
                }
              >
                <div className='resutlPageBreak' >
                  <Row className={styles.mainImageDiv}>
                    <Col>

                      <div
                        style={
                          checkOptionSetting(
                            170,
                            1,
                            options &&
                            resultData && resultData.oAssessment?.m_oMedia &&
                            resultData.oAssessment.m_oMedia.m_szURL !== ''

                          )
                            ? {}
                            : {

                              background: getColor1(colors, 1)
                            }
                        }
                        className={`${styles.mainContainerAnalytics} ${checkOptionSetting(170, 2, options)
                          ? styles.landingshortBanner
                          : styles.landingtallBanner
                          }`}
                      >
                        <div className={styles.landingfullImage}>
                          {media &&
                            media.m_szURL !== "" && (
                              <img
                                src={media.m_szURL}
                                className={styles.pexelsback}
                                alt={resultData && resultData.oAssessment && resultData.oAssessment.m_szSurveyName}
                              />

                            )}

                          <img src={printIcon} alt="print" className={styles.printbtn} onClick={() => window.print()} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>

              {/* **** start ******* */}
              {checkOptionSetting(
                70,
                1,
                resultData && options
              ) && resultData &&
                resultData.oAssessment &&
               /*resultData.gData.nType !== "3" &&*/ (
                  <div className={styles.roundcircelresult}>
                    <h4>
                      {resultData &&
                        resultData.oAssessment.m_nAssessmentType !== "1" && (
                          <span>
                            <CircularProgressbarWithChildren
                              value={((resultData.oStatusSummary.m_sFinalScore / resultData?.oAssessment?.m_sHighestPossibleScore) * 100)}
                              styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '32px',
                                pathTransitionDuration: 0.5,
                                pathColor: `#473E8F`,
                                textColor: '#000',
                                trailColor: '#C4C4C4',
                                backgroundColor: '#000',
                              })}>
                              <div style={{ fontSize: 30, marginTop: -5 }}>
                                <strong>{Math.floor(resultData.oStatusSummary.m_sFinalScore)}</strong> {resultData.oAssessment.m_sHighestPossibleScore > 0 && `/ ${resultData.oAssessment.m_sHighestPossibleScore}`}
                              </div>
                            </CircularProgressbarWithChildren>

                          </span>
                        )}
                    </h4>
                  </div>
                )}
              {/* **** end ******* */}
              <div className={styles.resultbox}>

                <Row >

                  <div className={styles.title} style={{ color: getColor1(colors, 6), }} >
                    <span >
                      {resultData.oAssessment?.m_szAssessmentType
                      }
                    </span>
                    <span className={styles.AsseseementUser}>
                      {resultData && resultData.oGroup &&
                        "Results of " + resultData.oGroup.m_szGroupName
                      }
                      {/* Your results are in! */}
                    </span>

                  </div>
                </Row>
                <div className={styles.titlebox1main}>
                </div>
              </div>
              <div >
                {checkOptionSetting(82, 1, options) && (
                  <Container className='resutlPageBreak' >
                    <style>
                      {`@media print {.resutlPageBreak{border-top:15px solid ${getColor1(colors, 2)};
         page-break-before:always;
         padding-left:50px;
         margin-top:40px}}`}
                    </style>
                    <Row >
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


                {
                  finalResults && finalResults.m_oFinalRatingScale && finalResults.m_oFinalRatingScale.m_szRatingScaleName &&
                  <Container className='resutlPageBreak'>
                    <Row  >
                      <Col className="justify-content-md-center text-center">
                        <div className={styles.contantforresult}>
                          <h2>{finalResults && finalResults.m_oFinalRatingScale && finalResults.m_oFinalRatingScale.m_szRatingScaleName}</h2>
                          <div
                            className={styles.textDescription}
                            dangerouslySetInnerHTML={{
                              __html: finalResults && finalResults.m_oFinalRatingScale && finalResults.m_oFinalRatingScale.m_szRatingScaleDesc
                            }}
                          ></div>

                          {/* {resultData && resultData.szRatingImageURL !== "" && (
                 <div style={{ paddingTop: '20px' }} className={styles.ratingImage}>
                   <img src={resultData && resultData.szRatingImageURL} alt="pexelsback" />
                 </div>
               )} */}
                        </div>

                      </Col>
                    </Row>
                  </Container>}


                {/* <Container   >
         <ProfileChart1 resultData={resultData} />

       </Container> */}
              </div>
              {/* <div>
                {resultData && resultData.dictAssessmentScoresByUser &&
                  Object.keys(resultData.dictAssessmentScoresByUser).length > 0 ?
                  <div className='resutlPageBreak'>

                    <Container  >


                      <div className={styles.contantforresult}>
                        <h2 className="justify-content-md-center text-center">Assessment Scores by User</h2>
                        <div className={styles.tablepadding}>
                          <Table bordered >
                            <thead >
                              <tr className={styles.flexCenter} >
                                <th>Name</th>
                                <th>Score</th>
                                <th>Link to Results</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                groups && groups.map((obj) => (
                                  <tr className={styles.flexCenter}>
                                    <td>{obj.m_szFirstName}</td>

                                    <td >
                                      <div className={`${styles['analyticsListingleftbar']} ${styles['textcenter']}`}>

                                        {resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] ? (
                                          <CircularProgressbarWithChildren value={resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] && resultData.dictAssessmentScoresByUser[obj.m_lUserId].m_sFinalScore > 0 ? (((resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] && resultData.dictAssessmentScoresByUser[obj.m_lUserId].m_sFinalScore) / resultData.oAssessment.m_sHighestPossibleScore) * 100) : '0'} styles={buildStyles({
                                            strokeLinecap: 'butt',
                                            marginTop: '34px',
                                            textSize: '12px',
                                            pathTransitionDuration: 0.5,
                                            pathColor: `#473E8F`,
                                            textColor: '#000',
                                            trailColor: '#C4C4C4',
                                            backgroundColor: '#000',
                                          })}>
                                            <div style={{ fontSize: 14, fontWeight: 750 }}>
                                              {resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] && resultData.dictAssessmentScoresByUser[obj.m_lUserId].m_sFinalScore > 0 ? Math.round((resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] && resultData.dictAssessmentScoresByUser[obj.m_lUserId].m_sFinalScore)).toFixed(0) : 0}
                                            </div>
                                          </CircularProgressbarWithChildren>
                                        ) : "N/A"
                                        }

                                      </div>
                                    </td>

                                    <td>
                                      {
                                        resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] && (
                                          <a href={`/analyticsresult?id=${params.get("id")}&respondId=${obj.m_lUserId}`} target="_blank"><img className={styles.viewLinkImg} src={viewLink} alt="" /></a>
                                        )

                                      }
                                    </td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </Table>

                        </div>

                      </div>
                    </Container> </div> : null

                }
              </div> */}
              {resultData && resultData.dictAssessmentScoresByUser &&
                Object.keys(resultData.dictAssessmentScoresByUser).length > 0 ?
                <AssementScroreTable dictAssessmentScore={resultData.dictAssessmentScoresByUser} m_sHighest={resultData.oAssessment} id={resultData.oAssessment?.m_lSurveyId} groups={groups} /> : null}
              {/* *************chart********** */}
              {resultData && resultData.dictProfileCharts && Object.keys(resultData.dictProfileCharts).map((key) => (
                <Container className='resutlPageBreak' >
                  <style>
                    {`@media print {.resutlPageBreak{border-top:15px solid ${getColor1(colors, 2)};
         page-break-before:always;
         padding-left:50px;
         margin-top:40px}}`}
                  </style>
                  <Row >
                    <Col className="justify-content-md-center text-center">
                      <div className={styles.contantforresult}>

                        <div className={styles.growthGrpah}>
                          <GraphData
                            data={resultData && resultData.dictProfileCharts}
                            title={true}
                            chartType={key}
                          />
                        </div>

                      </div>
                    </Col>
                  </Row>
                </Container>

              ))

              }
              <div className='resutlPageBreak'>
                <Container >
                  <div className={styles.contantforresult}>
                    <h2 className="justify-content-md-center text-center" >Question Scores by User</h2>
                    <div className={styles.tablepadding}>
                      <Table bordered >
                        <thead>
                          <tr>
                            <th>Question Name </th>
                            {groups && groups.map((obj) => (
                              <th className={styles.th} >{obj.m_szFirstName}
                                {resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] &&
                                  <a href={`/analyticsresult?id=${params.get("id")}&respondId=${obj.m_lUserId}`} target="_blank"><img className={styles.viewLinkImg} src={viewLink} alt="" /></a>
                                }
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {resultData && resultData.oAssessment && resultData.oAssessment.m_listCategories && resultData.oAssessment.m_listCategories[0].m_listSurveyQuestions.map((obj2) => (
                            <>
                              <tr className={styles.tr}>   <td className={styles.td}>{obj2.m_szQuestionText}</td>
                                {groups && groups.map((obj) => (

                                  <td className={styles.td} >

                                    {resultData && resultData.dictUserQuestionScores
                                    [obj.m_lUserId] && resultData.dictUserQuestionScores
                                    [obj.m_lUserId][obj2.m_lQuestionId] ?

                                      (
                                        <ProgressBar max={obj2.m_sMaxPoints}
                                          label={`${resultData && resultData.dictUserQuestionScores
                                          [obj.m_lUserId] && resultData.dictUserQuestionScores
                                          [obj.m_lUserId][obj2.m_lQuestionId] && resultData.dictUserQuestionScores
                                          [obj.m_lUserId][obj2.m_lQuestionId].m_sRating}`}

                                          now={resultData && resultData.dictUserQuestionScores
                                          [obj.m_lUserId] && resultData.dictUserQuestionScores
                                          [obj.m_lUserId][obj2.m_lQuestionId] && resultData.dictUserQuestionScores
                                          [obj.m_lUserId][obj2.m_lQuestionId].m_sRating} />
                                      )
                                      : "N/A"
                                    }
                                  </td>
                                ))}
                              </tr>
                            </>

                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Container>
              </div>
              {
                resultData && resultData.dictDimScoresByUser
                  && Object.keys(resultData.dictDimScoresByUser).length > 0 ?
                  <div className='resutlPageBreak'>
                    <Container >
                      <div className={styles.contantforresult} >
                        <h2 className="justify-content-md-center text-center" >Dimension Scores by User</h2>
                        <div className={styles.tablepadding}>
                          <Table bordered >
                            <thead>
                              <tr>
                                <th>Name</th>
                                {
                                  groups && groups.map((obj) => (

                                    <th className={styles.th} >{obj.m_szFirstName}

                                      {resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] &&
                                        <a href={`/analyticsresult?id=${params.get("id")}&respondId=${obj.m_lUserId}`} target="_blank"><img className={styles.viewLinkImg} src={viewLink} alt="" /></a>
                                      }
                                    </th>

                                  ))
                                }
                              </tr>

                            </thead>
                            <tbody>
                              {
                                resultData && resultData.oAssessment && resultData.oAssessment.m_dictDimensions
                                && Object.values(resultData.oAssessment.m_dictDimensions).map((obj2) => (
                                  <tr> <td>{obj2.m_szDimensionName}  </td>
                                    {
                                      groups && groups.map((obj) => (

                                        <td>
                                          {/* {   resultData && resultData.dictDimScoresByUser
                                [obj.m_lUserId] && resultData && resultData.dictDimScoresByUser
                                [obj.m_lUserId][obj2.m_lDimensionId] }  */}
                                          <div className={`${styles['analyticsListingleftbar']} ${styles['textcenter']}`}>

                                            {resultData && resultData.dictDimScoresByUser
                                            [obj.m_lUserId] && resultData && resultData.dictDimScoresByUser
                                            [obj.m_lUserId][obj2.m_lDimensionId] ? (

                                              <CircularProgressbarWithChildren
                                                value={resultData && resultData.dictDimScoresByUser
                                                [obj.m_lUserId] && resultData && resultData.dictDimScoresByUser
                                                [obj.m_lUserId][obj2.m_lDimensionId] > 0 ? (((resultData && resultData.dictDimScoresByUser
                                                [obj.m_lUserId] && resultData && resultData.dictDimScoresByUser
                                                [obj.m_lUserId][obj2.m_lDimensionId]) / obj2.m_dMaxPoints
                                                ) * 100) : '0'}
                                                styles={buildStyles({
                                                  strokeLinecap: 'butt',
                                                  marginTop: '34px',
                                                  textSize: '12px',
                                                  pathTransitionDuration: 0.5,
                                                  pathColor: `#473E8F`,
                                                  textColor: '#000',
                                                  trailColor: '#C4C4C4',
                                                  backgroundColor: '#000',
                                                })}>
                                                <div style={{ fontSize: 14, fontWeight: 750 }}>
                                                  {resultData && resultData.dictDimScoresByUser
                                                  [obj.m_lUserId] && resultData && resultData.dictDimScoresByUser
                                                  [obj.m_lUserId][obj2.m_lDimensionId] > 0 ? Math.round((resultData && resultData.dictDimScoresByUser
                                                  [obj.m_lUserId] && resultData && resultData.dictDimScoresByUser
                                                  [obj.m_lUserId][obj2.m_lDimensionId])).toFixed(0) : 0}
                                                </div>
                                              </CircularProgressbarWithChildren>
                                            ) : "N/A"
                                            }
                                          </div>

                                        </td>
                                      ))
                                    }

                                  </tr>
                                ))
                              }
                              {/* 
                            {
                              groups && groups.map((obj) => (
                                <tr>
                                  <td>{obj.m_szFirstName} </td>
                                  {resultData && resultData.dictDimScoresByUser
                                  [obj.m_lUserId] && Object.values(resultData.dictDimScoresByUser
                                  [obj.m_lUserId]).map((obj1) => (
                                    <td>{obj1}</td>

                                  ))
                                  }
                                  <td>
                                    {
                                      resultData && resultData.dictAssessmentScoresByUser[obj.m_lUserId] && (
                                        <><a href={`/analyticsresult?id=${params.get("id")}&respondId=${obj.m_lUserId}`} target="_blank"><img className={styles.viewLinkImg} src={viewLink} alt="" /></a></>
                                      )

                                    }
                                  </td>
                                </tr>
                              ))
                            } */}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Container></div> : null

              }
              {(checkOptionSetting(110, 1, options) ||
                checkOptionSetting(110, 2, options)) && (
                  <div className='resutlPageBreak' >
                    <div
                      className={styles.footerimagesection}
                      style={{ background: getColor1(colors, 8) }}
                    >
                      <Container  >
                        <div className={styles.footerimagesectioninnner}>

                          <div className={styles.rightheadingimagefooter}>
                            <div className={styles.imageboxfooter}>
                              {functionService.awsBucketImage(
                                //  resultData &&
                                //  resultData.oAssessment &&
                                //  resultData.oAssessment.m_oCreatedByUser &&
                                //  resultData.oAssessment.m_oCreatedByUser.m_oMedia
                                resultData && media
                              ) !== false && (
                                  <img
                                    className={styles.minilogofooterimage}
                                    src={
                                      functionService.awsBucketImage(
                                        //          resultData &&
                                        //          resultData.oAssessment &&
                                        //  resultData.oAssessment.m_oCreatedByUser &&
                                        //  resultData.oAssessment.m_oCreatedByUser.m_oMedia
                                        resultData && media
                                      ) !== false &&
                                      functionService.awsBucketImage(
                                        //          resultData &&
                                        //          resultData.oAssessment &&
                                        //  resultData.oAssessment.m_oCreatedByUser &&
                                        //  resultData.oAssessment.m_oCreatedByUser.m_oMedia
                                        resultData && media
                                      )
                                    }
                                    alt="profile pic"
                                  />
                                )}
                            </div>
                            <h1>
                              {resultData &&
                                resultData.oAssessment.m_oCreatedByUser &&
                                resultData.oAssessment.m_oCreatedByUser.m_szFirstName}{" "}
                              {resultData &&
                                resultData.oAssessment &&
                                resultData.oAssessment.m_oCreatedByUser.m_szLastName}
                            </h1>
                            <p>
                              {resultData &&
                                resultData.oAssessment &&
                                resultData.oAssessment.m_oCreatedByUser.m_szProfileDesc}{" "}
                            </p>
                            <a
                              rel="noopener noreferrer"
                              style={{
                                background: getColor1(colors, 2),
                                color: getColor1(colors, 5),
                              }}
                              href={
                                resultData &&
                                resultData.oAssessment &&
                                resultData.oAssessment.m_oCreatedByUser.m_szExternalProfileURL
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
            </div>
          </> : <NoDataFound />

      } </div>

  );
}
export default AnalyticsresultG;
