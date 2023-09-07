import React, { useEffect, useState } from "react";
import styles from "./assesment.module.css";
import Bargraph from "../../Components/Bargraph";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import RatingBandsTabbed from "../../Components/Sections/RatingBandsTabbed";

import DimensionsDisplay from "../../Components/Sections/DimensionsDisplay";
import DimensionsTabbed from "../../Components/Sections/DimensionsTabbed";
import DimensionsGrid from "../../Components/Sections/DimensionsGrid";
import QByQAnalysisSection from "../Assesment/QByQAnalysisSection";
import MaturityChart from "../Analyticsresult/MaturityChart";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Setting from "../Settings/Setting";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import deleteIcon from "../../assets/images/delete.svg";
import checkIcon from "../../assets/images/check_circle.svg";
import Radargraph from "../../Components/Radargraph";
import Polardummy from "../../assets/images/polardummy.png";
import Bardummy from "../../assets/images/barduumy.png";
import pexelsback from "../../assets/images/pexelsback.jpg";
import TextEditor from "../../Components/TextEditor";
import {
  functionService,
  getPreviewColor,
  convertDate,
  getOptionValue,
} from "../../Context/functions";
import { ProfileChart1 } from "./ProfileChart";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { checkOptionSetting } from "../../Context/functions";
import AuthorDetails from "./AuthorDetails";
import Promotions from "./Promotions";
import GraphData from "../Front/GraphData";
import Loader from "../../Components/Loader";
import Ratingbands from "../Settings/Ratingbands";
import styless from "../Settings/settingstyle.module.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Resulttab(props) {
  const params = useParams();

  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState(false);
  const [ratingBands, setRatingBands] = useState([]);
  const [finalRatingBandSeqNum, setFinalRatingBandSeqNum] = useState(0);
  const [ratingTitle, setRatingTitle]=useState('');
  const [ratingDesc, setRatingDesc]=useState('');
  const [ratingImage, setRatingImage]=useState("");
  const [scoreTitleState, setScoreTitleState]= useState("");
  // ***** TextEditors ********
  const [formData, setFormData] = useState({});
  const [options, setOptions] = useState();
  const [colors, setColors] = useState();

  const nShowDimensions = 0;
  const nShowTabs = 0;
  const nShowShortDesc = 0;

  const getOptionsList = (dictionary) => {
    const array = Object.entries(dictionary).map(([key, value]) => ({
      key: Number(key),
      value: value,
    }));
    // const keyValueArray = Object.keys(dictionary).map(key => [parseInt(key), dictionary[key]]);
    return array;
  };

  //

  const setInitialValues = () => {

      const listAllBands = props.currentAssesment && props.currentAssesment.m_oRatingScalesGroup && Object.values(props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales);

      //console.log("listAllBands", listAllBands);
      let nCurrentRatingBand = props.currentAssesment &&
      props.currentAssesment.oResults &&
      props.currentAssesment.oResults.nRatingSeqNum;

      //console.log("nCurrentRatingBand", nCurrentRatingBand);
  
      // props.currentAssesment &&
      // props.currentAssesment.oResults &&
      // props.currentAssesment.oResults.gData &&
      // props.currentAssesment.oResults.gData.glistBands;
    setRatingBands(
      listAllBands
        ? listAllBands.filter((item) => item.m_nIsScoringBand == 0)
        : []
    );

    let foundBand = listAllBands.find(band => band.m_nRatingScaleSeqNum === nCurrentRatingBand);

    
    //console.log("found Band", foundBand);
   
    /*setFinalRatingBandSeqNum(
      ratingBands.findIndex(
        (item) =>
          item.m_nRatingScaleSeqNum === nCurrentRatingBand)
    );*/
    
    setFinalRatingBandSeqNum(nCurrentRatingBand);

    let dictOptions =  props.currentAssesment &&
    props.currentAssesment.oResults &&
    props.currentAssesment.oResults.gData &&
    props.currentAssesment.oResults.gData.gdictOptions;

    setOptions(
      props.currentAssesment &&
        props.currentAssesment.oResults &&
        props.currentAssesment.oResults.gData &&
        props.currentAssesment.oResults.gData.gdictOptions
    );

    setColors(props.currentAssesment && props.currentAssesment.m_oColorScheme && props.currentAssesment.m_oColorScheme.m_dictColors);

           {/* display assessment title/desc, rating band / desc/image or nothing based on option */}
          // Later, do this for assessment title and dimension to be displayed also  
            if(checkOptionSetting(75, 1, dictOptions) && foundBand)
            {
              setRatingTitle(foundBand.m_szRatingScaleName);
              setRatingDesc(foundBand.m_szRatingScaleDesc);
              let imageURL = functionService.awsBucketImage(foundBand.m_oMedia); 
              setRatingImage(imageURL);
              setScoreTitleState(foundBand.m_szRatingScaleName);
            } 
            else if(props.currentAssesment &&
              props.currentAssesment.oResults &&
              props.currentAssesment.oResults)
            {
              setRatingTitle(props.currentAssesment.oResults.szRatingTitle);
              setRatingDesc(props.currentAssesment.oResults.szRatingDesc);
              setRatingImage(props.currentAssesment.oResults.szRatingImageURL);
              setScoreTitleState(props.currentAssesment.oResults.szScoreTitle);
            }
  }

  useEffect((currentObj = currentData, setCurrentObj = setCurrentData) => {
      //console.log('useeffect called in resulttab');
      setLoader(true);
      setCurrentObj(!currentObj);

      setInitialValues();

      // console.log('finalRatingBandSeqNum', finalRatingBandSeqNum );
      setLoader(false);
    },
    [props.currentAssesment]
  );

  // **************************TextEditor *****************

  // const handleTextData = (val) => {
  //     setFormData({ ...formData, toolDesc: val });

  // };

  return (
    // <div className={styless.settingmiantabs}>
    //   <Tabs
    //     defaultActiveKey="result"
    //     id="uncontrolled-tab-example"
    //     className={styless.customnavbarUl}
    //   >
    //     <Tab eventKey="result" className={styless.customnavbarUl} title="Results">
        
        <div className={styles.scrollLanding}>

          <Loader loader={loader} />
          <div
            style={{ overflowY: "scroll", height: "100vh" }}
            className={styles.analyticsresultPage}
          >
            <div
              className={styles.mainContainerAnalyticsresult}
              style={
                checkOptionSetting(170, 1, options) &&
                functionService.awsBucketImage(
                  props.currentAssesment && props.currentAssesment.m_oMedia
                ) !== false
                  ? {}
                  : { background: getPreviewColor(props.currentAssesment, 1) }
              }
            >
              <div
                className={`${styles.bgdefaultgraycolor} ${
                  checkOptionSetting(120, 1, options)
                    ? styles.landingshortBanner
                    : styles.landingtallBanner
                }`}
              >
                <div className={styles.landingfullImage}>
                  {functionService.awsBucketImage(
                    props.currentAssesment && props.currentAssesment.m_oMedia
                  ) !== false && (
                    <img
                      src={
                        functionService.awsBucketImage(
                          props.currentAssesment &&
                            props.currentAssesment.m_oMedia
                        ) !== false
                          ? functionService.awsBucketImage(
                              props.currentAssesment &&
                                props.currentAssesment.m_oMedia
                            )
                          : pexelsback
                      }
                      className={styles.pexelsback}
                      alt={
                        props.currentAssesment &&
                        props.currentAssesment.m_szSurveyName
                      }
                    />
                  )}
                </div>
              </div>
              <Row className={styles.mainAnalyticsresulttext}>
                <Col md="auto">
                  <div className={styles.mainresultdetails}>
                    {checkOptionSetting(70, 1, options) && (
                      <div className={styles.roundcircelresult}>
                        <h4>
                          {" "}
                          {props.currentAssesment &&
                            (props.currentAssesment.m_nAssessmentType === 1 ||
                              props.currentAssesment.m_nAssessmentType ===
                                2) && (
                              <span>
                                {checkOptionSetting(73, 1, options) &&
                                  // props.currentAssesment &&
                                  // props.currentAssesment.oResults &&
                                  // props.currentAssesment.oResults.szScoreTitle
                                  scoreTitleState                                  
                                  }
                              </span>
                            )}{" "}
                          <label>
                            {" "}
                            {props.currentAssesment &&
                              props.currentAssesment.oResults &&
                              props.currentAssesment.oResults.sFinalScore !==
                                0 &&
                              props.currentAssesment.oResults.sFinalScore}{" "}
                            {checkOptionSetting(72, 1, options) && (
                              <>
                                {" "}
                                {props.currentAssesment &&
                                  props.currentAssesment.oResults &&
                                  props.currentAssesment.oResults.sMaxScore !==
                                    0 &&
                                  " / " +
                                    props.currentAssesment.oResults.sMaxScore}
                              </>
                            )}{" "}
                          </label>{" "}
                        </h4>
                      </div>
                    )}
                    {/*  {checkOptionSetting(70, 0) && checkOptionSetting(140, 0) ? (
                ""
              ) : (
                <h1
                  style={{ color: getPreviewColor(props.currentAssesment, 3) }}
                >
                  <span>
                    {props.currentAssesment &&
                    props.currentAssesment.oResults &&
                    props.currentAssesment.oResults.oUser &&
                    props.currentAssesment.oResults.oUser.m_szFirstName
                      ? props.currentAssesment.oResults.oUser.m_szFirstName +
                        ", y"
                      : "Y"}
                  </span>
                  our results are in!
                </h1>
              )} */}
                  </div>
                </Col>
              </Row>
            </div>

            <div className={styles.mainContainer}>
              <div className={styles.resultbox}>
                <div>
                  <Row>
                    <span
                      className={styles.title}
                      style={{
                        color: getPreviewColor(props.currentAssesment, 6),
                      }}
                    >
                      {props.currentAssesment &&
                      props.currentAssesment.oResults &&
                      props.currentAssesment.oResults.oUser &&
                      props.currentAssesment.oResults.oUser.m_szFirstName
                        ? props.currentAssesment.oResults.oUser.m_szFirstName +
                          ", y"
                        : "Y"}
                      our results are in!
                    </span>
                  </Row>
                </div>

                <div className={styles.titlebox1main}>
                  <div className={styles.titlebox1}>
                    {/* <div className={styles.checktitle}> */}
                    {/* <input type="checkbox" /> */}
                    {/* </div> */}
                    <div className={styles.headtop}>
                      {/* 18/30 */}
                      <div className={styles.titleboxdate}>
                        {" "}
                        {functionService.convertDate(
                          props.currentAssesment &&
                            props.currentAssesment.oResults &&
                            props.currentAssesment.oResults.dtResponse
                        )}{" "}
                      </div>
                    </div>
                  </div>
                  {/* <input type='checkbox'/> 
            {functionService.convertDate(
              props.currentAssesment &&
                props.currentAssesment.oResults &&
                props.currentAssesment.oResults.dtResponse
            )} */}

                  {/* <div className={styles.titleboxbutton}>
              <Button className={styles.titlebutton}>Update</Button>
            </div> */}
                </div>
              </div>

              {/* {console.log('assessment', props.currentAssesment)} */}
              <div className={styles.contantforresult}>
                <Row>
                  {checkOptionSetting(82, 1, options) && (
                    // <Radargraph />
                    <div className="justify-content-md-center text-center">
                      <div className={styles.polardummy}>
                        <GraphData
                          data={
                            props.currentAssesment &&
                            props.currentAssesment.oResults &&
                            props.currentAssesment.oResults.dictChartData
                          }
                          // chartType={props.currentAssesment && props.currentAssesment.m_nAssessmentType === 2 ? "91" : "90"}
                          chartType={"90"}
                        />
                      </div>
                    </div>
                  )}

                 {/* display assessment title/desc, rating band / desc/image or nothing based on option */}

                 {checkOptionSetting(75, 1, options) && (
                      <></>
                 )}

                  <h2 className="justify-content-md-center text-center">
                    {/* {props.currentAssesment &&
                      props.currentAssesment.oResults &&
                      props.currentAssesment.oResults.szRatingTitle} */}
                      {ratingTitle}
                  </h2>

                  <div
                    className={styles.textDescription}
                    dangerouslySetInnerHTML={{
                      __html:
                        // props.currentAssesment &&
                        // props.currentAssesment.oResults &&
                        // props.currentAssesment.oResults.szRatingDesc,
                        ratingDesc,
                    }}
                  ></div>
                  {
                  // props.currentAssesment &&
                  //   props.currentAssesment.oResults &&
                  //   props.currentAssesment.oResults &&
                  //   props.currentAssesment &&
                  //   props.currentAssesment.oResults &&
                  //   props.currentAssesment.oResults.szRatingImageURL !== "" && 
                    ratingImage != "" &&                    
                    (
                      <div className={styles.ratingImage}>
                        <img
                          src={
                            // props.currentAssesment &&
                            // props.currentAssesment.oResults &&
                            // props.currentAssesment.oResults &&
                            // props.currentAssesment &&
                            // props.currentAssesment.oResults &&
                            // props.currentAssesment.oResults.szRatingImageURL
                            ratingImage
                          }
                          alt="pexelsback"
                        />
                      </div>
                    )}
                  {/* {(checkOption(110,1)  && (props.currentAssesment && props.currentAssesment.oResults) && props.currentAssesment.oResults.dictChartData.hasOwnProperty("7")) &&
					<>
					<h2>Here's are how you compare to others with similar profile as yours.</h2>
					
					{<div className={styles.compareGraph}><Bargraph /></div>} commment section
					{checkOption(82,1) &&
					<div className={styles.compareGraphBar}>
					<GraphData data={(props.currentAssesment && props.currentAssesment.oResults) && props.currentAssesment.oResults.dictChartData} title={true} chartType={"7"}/>
					
						</div>
					}
					</>
					} */}
                </Row>
              </div>

              {/* <ProfileChart currentAssesment={props.currentAssesment} /> */}

              {/* {console.log("props.currentassessent", props.currentAssesment)} */}
              {/* show the rating band tabs if the option was chosen */}
              {checkOptionSetting(252, 1, options) && (
                <Container>
                  <div className={styles.contantforresult}>
                    <Row>
                      <Col className="justify-content-md-center text-center">
                        <RatingBandsTabbed
                          // bands={props.currentAssesment &&
                          //   props.currentAssesment.oResults && props.currentAssesment.oResults.gData && props.currentAssesment.oResults.gData.glistBands}
                          // selectedBand={props.currentAssesment && props.currentAssesment.oResults && props.currentAssesment.oResults.nRatingSeqNum}
                          bands={ratingBands}
                          selectedBand={finalRatingBandSeqNum}
                        />
                      </Col>
                    </Row>
                  </div>
                </Container>
              )}

              {checkOptionSetting(270, 1, options) &&
                props.currentAssesment &&
                props.currentAssesment.oResults &&
                props.currentAssesment.oResults.oMaturityData && (
                  <Container>
                    <div className={styles.contantforresult}>
                      <Row>
                        <Col className="justify-content-md-center text-center">
                          <MaturityChart
                            ratings={
                              props.currentAssesment.oResults.oMaturityData
                                .listActualRatings
                            }
                            levels={
                              props.currentAssesment.oResults.oMaturityData
                                .listLevels
                            }
                            levelColors={
                              props.currentAssesment.oResults.oMaturityData
                                .dictLevelColors
                            }
                            szTitle={
                              props.currentAssesment.oResults.oMaturityData
                                .szTitle
                            }
                            iterationId={
                              props.currentAssesment.oResults.lIterationId
                            }
                          />
                        </Col>
                      </Row>
                    </div>
                  </Container>
                )}

              {/* show the dimensions if that option was chosen */}
              {(checkOptionSetting(262, 1, options) ||
                checkOptionSetting(262, 2, options)) &&
                props.currentAssesment &&
                props.currentAssesment.oResults &&
                props.currentAssesment.oResults.gData && (
                  <Container>
                    <div className={styles.contantforresult}>
                      <Row>
                        <Col className="justify-content-md-center text-center">
                          <DimensionsDisplay
                            dimensions={
                              props.currentAssesment.oResults.gData
                                .glistDimensions
                            }
                            display={getOptionValue(262, options)}
                            textSize={getOptionValue(282, options)}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Container>
                )}

              {/* {checkOptionSetting(262, 2,options) && props.currentAssesment &&
                      props.currentAssesment.oResults && props.currentAssesment.oResults.gData && 
            <Container>
            <div className={styles.contantforresult}>
            <Row>
            <Col className="justify-content-md-center text-center">
            <DimensionsGrid 
                    dimensions={props.currentAssesment.oResults.gData.glistDimensions}
                  />
                  </Col>
            </Row>
            </div>  
            </Container>
          } */}

              {checkOptionSetting(275, 1, options) &&
                props.currentAssesment &&
                props.currentAssesment.oResults && (
                  <Container>
                    <div className={styles.contantforresult}>
                      <Row>
                        <Col className="justify-content-md-center text-center">
                          <div className={styles.growthGrpah}>
                            <GraphData
                              data={
                                props.currentAssesment.oResults.dictChartData
                              }
                              title={true}
                              chartType={"60"}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Container>
                )}

              <div className="justify-content-md-center text-center">
                <ProfileChart1
                  options={options}
                  dictChartData={
                    props.currentAssesment &&
                    props.currentAssesment.oResults &&
                    props.currentAssesment.oResults.dictChartData
                  }
                />
              </div>

              {/* {console.log('current Assessment', props.currentAssesment)} */}
              {(checkOptionSetting(95, 1, options) ||
                checkOptionSetting(95, 2, options)) && (
                <QByQAnalysisSection
                  resultData={
                    props.currentAssesment && props.currentAssesment.oResults
                  }
                  // options={props.currentAssesment && props.currentAssesment.gData && props.currentAssesment.gData.gdictOptions}
                  options={options}
                  setLoader={setLoader}
                  listAnalysis={
                    props.currentAssesment &&
                    props.currentAssesment.oResults &&
                    props.currentAssesment.oResults.listAnalysis
                  }
                  szTitle="Detailed Results"
                  // setResultData={setResultData}
                />
              )}

              {/* {(checkOption(95, 1) || checkOption(95, 2)) && (
            <>
              {props.currentAssesment &&
                props.currentAssesment.oResults &&
                props.currentAssesment.oResults.listAnalysis.map((obj, index) => (
                  <div className={styles.analyticsListing}>
                    <Row className={styles.mainContainerAnalyticsLisiting}>
                      {checkOption(210, 1) && (
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
                            <div style={{ fontSize: 17, marginTop: -5 }}>
                              <strong>{obj.sScore}</strong>{" "}
                              {obj.sMaxScore > 0 && `/ ${obj.sMaxScore}`}
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      )}
                      <div
                        className={
                          checkOption(190, 1)
                            ? styles.analyticsListingBody
                            : styles.analyticsListingBodyItem
                        }
                      >
                        <div className={styles.toplistingSection}>
                          <h4>{obj.szTitle}</h4>
                          <div
                            className={styles.questiondescription}
                            dangerouslySetInnerHTML={{ __html: obj.szDesc }}
                          />
                        </div>
                        {checkOption(190, 1) && (
                          <div className={styles.analyticsListingmanagegoals}>
                            <h5>
                              Create or Manage your Goals{" "}
                              <span
                                className={
                                  styles.analytcounticsListingmanagegoals
                                }
                              >
                                0
                              </span>
                            </h5>
                            <Form >
                              
                              <Form.Group
                                className={styles.lisitngformgroup}
                                controlId="formBasicEmail"
                              >
                                <Form.Control
                                  type="email"
                                  placeholder="Enter your goal here"
                                />
                                <span className={styles.bytextlisitng}>By</span>
                                <Form.Control
                                  type="date"
                                  placeholder="20 Oct, 2021"
                                />
                                <Button
                                  // onClick={() => setOpen(!open)}
                                  aria-controls="example-collapse-text"
                                  aria-expanded={open}
                                >
                                  Add Goal
                                </Button>
                              </Form.Group>
                            </Form>
                          </div>
                        )}
                      </div>
                    </Row>
                  </div>
                ))}
            </>
          )} */}

              {/* {console.log('current Assessment', props.currentAssesment)} */}
              {checkOptionSetting(180, 1, options) && (
                <Container className={`resutlPageBreak`}>
                  <Row>
                    <Col>
                      <div className={styles.contantforresult}>
                        <Promotions
                          showRedeem={true}
                          showPre={false}
                          data={
                            props.currentAssesment &&
                            props.currentAssesment.m_listPromotions &&
                            props.currentAssesment.m_listPromotions[0]
                          }
                          // assessment={resultData}
                          btnBgColor={getPreviewColor(
                            props.currentAssesment,
                            2
                          )}
                          btnTextColor={getPreviewColor(
                            props.currentAssesment,
                            5
                          )}
                          btnText={functionService.getCustomizeText(
                            props.currentAssesment,
                            2
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}

              {(checkOptionSetting(30, 1, options) ||
                checkOptionSetting(30, 2, options)) && (
                <div
                  className={styles.footerimagesection}
                  style={{
                    background: getPreviewColor(props.currentAssesment, 8),
                  }}
                >
                  <Row className={styles.footerimagepreview}>
                    <AuthorDetails
                      authorFName={props.currentAssesment &&
                        props.currentAssesment.m_oCreatedByUser && props.currentAssesment.m_oCreatedByUser.m_szFirstName}
                      authorLName={props.currentAssesment &&
                        props.currentAssesment.m_oCreatedByUser && props.currentAssesment.m_oCreatedByUser.m_szLastName}
                      authorImage={props.currentAssesment && props.currentAssesment.m_oCreatedByUser && props.currentAssesment.m_oCreatedByUser.m_oMedia && functionService.awsBucketImage(props.currentAssesment.m_oCreatedByUser.m_oMedia)} 
                      authorProfileDesc={props.currentAssesment &&
                        props.currentAssesment.m_oCreatedByUser && props.currentAssesment.m_oCreatedByUser.m_szProfileDesc} 
                      authorURL={props.currentAssesment &&
                        props.currentAssesment.m_oCreatedByUser && props.currentAssesment.m_oCreatedByUser && props.currentAssesment.m_oCreatedByUser.m_szExternalProfileURL }
                      options={options}
                      colors={colors}          
            
                    />
                  </Row>
                </div>
              )}
            </div>
          </div>
    </div>

      //   </Tab>

      //   {props.currentAssesment.m_nAssessmentType !== 3 && (
      //     <Tab eventKey="ratingBands" title="Rating Bands">
      //       <Ratingbands
      //         currentAssesment={props.currentAssesment}
      //         setLoader={setLoader}
      //         setCurrentAssesment={props.setCurrentAssesment}
      //       />
      //     </Tab>
      //   )}
      
      // </Tabs>
      // </div>
  );
}

export default Resulttab;
