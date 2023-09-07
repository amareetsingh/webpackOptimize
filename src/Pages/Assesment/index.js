import React, { useEffect, useReducer, useState } from "react";
import styles from "./assesment.module.css";
import Footer from "../../Components/Footer";
import { Breadcrumb } from "react-bootstrap";
import { Container } from "react-bootstrap";
import eye from "../../assets/images/eye.png";
import settingIcon from "../../assets/images/settingicon.svg";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Accordion, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { functionService /*getButtonText*/ } from "../../Context/functions";
import Header from "../../Components/Header";
import Questionstab from "./Questions";
import Resulttab from "./Result";
import Landingtab from "./Landing";
import Checkboxtype from "./Checkboxtype";
import Modal from "react-bootstrap/Modal";
import Setting from "./../Settings/Setting";
import { AuthReducer, initialState } from "../../Context/reducer";
import SliderPicker from "./SliderPicker";
import TextEditor from "../../Components/TextEditor";
import ImageUploader from "../../Components/ImageUploader";
import AssesmentOptions from "./AssementOptions";
import Toaster from "../../Components/Toaster";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle , faExpandAlt, faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import GoLive from "./GoLive";
import QuestionItemList from "./QuestionItemList";
import EmailCaptureAdmin from "./EmailCaptureAdmin";
import Loader from "../../Components/Loader";
import Ratingbands from "../Settings/Ratingbands";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styless from "../Settings/settingstyle.module.css";

