import React, { useEffect, useState } from "react";
import styles from "./evalinator.module.css";
import Header from "../../Components/Header";
// import Mainbanner from './Mainbanner.js';
import Frontdetail from "./frontdetail.js";
import Userdetail from "./userdetail.js";
import Questionlist from "./Questionlist";
import ProfileForm from "./ProfileForm";
import RegistrationForm from "./RegistrationForm";
import { checkOptionSetting, functionService } from "../../Context/functions";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../Components/Loader";
import Toaster from "../../Components/Toaster";
import { faBan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import Promotions from '../Assesment/Promotions';
import Nodata from "../../assets/images/nodata.png";
import ViewResults from "./ViewResults";
// import EmailCapture from '../Assesment/EmailCapture';
import NotificationBar from "../../Components/NotificationBar";
// import MetaTags from 'react-meta-tags';
// import { Helmet } from 'react-helmet-async';

function Showlandingpage(props) {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [showHeader] = useState(false);
  const [row, setRow] = useState({});
  const [paramSequence, setParamSequence] = useState([]);
  const params = useParams();
  const [profileData, setProfileData] = useState({});
  const [questionOptions, setQuestionOptions] = useState({});
  const [questionTextOptions, setQuestionTextOptions] = useState({});
  const [currentStage, setCurrentStage] = useState(-1);
  const [btnClicked, setBtnClicked] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [viewResult, handleViewResults] = useState(false);
  const [registerFormHandle, setRegisterFormHandle] = useState(false);
  const [message, setMessage] = useState("Some Error occors!!");
  //console.log('questionOptions',questionOptions);
  const [noResponse, setNoResponse] = useState(false);
  // const [apiCallComplete, setApiCallComplete] = useState(false);

  // const getData = async () => {
  //     setLoader(true);
  //     let time = localStorage.getItem(JSON.stringify(params.id + '-time'))
  //     let oldTime = JSON.parse(time)
  //     let currentTime = new Date().getTime() / 1000;

  //     if (currentTime - oldTime > 60) {
  //         alert('time to call api ')

  //         let res = await functionService.post('Assess/getAssessmentForLanding', { szGuid: params.id });

  //         if (res.status === true) {
  //             if (res.data.data.statusCode === 200) {
  //                 let response = JSON.parse(res.data.data.result);
  //                 // console.log("response",response)
  //                 document.title = (response && response.goAssessment) ? response.goAssessment.szName + " - Assessment" : '';
  //                 setRow(response);
  //                 let arr = response.gPageSequence2;
  //                 console.log('setting assessment data ', response);
  //                 localStorage.setItem(JSON.stringify(params.id), JSON.stringify(response));
  //                 let sec = new Date().getTime() / 1000;
  //                 localStorage.setItem(JSON.stringify(params.id + '-time'), JSON.stringify(sec));

  //                 setParamSequence(arr);
  //                 if (params.hasOwnProperty("stage")) {
  //                     let index = arr.indexOf((params.stage).toUpperCase());
  //                     setCurrentStage(index);
  //                 } else {
  //                     localStorage.removeItem("emailToken")
  //                     //localStorage.removeItem("localAssesmentToken");
  //                 }
  //             }
  //         } else {
  //             setNoResponse(true);
  //         }

  //     } else {
  //         alert('time pic from teken')

  //         let res = localStorage.getItem(JSON.stringify(params.id));
  //         let response = JSON.parse(res);
  //         document.title = (response && response.goAssessment) ? response.goAssessment.szName + " - Assessment" : '';
  //         setRow(response);
  //         let arr = response.gPageSequence2;
  //         setParamSequence(arr);
  //         if (params.hasOwnProperty("stage")) {
  //             let index = arr.indexOf((params.stage).toUpperCase());
  //             setCurrentStage(index);
  //         } else {
  //             localStorage.removeItem("emailToken")
  //             //localStorage.removeItem("localAssesmentToken");
  //         }
  //         // pic from token
  //     }

  //     setLoader(false);
  // }

  const getData = async () => {
    setLoader(true);

    //console.log("params.stage", params.stage);
    let landingpage = -1;
    if (params.stage === undefined) landingpage = 1;

    let res = await functionService.post("Assess/getAssessmentForLanding", {
      szGuid: params.id,
      stage: landingpage,
    });

    if (res.status === true) {
      if (res.data.data.statusCode === 200) {
        let response = JSON.parse(res.data.data.result);
        // console.log("response",response)
        document.title =
          response && response.goAssessment
            ? response.goAssessment.szName + " - Assessment"
            : "";
        setRow(response);
        let arr = response.gPageSequence2;

        setParamSequence(arr);
        if (params.hasOwnProperty("stage")) {
          let index = arr.indexOf(params.stage.toUpperCase());
          setCurrentStage(index);
        } else {
          localStorage.removeItem("emailToken");
          //localStorage.removeItem("localAssesmentToken");
        }

        // setApiCallComplete(true);
      }
    } else {
      setNoResponse(true);
    }

    setLoader(false);
  };

  //console.log("questionTextOptions", questionTextOptions);
  const handleResultSubmit = async (assesementToken = "") => {
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    let dataArray = {
      guid: params.id,
      respondentEmail: "",
      dictResponses: {},
      dictProfileResponses: profileData,
      dictTextResponses: {},
    };
    Object.keys(questionOptions).forEach((element) => {
      let keys = element.split("_");
      if (dataArray["dictResponses"].hasOwnProperty(keys[0]) === false) {
        dataArray["dictResponses"][keys[0]] = [];
      }
      dataArray["dictResponses"][keys[0]].push(questionOptions[element]);
      // dataArray['dictTextResponses'][keys[0]].push(questionOptions[element]);
    });

    Object.entries(questionTextOptions).map(([keys, element]) => {
      dataArray["dictTextResponses"][keys] = element;
    });
    // questionTextOptions && questionTextOptions.map((element) => {
    //   dataArray["dictTextResponses"].push(element);
    // });
    //console.log("dataArray", dataArray);

    // Object.values(questionTextOptions).map((element) => {
    //     console.log('element', element )
    // //   dataArray["dictTextResponses"][keys[0]].push(questionTextOptions[element]);
    // });
    setLoader(true);
    if (localStorage.getItem("emailToken")) {
      assesementToken = localStorage.getItem("emailToken");
      //localStorage.removeItem("emailToken"); // manish
    }
    //console.log('assesementToken',assesementToken);

    // get the respondents email address..useful for on-behalf-of scenraions
    let respondentEmailAddress = "";
    if (localStorage.getItem("respondentEmailAddress")) {
      respondentEmailAddress = localStorage.getItem("respondentEmailAddress");
    }
    dataArray.respondentEmail = respondentEmailAddress;

    //console.log('respondentEmailAddress',respondentEmailAddress);

    let res = await functionService.post(
      "Assess/submitAssessment",
      dataArray,
      assesementToken
    );

    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        var results = JSON.parse(res.data.data.result);

        // if this is not on behalf of
        if (checkOptionSetting(230, 1, row && row.gdictOptions) == false) {
          functionService.sendTrackingData("Assess/postTrackingEvent", {
            assessId: results.gData.goAssessment.nId,
            eventId: 70,
          });
        }

        // if redirect option is set, then redirect to the right page.
        if (
          checkOptionSetting(71, 1, row && row.gdictOptions) &&
          results.szRedirectURL.length > 0
        ) {
          window.location = results.szRedirectURL;
          return false;
        } else {
          functionService.setAssesmentResult(res.data.data.result);
          setShowToast(true);
          history.push("/analyticsresult");
          return false;
        }
      } else {
        setShowToast1(true);
      }
    } else {
      if (res.hasOwnProperty("data")) {
        setMessage(res.data.data.result);
        setShowToast1(true);
      }
    }
    setDisabled(false);
    setLoader(false);
    //history.push("/analyticsresult");
  };
  const handleNext = (val, token = "") => {
    if (val >= paramSequence.length) {
      if (token !== "") {
        localStorage.setItem("localAssesmentToken", token);
      }

      handleResultSubmit(token);
      return false;
    }
    setCurrentStage(val);
    history.push(
      "/" +
        params.slug +
        "/assessment/" +
        params.id +
        "/" +
        paramSequence[val].toLowerCase()
    );
  };

  const paramSqnComponent = {
    QUESTIONS: (
      <Questionlist
        setQuestionTextOptions={setQuestionTextOptions}
        questionTextOptions={questionTextOptions}
        row={row}
        currentStage={currentStage}
        setCurrentStage={handleNext}
        questionOptions={questionOptions}
        setQuestionOptions={setQuestionOptions}
      />
    ),
    PROFILE: (
      <ProfileForm
        row={row}
        currentStage={currentStage}
        setCurrentStage={handleNext}
        profileData={profileData}
        setProfileData={setProfileData}
      />
    ),
    REG: (
      <RegistrationForm
        setRegisterFormHandle={setRegisterFormHandle}
        row={row}
        currentStage={currentStage}
        setCurrentStage={handleNext}
        setLoader={setLoader}
      />
    ),
  };

  useEffect(() => {
    getData();

    if (params.hasOwnProperty("stage")) {
      let index = paramSequence.indexOf(params.stage.toUpperCase());
      setCurrentStage(index);
    } else {
      functionService.setQuestionStorage({});
    }
    setQuestionOptions(functionService.getQuestionStorage());

    // window.scrollTo(0, 0);
  }, [params]);

  useEffect(() => {
    if (
      window &&
      window.location.href.includes("/questions") &&
      paramSequence.length > 0 &&
      paramSequence[0] !== "QUESTIONS" &&
      paramSequence.includes("REG") &&
      registerFormHandle === false
    ) {
      history.push("/" + params.slug + "/assessment/" + params.id);
      return;
    }
    functionService.setQuestionStorage(questionOptions);
  }, [questionOptions, paramSequence]);

  //console.log("row", row);

  // if (!apiCallComplete) {
  //     return null; // Return nothing until API call is complete
  //   }
  return (
    <>
    {/* {
        <Helmet>
        	<meta property="og:title" content="Take your shopfiy quiz" />
					<meta property="og:image" content="https://s3.amazonaws.com/media.evalinator.com/1d63c332-5b91209.jpg" />
        </Helmet> 
      } */}

      {/* {console.log("options", row && row.gdictOptions)} */}
      {checkOptionSetting(230, 1, row && row.gdictOptions) && (
        <NotificationBar
          message="You are taking this assessment on behalf of the respondent. Email addresses will not be sent a code for validation."
          bgColor="#483f90"
          textColor="#fff"
        />
      )}

      {noResponse ? (
        <div style={{textAlign:"center"}} className={styles.nodatapage}>
          <img src={Nodata} />
          {/* <h2>Sorry, we could not find your assessment.</h2> */}
        </div>
      ) : (
        <>
          <Loader loader={loader} />
          {showHeader && <Header />}
          <div className={styles.lanindgmainpage}>
            {currentStage === -1 ? (
              <>
                <div>
                  {/* <Mainbanner row={row}/>    */}
                  {viewResult === false ? (
                    <>
                      <Frontdetail
                        handleViewResults={handleViewResults}
                        row={row}
                        setCurrentStage={handleNext}
                        setBtnClicked={setBtnClicked}
                      />
                    </>
                  ) : (
                    <ViewResults row={row} setLoader={setLoader} />
                  )}
                </div>
              </>
            ) : (
              <>{paramSqnComponent[paramSequence[currentStage]]}</>
            )}
          </div>

          {/* <Footer /> */}

          <Toaster
            showtoast={showtoast}
            toggleShowToast={toggleShowToast}
            bgclass="success"
            status="Success"
            message="Updated Successfully!!"
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
        </>
      )}
    </>
  );
}

export default Showlandingpage;