function AssesmentPage(props, row) {
  const params = useParams();
  const [currentAssesment, setCurrentAssesment] = useState({});
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [questionOrder, setQuestionOrder] = useState(false);

  const [isFullWidth, setIsFullWidth] = useState(false);

   // Function to toggle the visibility and scaling effect
   const toggleFullWidth = () => {
    setIsFullWidth((prev) => !prev);
  };

  // 	const [show, setShow] = useState(false);
  let iframeAssesmentUrl =
    "https://app.evalinator.com/" +
    functionService.convertToSlug(currentAssesment.m_szSurveyName) +
    "/assessment/" +
    currentAssesment.m_szSurveyGUID;
  let iframeQuestionUrl =
    "https://app.evalinator.com/" +
    functionService.convertToSlug(currentAssesment.m_szSurveyName) +
    "/assessment/" +
    currentAssesment.m_szSurveyGUID +
    "/questions";
  let iframeRegUrl =
    "https://app.evalinator.com/" +
    functionService.convertToSlug(currentAssesment.m_szSurveyName) +
    "/assessment/" +
    currentAssesment.m_szSurveyGUID +
    "/reg";

  const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const assesementTitle = decodeHtml(
    currentAssesment && currentAssesment.m_szSurveyName
  );

  const defaultAttr = {
    toolId: params.id,
    toolName: "",
    toolDesc: "",
    toolDescPostCompletion: "",
    assessmentType: currentAssesment && currentAssesment.m_nAssessmentType + "",
    userId: 0,
    listMetadata: [],
    nLayoutId: 0,
  };
  const handleClose = () => setShow(false);
  const [formData, setFormData] = useState(defaultAttr);

  const [activeStep, setActiveStep] = useState(0);

  const [scoreQuestionList, setScoreQuestionList] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleCloseScoring1 = () => setShow1(false);
  const [user] = useReducer(AuthReducer, initialState);
  const handleCloseScoring2 = () => setShow2(false);
  const handleShowScoring2 = () => setShow2(true);
  const [formScoringOptionData, setformScoringOptionData] = useState({});
  const [setQuestionType] = useState("checkbox");
  const [ratingBand, setRatingBand] = useState([]);
  const [fullData, setFullData] = useState({});
  const [message, setMessage] = useState("Some Error Occurs!!");
  const [showResults, setShowResults] = React.useState(
    localStorage.getItem("currentStep") || "false"
  );
  const setShowsettingoption = () => {
    localStorage.setItem("currentStep", "true");
    setShowResults("true");
  };

  const [rows, setRows] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);

  const history = useHistory();
  const handleBack = () => {
    history.push("/dashboard");
  };

  const updateQuestionTostate = (data) => {
    setCurrentQuestion(data);

    var assessment = currentAssesment;
    if (assessment) {
      assessment.m_dictQuestions[data?.m_lQuestionId] = data;
      setCurrentAssesment(assessment);
    }
  };

  // console.log("question list", row)

  /*useEffect(() => {
    // console.log("useEfffect rattinng")
    setRatingBand(
      currentAssesment &&
        currentAssesment.m_oRatingScalesGroup &&
        currentAssesment.m_oRatingScalesGroup.m_dictRatingScales
    );
  }, [currentAssesment]);*/

  // const getAssessmentById = async () => {
  //   setLoader(true);

  //   let res = await functionService.post("assessment/getAssessmentById", {
  //     evalinatorId: 0,
  //     surveyId: params.id,
  //   });
  //   if (res !== false && res.status !== false) {
  //     if (res.data.data.statusCode === 200) {
  //       let data = JSON.parse(res.data.data.result);
  //       //console.log("assessment",data);
  //       //console.log("((data && data.m_oRatingScalesGroup) && data.m_oRatingScalesGroup.m_dictRatingScales)",((data && data.m_oRatingScalesGroup) && data.m_oRatingScalesGroup.m_dictRatingScales))
  //       setRatingBand(
  //         data &&
  //           data.m_oRatingScalesGroup &&
  //           data.m_oRatingScalesGroup.m_dictRatingScales
  //       );
  //       setCurrentAssesment(data);
  //       // console.log('data.m_dictUserOptions',data.m_dictUserOptions)
  //       functionService.setOptions(data.m_dictUserOptions);
  //     }
  //   } else {
  //     if (
  //       res.error &&
  //       res.error.response &&
  //       res.error.response.status === 401 &&
  //       localStorage.getItem("currentUser")
  //     ) {
  //       localStorage.removeItem("currentUser");
  //       localStorage.removeItem("token");
  //       window.location = "/login";
  //       return;
  //     }
  //   }
  //   setLoader(false);
  // };

  const getAssessmentById = async () => {
    let res = await functionService.post("assessment/getAssessmentById", {
      evalinatorId: 0,
      surveyId: params.id,
    });
    setLoader(true);
    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        let data = JSON.parse(res.data.data.result);
        console.log("assessment",data);
        //console.log("((data && data.m_oRatingScalesGroup) && data.m_oRatingScalesGroup.m_dictRatingScales)",((data && data.m_oRatingScalesGroup) && data.m_oRatingScalesGroup.m_dictRatingScales))
        setRatingBand(
          data &&
            data.m_oRatingScalesGroup &&
            data.m_oRatingScalesGroup.m_dictRatingScales
        );
        setCurrentAssesment(data);

        // set props used by questions tab - make them same later.
        var dictQuestions = Object.values(data && data.m_dictQuestions);

        //console.log("question received", data.m_dictQuestions);
        if (dictQuestions && dictQuestions != "") {
          dictQuestions.sort((a, b) => a.m_nQuestionSeqNo - b.m_nQuestionSeqNo);

          //console.log("Questions", dictQuestions);

          setRows(dictQuestions);
          if (dictQuestions.length > 0) {
            setCurrentQuestion(dictQuestions[0]);
          }
        }
        //console.log('data.m_dictUserOptions',dictQuestions)
        functionService.setOptions(data.m_dictUserOptions);
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
    setLoader(false);
  };

  const handleQuestionRemove = (id) => {
    setLoader(true);
    let data = currentAssesment;
    /*data.m_dictQuestions(currentQues => 
      currentQues.filter(questionLists => {
        return questionLists.id !== 0;
      }
      )
      )*/
    if (id in data.m_dictQuestions) delete data.m_dictQuestions[id];
    setCurrentAssesment(data);

    var dictQuestions = Object.values(data && data.m_dictQuestions);
    if (dictQuestions && dictQuestions != "") {
      dictQuestions.sort((a, b) => a.m_nQuestionSeqNo - b.m_nQuestionSeqNo); // manish

      setRows(dictQuestions);

      if (dictQuestions.length > 0) {
        setCurrentQuestion(dictQuestions[0]);
      }
    }
    setLoader(false);
  };
  const handleUpdate = async () => {
    setLoader(true);
    // alert("save");
    let assesment = currentAssesment;
    // formData.nLayoutId = assesment.m_oLayout.m_nLayoutId ;
    //console.log('sending to server',formData);
    let res = await functionService.post("Assessment/saveAssessment", formData);

    if (res.status === true) {
      getData();
      setShowToast(true);
      getAssessmentById();
    } else {
      if (res.hasOwnProperty("data")) {
        setShowToast1(res.data.data.result);
      }

      if (
        res &&
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
    setLoader(false);
  };
  // const handleQuestiontype = (e)=>{
  // 	let val = e.target.value;
  // 	setQuestionType(val);
  // }
  const getScoreList = async (type = false) => {
    setLoader(true);
    let res = await functionService.post("Question/getQuestionScoringSetup", {
      assessmentId: params.id,
    });
    if (res.status === true && res.data.data.statusCode === 200) {
      let data = JSON.parse(res.data.data.result);
      setFullData(data);

      setRatingBand(
        data &&
          data.m_oRatingScalesGroup &&
          data.m_oRatingScalesGroup.m_dictRatingScales
      );
      let scoringquestion = data.m_listCategories[0]["m_listSurveyQuestions"];
      let arrayData = {};
      scoringquestion.length > 0 &&
        scoringquestion.forEach(function (element) {
          arrayData[element.m_lQuestionId] = {};
          element.m_listResponseOptions.length > 0 &&
            element.m_listResponseOptions.forEach(function (elementOption) {
              if (elementOption.m_listMappedPersonalityBands.length > 0) {
                arrayData[element.m_lQuestionId][elementOption.m_lResponseId] =
                  elementOption.m_listMappedPersonalityBands[0];
              } else {
                arrayData[element.m_lQuestionId][
                  elementOption.m_lResponseId
                ] = 0;
              }
            });
        });
      setformScoringOptionData(arrayData);
      setScoreQuestionList(scoringquestion);
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
    setLoader(false);
  };

  // question
  const getData = async (type = false) => {
    setLoader(true);

    var dictQuestions = currentAssesment && currentAssesment.m_dictQuestions;
    //console.log("dictQuestions",dictQuestions)

    if (dictQuestions && dictQuestions != "") {
      var arrayData = Object.values(dictQuestions);
      arrayData.sort((a, b) => a.m_nQuestionSeqNo - b.m_nQuestionSeqNo); // manish
      setRows(arrayData);
    }

    // let res = await functionService.post("Question/getQuestionsList", {
    //   assessmentId: params.id,
    // });
    // if (res.status === true) {
    //   let data = JSON.parse(res.data.data.result);

    //   setRows(data.m_listSurveyQuestions);
    //   if (data.m_listSurveyQuestions.length > 0 && type === false) {
    //     setCurrentQuestion(data.m_listSurveyQuestions[0]);
    //   }
    // } else {
    //   if (
    //     res &&
    //     res.error &&
    //     res.error.response &&
    //     res.error.response.status === 401 &&
    //     localStorage.getItem("currentUser")
    //   ) {
    //     localStorage.removeItem("currentUser");
    //     localStorage.removeItem("token");
    //     window.location = "/login";
    //     return;
    //   }
    // }
  };

  const setHidesettingoption = () => {
    localStorage.setItem("currentStep", "false");
    if (showResults === true) {
      getAssessmentById();
    }
    setShowResults("false");
  };

  const getSingleQuestion = async (question_id) => {
    setLoader(true);

    var getQuestionFromAssesment = currentAssesment.m_dictQuestions;
    setCurrentQuestion(getQuestionFromAssesment[question_id]);
    console.log("setting question to", getQuestionFromAssesment[question_id]);
    // let res = await functionService.post("Question/getQuestionById", {
    //   questionId: question_id,
    //   assessmentId: params.id,
    // });
    // if (res.status === true) {
    //   let data = JSON.parse(res.data.data.result);
    //   if (data.m_listSurveyQuestions.length > 0) {
    //     //console.log("data.m_listSurveyQuestions[0]",data.m_listSurveyQuestions)
    //     setCurrentQuestion(data.m_listSurveyQuestions[0]);
    window.scrollTo(0, 0);
    //   }
    // } else {
    //   if (
    //     res.error &&
    //     res.error.response &&
    //     res.error.response.status === 401 &&
    //     localStorage.getItem("currentUser")
    //   ) {
    //     localStorage.removeItem("currentUser");
    //     localStorage.removeItem("token");
    //     window.location = "/login";
    //     return;
    //   }
    // }

    setLoader(false);
  };

  useEffect(() => {
    getAssessmentById();
    getData();
  }, []);

  const handleAddQuestion = async () => {
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    setLoader(true);
    let questionObj = {
      assessmentId: params.id,
      userId: 0,
      lQuestionId: 0,
      szQuestionText: "",
      szQuestionDesc: "",
      nQuestionWeight: 0,
      nQuestionType:
        currentAssesment && currentAssesment.m_nAssessmentType === 3 ? 6 : 1,
      listDimensions: [0],
      listResponse: [{}],
      dictCustomizations: {},
    };

    let res = await functionService.post("Question/saveQuestion", questionObj);
    //console.log("Savee",res);
    // if(res.status === true){
    // 	getSingleQuestion(res.data.data.result[0]['question_id'])
    // 	getData(true);
    // }
    if (res !== false && res.status !== false) {
      setCurrentAssesment({ ...currentAssesment, m_nPublishStatus: 3 });
      if (res.data.data.statusCode === 200) {
        //console.log("Question added",res);
        let data = JSON.parse(res.data.data.result);
        updateQuestionTostate(data);
        // manish - add new question to state
        var assessment = currentAssesment;
        // if(assessment){
        // assessment.m_dictQuestions[data.m_lQuestionId]=data;
        // setCurrentAssesment(assessment);
        // }
        var dictQuestions = Object.values(
          assessment && assessment.m_dictQuestions
        ); // manish
        if (dictQuestions && dictQuestions != "") {
          dictQuestions.sort((a, b) => a.m_nQuestionSeqNo - b.m_nQuestionSeqNo); // manish
          setRows(dictQuestions);
        }
        //setRows(Object.values(assessment.m_dictQuestions));
        // end manish

        //console.log("Save",data);
        //getSingleQuestion(data["m_lQuestionId"]); // manish
        getSingleQuestion(data.m_lQuestionId);
        //getData(true);
        setShowToast(true);
      } else {
        setMessage(res.data.data.result);
        setShowToast1(true);
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
      } else {
        if (res && res.hasOwnProperty("data")) {
          setMessage(res.data.data.result);
        } else {
          setMessage("Some error ocurred!");
        }

        setShowToast1(true);
      }
    }
    setDisabled(false);
    setLoader(false);
  };
  // question end

  const handleOptionAdd = async () => {
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    setLoader(true);
    let res = await functionService.post("question/band-option/save", {
      options: formScoringOptionData,
    });

    if (res.status === true) {
      setShowToast(true);
    } else {
      //setMessage(res.error);
      setShowToast1(true);
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
    setDisabled(false);
    setLoader(false);
    setCurrentAssesment({ ...currentAssesment, m_nPublishStatus: 3 });
  };

  const handlePublish = async () => {
    try {
      if (disabled === true) {
        return false;
      }
      setDisabled(true);
      setLoader(true);
      let res = await functionService.post("Assessment/publish", {
        assessmentId: params.id,
        userId: 0,
      });

      if (res !== false && res.status !== false) {
        if (res.data.data.statusCode === 200) {
          let response = JSON.parse(res.data.data.result);
          if (response.m_nErrorId > 0) {
            setMessage(response.m_szError);
            setShowToast1(true);
          } else {
            setShowToast(true);
            setCurrentAssesment({ ...currentAssesment, m_nPublishStatus: 1 });
          }
        } else {
          setMessage(res.error.response.result);
          setShowToast1(true);
          //console.log("ress",res)
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
        } else {
          setShowToast1(true);
          if (res.hasOwnProperty("error")) {
            setMessage(res.error);
          } else {
            setMessage("Some error occured!");
          }
        }
      }
      setDisabled(false);
      setLoader(false);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleView = () => {
    //console.log(currentAssesment.m_szSurveyGUID);
    //setHidesettingoption();
    //history.push("/"+functionService.convertToSlug(currentAssesment.m_szSurveyName)+"/assessment/"+currentAssesment.m_szSurveyGUID);

    window.open(
      "/" +
        functionService.convertToSlug(currentAssesment.m_szSurveyName) +
        "/assessment/" +
        currentAssesment.m_szSurveyGUID,
      "_blank"
    );
  };

  const handleTextData = (val) => {
    let dataArray = { ...currentAssesment };
    if (Object.keys(dataArray).length > 0) {
      //dataArray['m_szSurveyDesc'] = val.toString();
      //setCurrentAssesment(dataArray);
      setFormData({ ...formData, toolDesc: val });
    }
  };

  function handleTextPostData(val) {
    let dataArray = { ...currentAssesment };
    if (Object.keys(dataArray).length > 0) {
      setFormData({ ...formData, toolDescPostCompletion: val });
    }
  }

  const handleLayoutSelection = (val) => {
    let assessment = { ...currentAssesment };
    //console.log("assessment state", assessment);
    assessment.m_oLayout.m_nLayoutId = val;
    setCurrentAssesment(assessment);

    if (Object.keys(assessment).length > 0) {
      setFormData({ ...formData, nLayoutId: val });
      //console.log("new testing formData",formData);
    }
  };

  const handleAction = (formKey, surveyKey, val) => {
    setCurrentAssesment({ ...currentAssesment, [surveyKey]: val });
    setFormData({ ...formData, [formKey]: val });
  };
  const handleActionText = (key, val) => {
    let array = { ...currentAssesment };
    array["m_oEvalCustomizations"]["m_dictEvalCustomizations"][key] = val;
    setCurrentAssesment(array);
    // alert("val",val + " " + array['m_oEvalCustomizations']['m_dictEvalCustomizations'][key]);
  };

  const handleOptionAction = async (id, val) => {
    if (disabled === true) {
      return false;
    }
    let data = { ...currentAssesment };
    data.m_dictUserOptions[id] = parseInt(val);
    let results = data.oResults;
    let gData = results.gData;

    gData.gdictOptions = data.m_dictUserOptions;
    results.gData = gData;
    data.oResults = results;
    //console.log("id:" + id + " val:" + val);
    //console.log("data", data);
    //alert(data.oResults.gData.gdictOptions[id] + ":" + val);
    //console.log("data.m_dictUserOptions",data.m_dictUserOptions);
    functionService.setOptions(data.m_dictUserOptions);
    setCurrentAssesment(data);

    setDisabled(true);
    setLoader(true);
    let res = await functionService.post("Settings/saveOptionSettings", {
      lAssessmentId: params.id,
      dictOptions: {
        [id]: val,
      },
    });
    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        setShowToast(true);
      } else {
        setShowToast1(true);
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
    setCurrentAssesment({ ...currentAssesment, m_nPublishStatus: 3 });

    //getAssessmentById();
    setLoader(false);
    setDisabled(false);
  };
  const handleQuestionOrder = async () => {
    let orderData = {
      lAssessmentId: params.id,
      mapNewOrder: {},
    };
    rows.forEach((element, index) => {
      orderData["mapNewOrder"][element.m_lQuestionId] = index;
    });

    let res = await functionService.post(
      "Question/reorderQuestions",
      orderData
    );
    if (res && res.data.status === 200) {
      setShowToast(true);
      setCurrentAssesment({ ...currentAssesment, m_nPublishStatus: 3 });
      //setSuccMessage("Successfully updated order !");
    }
    setQuestionOrder(false);
  };

  //console.log("currentAssesment", currentAssesment);
  // console.log("default attr name", formData.toolName);
  // console.log("default attr layout", formData.nLayoutId);
  return (
    <div style={{ overflow: "none" }}>
      <div className={styles.assesment_page}>
        <Toaster
          showtoast={showtoast}
          toggleShowToast={toggleShowToast}
          bgclass="success"
          status="Success"
          message="updated Successfully!!"
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Banner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="file" placeholder="" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Upload Image
            </Button>
          </Modal.Footer>
        </Modal>

        <Header loader={loader} />

        <div className={styles.breadcrumb} id="breadscumbs">
          <Container fluid>
            <div className={styles.breadcrumb_assesment}>
              <Breadcrumb>
                <Breadcrumb.Item onClick={handleBack}>
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active}>
                  {assesementTitle !== "undefined" ? (
                    <>
                      {" "}
                      {assesementTitle.length > 70
                        ? assesementTitle.substring(0, 70) + "..."
                        : assesementTitle}{" "}
                      ({currentAssesment && currentAssesment.m_szAssessmentType}
                      ){" "}
                    </>
                  ) : (
                    ""
                  )}
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className={styles.rightBtn}>
                <button className={styles.view} onClick={setShowsettingoption}>
                  <img src={settingIcon} alt="setting" width="25" />
                </button>
                <button className={styles.view} onClick={handleView}>
                  <img src={eye} alt="eye" />
                </button>

                {showResults === "false" &&
                  (activeStep === 0 ||
                    activeStep === 2 ||
                    activeStep === 3) && (
                    <button
                      className={styles.save}
                      onClick={() => {
                        handleUpdate();
                      }}
                    >
                      Save{" "}
                    </button>
                  )}

                {currentAssesment && currentAssesment.m_nPublishStatus === 0 ? (
                  <button className={styles.publish} onClick={handlePublish}>
                    Not Published
                  </button>
                ) : (
                  <>
                    {currentAssesment &&
                    currentAssesment.m_nPublishStatus === 1 ? (
                      <button
                        className={styles.publishGreen}
                        onClick={handlePublish}
                      >
                        Published
                      </button>
                    ) : (
                      <button
                        className={styles.publishOrange}
                        onClick={handlePublish}
                      >
                        Re-Publish{" "}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Container>
        </div>

        <div className={styles.body_assesment}>
          <Container fluid>
            <Row className={styles.row_assesment}>
              {/* <Col sm={3} className={styles.aside}> */}
              <Col sm={3} className={`p-0 col-sm-3 ${isFullWidth ? styles.hidden : ''}`}>
                <div
                  className={`${styles.leftBar} ${
                    showResults !== "false" ? "settingTabOpen" : ""
                  }`}
                >
                  <div className={styles.scrollLanding}>
                    <Accordion style={{ overflowY: "scroll", height: "700px" }}>
                      <Accordion.Item
                        eventKey="0"
                        onClick={() => {
                          setActiveStep(0);
                          setHidesettingoption();
                        }}
                        className={styles.accordionitem}
                      >
                        <Accordion.Header>
                          <h2>Landing</h2>
                        </Accordion.Header>
                        <Accordion.Body className={styles.accordionBody1}>
                          {/* <Form.Group
                          controlId="formLayoutType"
                          className={styles.question_type}
                        >
                          <Form.Select
                            className={styles.selectfont}
                            onChange={(e) => {
                              handleLayoutSelection(
                                "nLayoutId",
                                "m_oLayout.m_nLayoutId",  
                                e.target.value
                              );
                            }}
                             value={0}
                          >
                            {props.currentAssesment && (
                                <>
                                  <option value="0">Default Layout</option>
                                  <option value="1">Banner Layout 1</option>
                                  <option value="2">Banner Layout 2</option>
                                </>
                              )}
                          </Form.Select>
                        </Form.Group>                      
                       */}

                          {/* <select name="selectList" id="selectList"> */}

                          {currentAssesment &&
                          currentAssesment.m_dictLayouts ? (
                            <Form.Select
                              onChange={(e) => {
                                handleLayoutSelection(e.target.value);
                              }}
                              value={
                                currentAssesment &&
                                currentAssesment.m_oLayout &&
                                currentAssesment.m_oLayout.m_nLayoutId
                              }
                            >
                              {" "}
                              <>
                                {currentAssesment &&
                                  Object.keys(
                                    currentAssesment.m_dictLayouts
                                  ).map((key, kindex) => (
                                    <option key={kindex} value={key}>
                                      {" "}
                                      {currentAssesment.m_dictLayouts[key]}{" "}
                                    </option>
                                  ))}
                              </>
                            </Form.Select>
                          ) : (
                            ""
                          )}
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Assessment Title:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Text"
                              onChange={(e) => {
                                handleAction(
                                  "toolName",
                                  "m_szSurveyName",
                                  e.target.value
                                );
                              }}
                              value={assesementTitle || ""}
                            />
                          </Form.Group>
                          <div className={styles.optionimgupload}>
                            {/* <span>*</span> */}
                            <div className="mb-2 mt-4">
                              <ImageUploader
                                nPurpose={2}
                                lPurposeId={params.id}
                                setCurrentObject={setCurrentAssesment}
                                setCurrentData={currentAssesment}
                                infoIcon={true}
                              />
                            </div>
                          </div>
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput3"
                          >
                            <Form.Label>Assessment Description:</Form.Label>

                            <TextEditor
                              datas={
                                (currentAssesment &&
                                  currentAssesment.m_szSurveyDesc) ||
                                ""
                              }
                              classes="dimDescription"
                              formData={""}
                              // setFormData={setFormData}
                              handleTextData={handleTextData}
                              dataKey="szRatingBandDesc"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput2"
                          >
                            <Form.Label>Chart Title:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Text"
                              onChange={(e) =>
                                handleActionText("22", e.target.value)
                              }
                              value={functionService.getCustomizeText(
                                currentAssesment,
                                22
                              )}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput4"
                          >
                            <Form.Label>Assesment Button:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Text"
                              onChange={(e) =>
                                handleActionText("1", e.target.value)
                              }
                              value={functionService.getCustomizeText(
                                currentAssesment,
                                1
                              )}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput5"
                          >
                            <Form.Label>Result Button:</Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="Enter Text"
                              onChange={(e) =>
                                handleActionText("4", e.target.value)
                              }
                              value={functionService.getCustomizeText(
                                currentAssesment,
                                4
                              )}
                            />
                          </Form.Group>

                          <div className={styles.optionsettings}>
                            <h5>Option Setting:</h5>
                            <AssesmentOptions
                              data={currentAssesment}
                              type={1}
                              handleOptionAction={handleOptionAction}
                            />
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        eventKey="1"
                        onClick={() => {
                          setActiveStep(1);
                          setHidesettingoption();
                        }}
                        className={styles.accordionitem}
                      >
                        <Accordion.Header>
                          <h2>Questions ({rows && rows.length})</h2>
                        </Accordion.Header>

                        <Accordion.Body className={styles.accordionBody}>
                          <div className={styles.accordionBodybtn}>
                            {questionOrder && (
                              <Button
                                className={styles.accordionbtns}
                                onClick={handleQuestionOrder}
                              >
                                Update Order
                              </Button>
                            )}
                            
                            
                            {/*
                        {currentAssesment.m_nAssessmentType !== 1 &&
                          currentAssesment.m_nAssessmentType !== 3 && (
                            <Button
                              className={styles.accordionbtns}
                              onClick={() => {
                                handleShowScoring2();
                                getScoreList();
                              }}
                            >
                              Scoring
                            </Button>
                            )}
                          */}
                          </div>
                          {/* --------scoring drawer1 start-------- */}


                          <Offcanvas
                            show={show2}
                            onHide={handleCloseScoring2}
                            {...props}
                            placement="end"
                            className={styles.scorecanvas}
                          >
                            <Offcanvas.Header
                              className={styles.scorecanvasheader}
                            >
                              <Offcanvas.Title
                                className={styles.scorecanvasttl}
                              >
                                Scoring
                              </Offcanvas.Title>
                            </Offcanvas.Header>
                            <p className={styles.scoresubhead}>
                              You can set scoring on all questions
                            </p>
                            <Offcanvas.Body
                              className={styles.canvasscoringbody}
                            >
                              {scoreQuestionList &&
                                scoreQuestionList.map((obj, index) => (
                                  <>
                                    {obj.m_nQuestionDisplayType === 1 ||
                                    obj.m_nQuestionDisplayType === 3 ||
                                    obj.m_nQuestionDisplayType === 5 ? (
                                      <Checkboxtype
                                        ratingBand={ratingBand}
                                        row={obj}
                                        formScoringOptionData={
                                          formScoringOptionData
                                        }
                                        setformScoringOptionData={
                                          setformScoringOptionData
                                        }
                                        key={index}
                                      />
                                    ) : (
                                      <SliderPicker
                                        fullData={fullData}
                                        ratingBand={ratingBand}
                                        row={obj}
                                        formScoringOptionData={
                                          formScoringOptionData
                                        }
                                        setformScoringOptionData={
                                          setformScoringOptionData
                                        }
                                        key={index}
                                      />
                                    )}
                                  </>
                                ))}

                              {/* <Checkboxtype /> */}
                              {/* <Scorimagetype /> */}
                              {/* <Imagetype/> */}
                            </Offcanvas.Body>
                            <div className={styles.scoringBodybtn}>
                              <Button
                                className={`${styles.scoringbtns} ${styles.bgwhitebtn}`}
                                onClick={handleCloseScoring2}
                              >
                                Cancel
                              </Button>{" "}
                              <Button
                                className={styles.scoringbtns}
                                onClick={handleOptionAdd}
                              >
                                Save
                              </Button>{" "}
                            </div>
                          </Offcanvas>
                          {/* --------scoring drawer1 end-------- */}

                          {/* --------scoring drawer2 start-------- */}
                          {/* <Offcanvas
                            show={show1}
                            onHide={handleCloseScoring1}
                            placement="end"
                            className={`${styles.scorecanvas} ${styles.scorecanvas1}`}
                          >
                            <Offcanvas.Header
                              className={styles.scorecanvasheader}
                            >
                              <Offcanvas.Title
                                className={styles.scorecanvasttl}
                              >
                                Scoring1
                              </Offcanvas.Title>
                            </Offcanvas.Header>
                            <p className={styles.scoresubhead}>
                              You can set scoring on all questions
                            </p>
                            <Offcanvas.Body
                              className={styles.canvasscoringbody}
                            >
                              <div className={styles.scoringcheckbox}>
                                <p className={styles.checkboxquestion}>
                                  Which of the following is true for your
                                  on-page SEO efforts? 2
                                </p>
                                <span className={styles.badge}>
                                  Checkbox type
                                </span>

                                <div className={styles.questionsbox}>
                                  <p>What is on-page SEO?</p>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={styles.scoredrop}
                                  >
                                    <Form.Select
                                      defaultValue="5"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox}>
                                  <p>
                                    Meta description and target keywords exist
                                  </p>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={styles.scoredrop}
                                  >
                                    <Form.Select
                                      defaultValue="3"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox}>
                                  <p>
                                    We have a checklist that we use for every
                                    page and blog post
                                  </p>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={styles.scoredrop}
                                  >
                                    <Form.Select
                                      defaultValue="2"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>
                              </div>

                              <div className={styles.scoringcheckbox}>
                                <p className={styles.checkboxquestion}>
                                  Which of the following is true for your
                                  on-page SEO efforts?
                                </p>
                                <span className={styles.badge}>
                                  Images type
                                </span>

                                <div className={styles.Imageboxgroup}>
                                  <div className={styles.Imagebox}>
                                    <div className={styles.imageQuestions}>
                                      <div className={styles.questionimage}>
                                        <img
                                          src={answer_img3}
                                          alt="answer_img3"
                                        />
                                      </div>
                                    </div>
                                    <Form.Group
                                      controlId="formGridState"
                                      className={styles.scoredrop}
                                    >
                                      <Form.Select
                                        defaultValue="5"
                                        className={styles.selectfont}
                                      >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </div>

                                  <div className={styles.Imagebox}>
                                    <div className={styles.imageQuestions}>
                                      <div className={styles.questionimage}>
                                        <img
                                          src={answer_img4}
                                          alt="answer_img4"
                                        />
                                      </div>
                                    </div>
                                    <Form.Group
                                      controlId="formGridState"
                                      className={styles.scoredrop}
                                    >
                                      <Form.Select
                                        defaultValue="3"
                                        className={styles.selectfont}
                                      >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </div>

                                  <div className={styles.Imagebox}>
                                    <div className={styles.imageQuestions}>
                                      <div className={styles.questionimage}>
                                        <img
                                          src={answer_img5}
                                          alt="answer_img5"
                                        />
                                      </div>
                                    </div>
                                    <Form.Group
                                      controlId="formGridState"
                                      className={styles.scoredrop}
                                    >
                                      <Form.Select
                                        defaultValue="2"
                                        className={styles.selectfont}
                                      >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </div>
                                </div>
                              </div>

                              <div className={styles.scoringcheckbox}>
                                <p className={styles.checkboxquestion}>
                                  Which of the following is true for your
                                  on-page SEO efforts?
                                </p>
                                <span className={styles.badge}>
                                  Images type
                                </span>
                                <span className={styles.purplebadge}>
                                  Default
                                </span>

                                <div className={styles.questionsbox1}>
                                  <ul className={styles.dotquestionul}>
                                    <li className={styles.blue_bg}></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                  </ul>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={`${styles.scoredrop} ${styles.scoredrop1}`}
                                  >
                                    <Form.Select
                                      defaultValue="5"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox1}>
                                  <ul className={styles.dotquestionul}>
                                    <li></li>
                                    <li className={styles.blue_bg}></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                  </ul>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={`${styles.scoredrop} ${styles.scoredrop1}`}
                                  >
                                    <Form.Select
                                      defaultValue="2"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox1}>
                                  <ul className={styles.dotquestionul}>
                                    <li></li>
                                    <li></li>
                                    <li className={styles.blue_bg}></li>
                                    <li></li>
                                    <li></li>
                                  </ul>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={`${styles.scoredrop} ${styles.scoredrop1}`}
                                  >
                                    <Form.Select
                                      defaultValue="3"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox1}>
                                  <ul className={styles.dotquestionul}>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li className={styles.blue_bg}></li>
                                    <li></li>
                                  </ul>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={`${styles.scoredrop} ${styles.scoredrop1}`}
                                  >
                                    <Form.Select
                                      defaultValue="1"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox1}>
                                  <ul className={styles.dotquestionul}>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li className={styles.blue_bg}></li>
                                  </ul>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={`${styles.scoredrop} ${styles.scoredrop1}`}
                                  >
                                    <Form.Select
                                      defaultValue="4"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>
                              </div>

                              <div className={styles.scoringcheckbox}>
                                <p className={styles.checkboxquestion}>
                                  Which of the following is true for your
                                  on-page SEO efforts?
                                </p>
                                <span className={styles.badge}>Radio type</span>

                                <div className={styles.questionsbox}>
                                  <p>What is on-page SEO?</p>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={styles.scoredrop}
                                  >
                                    <Form.Select
                                      defaultValue="5"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox}>
                                  <p>
                                    Meta description and target keywords exist
                                  </p>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={styles.scoredrop}
                                  >
                                    <Form.Select
                                      defaultValue="3"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>

                                <div className={styles.questionsbox}>
                                  <p>
                                    We have a checklist that we use for every
                                    page and blog post
                                  </p>
                                  <Form.Group
                                    controlId="formGridState"
                                    className={styles.scoredrop}
                                  >
                                    <Form.Select
                                      defaultValue="2"
                                      className={styles.selectfont}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div>
                              </div>
                            </Offcanvas.Body>
                            <div className={styles.scoringBodybtn}>
                              <Button
                                className={`${styles.scoringbtns} ${styles.bgwhitebtn}`}
                                onClick={handleCloseScoring1}
                              >
                                Cancel
                              </Button>{" "}
                              <Button className={styles.scoringbtns}>
                                Save
                              </Button>{" "}
                            </div>
                          </Offcanvas> */}
                          {/* --------scoring drawer2 end-------- */}
                          <QuestionItemList
                            setQuestionOrder={setQuestionOrder}
                            rows={rows}
                            setRows={setRows}
                            currentQuestion={currentQuestion}
                            getSingleQuestion={getSingleQuestion}
                          />
                          {/*rows && rows.map((obj,index)=>(
							     <h5 key={index} className={obj.m_lQuestionId === (currentQuestion && currentQuestion.m_lQuestionId)? styles.active : ''} onClick={()=>{getSingleQuestion(obj.m_lQuestionId)}}>
								
							
								{index+1} : {obj.m_szQuestionText.substring(0,30) }{obj.m_szQuestionText.length > 30 ? '...':'' } {obj.m_szQuestionText === "" && " Question"}
								<span className={styles.questionhover}>
									<label>{obj.m_szQuestionText}</label>
									<p>{obj.m_szQuestionSubText}</p>
								</span>
								 </h5>
								))*/}

                          {/* <h5><span><img src={questionIcon} alt="pexelsback" /></span>Question 2</h5>
							     <h5><span><img src={questionIcon} alt="pexelsback" /></span>Question 3</h5>
                                 <h5><span><img src={questionIcon} alt="pexelsback" /></span>Question 4</h5>
							     */}
                          <h5 className={styles.addnewsection}>
                            <span
                              className={styles.addNewQuestion}
                              onClick={() => {
                                handleAddQuestion();
                              }}
                            >
                              Add Question
                            </span>
                          </h5>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        eventKey="2"
                        onClick={() => {
                          setActiveStep(2);
                          setHidesettingoption();
                        }}
                        className={styles.accordionitem}
                      >
                        <Accordion.Header>
                          <h2>Result</h2>
                        </Accordion.Header>
                        <Accordion.Body className={styles.accordionBody1}>
                          <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlInput3"
                          >
                            <Form.Label>Post Assesment Description:</Form.Label>

                            <TextEditor
                              datas={
                                (currentAssesment &&
                                  currentAssesment.m_szSurveyDescPostCompletion) ||
                                ""
                              }
                              classes="dimDescription"
                              formData={""}
                              // setFormData={setFormData}
                              //toolDescPostCompletion
                              handleTextData={handleTextPostData}
                              //dataKey='szRatingBandDesc'
                            />
                          </Form.Group>
                          <AssesmentOptions
                            data={currentAssesment}
                            type={3}
                            handleOptionAction={handleOptionAction}
                          />
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item
                        eventKey="3"
                        onClick={() => {
                          setActiveStep(3);
                          setHidesettingoption();
                        }}
                        o
                        className={styles.accordionitem}
                      >
                        <Accordion.Header>
                          <h2>Email Capture</h2>
                        </Accordion.Header>

                        <Accordion.Body>
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput2"
                          >
                            <Form.Label>Title Text </Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleActionText("10", e.target.value)
                              }
                              value={functionService.getCustomizeText(
                                currentAssesment,
                                10,
                                "Don't lose your results. Save them."
                              )}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput2"
                          >
                            <Form.Label>Continue Button Text</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleActionText("3", e.target.value)
                              }
                              value={functionService.getCustomizeText(
                                currentAssesment,
                                3,
                                "Continue"
                              )}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput2"
                          >
                            <Form.Label>Skip Text</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleActionText("5", e.target.value)
                              }
                              value={functionService.getCustomizeText(
                                currentAssesment,
                                5,
                                "Skip this step"
                              )}
                            />
                          </Form.Group>

                          <div className={styles.optionsettings}>
                            <h5>Option Setting:</h5>
                            <AssesmentOptions
                              data={currentAssesment}
                              type={6}
                              handleOptionAction={handleOptionAction}
                            />
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item
                        eventKey="4"
                        onClick={() => {
                          setActiveStep(4);
                          setHidesettingoption();
                        }}
                        className={styles.accordionitem}
                      >
                        <Accordion.Header>
                          <h2>Go Live</h2>
                        </Accordion.Header>
                        <Accordion.Body
                          className={styles.accordionBody}
                        ></Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </Col>

              {showResults === "true" ? (
                <Col sm={9} className={styles.clientDetails}>
                  <Setting
                    currentAssesment={currentAssesment}
                    setLoader={setLoader}
                    setCurrentAssesment={setCurrentAssesment}
                  />{" "}
                </Col>
              ) : (
                <>
                  {activeStep === 0 && (
                    // <Col
                    //   sm={9}
                    //   className={styles.clientDetails}
                    //   id="asssesmentsRight"
                    // >
                    <Col
                      sm={isFullWidth ? 12 : 9}
                      className="p-0"
                    >
                    <div className={`${styles.nonfullScreenParent} ${isFullWidth ? '' : styles.withTransform}`}>
                    <div className={`${styles.toggleButton} ${styles.iconContainer}`} onClick={toggleFullWidth}>
                      {/* <FontAwesomeIcon icon={isFullWidth ? faCompressAlt : faExpandAlt} /> */}
                      <FontAwesomeIcon
                        icon={isFullWidth ? faCompressAlt : faExpandAlt}
                        title={isFullWidth ? 'Collapse' : 'Expand'}
                      />
                      </div>
                      <div className="content">
                        <Landingtab
                          currentAssesment={currentAssesment}
                          formData={formData}
                          // setLoader={setLoader}
                          // loader={loader}
                          setFormData={setFormData}
                        />
                        </div>
                      </div>
                    </Col>
                  )}

                  {activeStep === 1 && (
                    <Col
                      sm={9}
                      className={styles.clientDetails}
                      id="asssesmentsRight"
                    >
                      <Questionstab
                        updateQuestionTostate={updateQuestionTostate}
                        setCurrentAssesment={setCurrentAssesment}
                        rows={rows}
                        setRows={setRows}
                        setCurrentQuestion={setCurrentQuestion}
                        ratingBand={ratingBand}
                        currentAssesment={currentAssesment}
                        currentQuestion={currentQuestion}
                        getSingleQuestion={getSingleQuestion}
                        setLoader={setLoader}
                        getData={getData}
                        handleQuestionRemove={handleQuestionRemove}
                      />
                    </Col>
                  )}

                  {activeStep === 2 && (
                    <Col
                      sm={9}
                      className={styles.clientDetails}
                      id="asssesmentsRight"
                    >
                      {currentAssesment.m_nAssessmentType == 3 && (
                        <Resulttab
                          currentAssesment={currentAssesment}
                          formData={formData}
                          setFormData={setFormData}
                          setCurrentAssesment={setCurrentAssesment}
                        />
                      )}

                      {currentAssesment.m_nAssessmentType != 3 && (
                        <div className={styless.settingmiantabs}>
                          <Tabs
                            defaultActiveKey="result"
                            id="uncontrolled-tab-example"
                            className={styless.customnavbarUl}
                          >
                            <Tab
                              eventKey="result"
                              className={styless.customnavbarUl}
                              title="Results"
                            >
                              <Resulttab
                                currentAssesment={currentAssesment}
                                formData={formData}
                                setFormData={setFormData}
                                setCurrentAssesment={setCurrentAssesment}
                              />
                            </Tab>

                            <Tab eventKey="ratingBands" title="Rating Bands">
                              <Ratingbands
                                currentAssesment={currentAssesment}
                                setLoader={setLoader}
                                setCurrentAssesment={setCurrentAssesment}
                              />
                            </Tab>
                          </Tabs>
                        </div>
                      )}
                    </Col>
                  )}
                  {activeStep === 3 && (
                    <Col
                      sm={9}
                      className={styles.clientDetails_none}
                      id="asssesmentsRight"
                    >
                      <EmailCaptureAdmin
                        currentAssesment={currentAssesment}
                        formData={formData}
                        setFormData={setFormData}
                      />
                    </Col>
                  )}

                  {activeStep === 4 && (
                    <GoLive
                      currentAssesment={currentAssesment}
                      iframeQuestionUrl={iframeQuestionUrl}
                      iframeAssesmentUrl={iframeAssesmentUrl}
                      iframeRegUrl={iframeRegUrl}
                    />
                  )}
                </>
              )}
            </Row>
          </Container>
         
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AssesmentPage;
