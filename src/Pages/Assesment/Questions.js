import React, { useEffect, useRef, useState } from "react";
import styles from "./assesment.module.css";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import question_images from "../../assets/images/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { functionService } from "../../Context/functions";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useAuthState } from "../../Context";
import AddNewOptionRC from "./AddNewOptionRC";
import QuestionFeedback from "./questionFeedback";
import ImageUploader from "../../Components/ImageUploader";
import Toaster from "../../Components/Toaster";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dimensions from "../Settings/Dimensions";
import styless from "../Settings/settingstyle.module.css";
import TextEditor from "../../Components/TextEditor";

function Questionstab(props) {
  const params = useParams();
  const [optionData, setOptionData] = useState([]);
  const [questFormData, setQuestFormData] = useState({
    question_id: 0,
    question_display_type: 1,
  });
  const [questSubText, setQuestSubText] = useState({
    question_id: 0,
    question_display_type: 1,
  });

  const userDetails = useAuthState();
  const [toastmessage, settoastMessage] = useState("Updation Failed!!");
  const [succmessage, setSuccMessage] = useState("Successfully Updated!!");

  const handleCloseFeedback = () => setShowfeedback(false);
  const handleShowFeedback = () => setShowfeedback(true);
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [showfeedback, setShowfeedback] = useState(false);
  const [questionType, setQuestionType] = useState(
    questFormData.question_display_type
  );
  //console.log("type of question", questFormData.question_display_type);

  const [showUpadteBtn, setShowUpdateBtn] = useState(false);
  const [optionOrder, setOptionOrder] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState([]);

  const [message] = useState("");
  const rangesliderelements = (e) => {
    return e();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [options, setOptions] = useState([]);

  const multiselectmapstyle = {
    color: "red",
    border: "none",
  };
  // const removeSingleQuestion = async(question_id)=>{
  // 	props.setLoader(true);
  // 	let res = await functionService.post('Question/removeQuestion',{"lAssessmentId": params.id,"lQuestionId":question_id});
  // 	if(res.status === true){
  // 		props.getData();
  // 		handleClose();
  // 		setSuccMessage("Successfully Removed!!");
  // 		setShowToast(true);
  // 	}else {
  // 		if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
  // 			localStorage.removeItem('currentUser');
  // 			localStorage.removeItem('token');
  // 			window.location = "/login";
  // 			return;
  // 		  }else{
  // 			settoastMessage("Some Error Occured!!");
  // 			setShowToast1(true);
  // 		  }
  // 	}
  // 	props.setLoader(false);
  // }

  const removeSingleQuestion = async (question_id) => {
    props.setLoader(true);
    let res = await functionService.post("Question/removeQuestion", {
      lAssessmentId: params.id,
      lQuestionId: question_id,
    });
    if (res.status === true) {
      // props.getData();
      props.handleQuestionRemove(question_id);
      handleClose();
      setSuccMessage("Successfully Removed!!");
      setShowToast(true);
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
        settoastMessage("Some Error Occured!!");
        setShowToast1(true);
      }
    }
    props.setLoader(false);
  };

  const handleQuestiontype = async (e) => {
    let val = e.target.value;
    setQuestionType(val);

    var res = await functionService.post("Question/updateQuestionType", {
      lAssessmentId: params.id,
      lQuestionId: props.currentQuestion.m_lQuestionId,
      nQuestionType: val,
    });
    //console.log("res.updatequestiontype", res);
    setQuestFormData({ ...questFormData, m_nQuestionDisplayType: val });
   

    // manish - set the updated question returned from API back into the props
    if (res.data.status === 200) {

      setShowToast(true);

      //handleUpdateQuestion2(res);

      var assessment = props.currentAssesment;
      let question = assessment.m_dictQuestions[props.currentQuestion.m_lQuestionId];
      question.m_nQuestionDisplayType = val;
      assessment.m_dictQuestions[props.currentQuestion.m_lQuestionId] = question;
      props.setCurrentAssesment(assessment);


      // var assessment = props.currentAssesment;
      // let question = JSON.parse(res.data.data.result);
      // assessment.m_dictQuestions[questFormData.m_lQuestionId] = question;
      // props.setCurrentAssesment(assessment);
      // props.getSingleQuestion(question.m_lQuestionId);
    } else {
      settoastMessage(res.data.data.result);
      setShowToast1(true);
    }
    // end manish
  };

  const setInitialValues = () => {
    if (props.currentQuestion) {
      let curr_point = 0;
      let dataBand = Object.keys(props.ratingBand);
      if (dataBand.length > 0) {
        dataBand.forEach((element) => {
          if (props.ratingBand[element].m_sMappedPoints > 0) {
            curr_point++;
          }
        });
      }
      if (props.currentQuestion.m_dictCustomizations) {
        props.currentQuestion.m_dictCustomizations[3] = curr_point + "";
      }
      if (
        props.currentQuestion.m_dictCustomizations &&
        !props.currentQuestion.m_dictCustomizations.hasOwnProperty(1)
      ) {
        props.currentQuestion.m_dictCustomizations[1] = "";
      }
      setQuestFormData(props.currentQuestion);
      // if (
      //   props.currentAssesment &&
      //   props.currentAssesment.m_nAssessmentType === 3
      // ) {
      //   setQuestionType("6");
      // } else {
        setQuestionType(props.currentQuestion.m_nQuestionDisplayType + "");
      // }
    }

    if (props.currentQuestion) {
      setOptionData(props.currentQuestion.m_listResponseOptions);
    }

    let dataOptions = [];
    let selectArr = [];
    if (Object.keys(props.currentAssesment).length > 0) {
      Object.keys(props.currentAssesment.m_dictDimensions).forEach(function (
        i
      ) {
        dataOptions.push({
          key: props.currentAssesment.m_dictDimensions[i].m_szDimensionName,
          val: props.currentAssesment.m_dictDimensions[i].m_lDimensionId,
        });
        if (
          props.currentQuestion.m_listDimensions &&
          props.currentQuestion.m_listDimensions.includes(
            props.currentAssesment.m_dictDimensions[i].m_lDimensionId
          )
        ) {
          selectArr.push({
            key: props.currentAssesment.m_dictDimensions[i].m_szDimensionName,
            val: props.currentAssesment.m_dictDimensions[i].m_lDimensionId,
          });
        }
      });

      setOptions(dataOptions);
      if (selectArr.length > 0) {
        setSelectedMapping(selectArr);
      } else {
        setSelectedMapping([]);
      }
    } else {
      setSelectedMapping([]);
    }
  };

  useEffect(() => {
    setInitialValues();
  }, [props.currentQuestion, props.currentAssesment]);

  const handleOptionVal = (val, index) => {
    let array = [...props.currentQuestion.m_listResponseOptions];
    array[index].m_szResponseText = val;
    setOptionData(array);
  };

  const handleResponseImageUpdate = (id, oMedia) => {
    let array = [...props.currentQuestion.m_listResponseOptions];

    let updatedOption = array.find((option) => option.m_lResponseId === id);
    updatedOption.m_oMedia = oMedia;
    setOptionData([...array]);
  };

  const handleAddNew = async () => {
    let array = [...optionData];
    array.push({
      m_lResponseId: 0,
      m_szResponseText: "",
      m_szResponseSubText: "",
    });
    setOptionData(array);
  };
  const deleteOption = async (e, index, obj = {}) => {
    e.preventDefault();
    var res = await functionService.post(
      "Question/removeResponseOption",

      {
        assessmentId: params.id,
        userId: userDetails.id,
        lResponseId: obj.m_lResponseId,
        lQuestionId: props.currentQuestion.m_lQuestionId,
      }
    );
    let array = [];
    optionData.forEach((element, itemIndex) => {
      if (index !== itemIndex) {
        array.push(element);
      }
    });
    setOptionData(array);

    // manish - set the updated question returned from API back into the props

    if (res.data.status === 200) {
      setShowToast(true);
      handleUpdateQuestion2(res);
      // var assessment = props.currentAssesment;
      // console.log("updated question", res);

      // let question = JSON.parse(res.data.data.result);
      // assessment.m_dictQuestions[questFormData.m_lQuestionId] = question;
      // props.setCurrentAssesment(assessment);
      // props.getSingleQuestion(question.m_lQuestionId);
      // end manish
    } else {
      settoastMessage(res.data.data.result);
      setShowToast1(true);
    }
  };

  const handleUpdateQuestion = (qstId, qstText, qstSubText) => {
    let curr_index = 0;
    if (props.rows.length > 0) {
      props.rows.forEach((element, index) => {
        if (element.m_lQuestionId === qstId) {
          curr_index = index;
        }
      });
      let array = [...props.rows];
      array[curr_index].m_szQuestionText = qstText;
      array[curr_index].m_szQuestionSubText = qstSubText; // manish - added
      props.setRows(array);
    }
  };

  // manish placeholder
  const handleUpdateQuestion2 = (res) => {
    var assessment = props.currentAssesment;
    let question = JSON.parse(res.data.data.result);
    assessment.m_dictQuestions[questFormData.m_lQuestionId] = question;
    props.setCurrentAssesment(assessment);
    props.getSingleQuestion(question.m_lQuestionId);
  };

  const handleImageUpdate = (qId, oMedia) => {
    var assessment = props.currentAssesment;
    assessment.m_dictQuestions[qId].m_oMedia = oMedia;
    props.setCurrentAssesment(assessment);
    props.getSingleQuestion(qId);
  };

  /*const handleUpdateQuestioninCategoryList = (question) => {


}*/

  const handleSaveQuestion = (e, qstKey) => {
    setQuestFormData({ ...questFormData, [qstKey]: e.target.value });
    setShowUpdateBtn(true);
  };

  const handleTextData = (val) => {
    // val.preventDefault()
    let dataArray = { ...questFormData };
    if (Object.keys(dataArray).length > 0) {
      setQuestSubText({ ...questFormData, ["m_szQuestionSubText"]: val });
    }

    setShowUpdateBtn(true);

    // let dataArray = { ...currentAssesment };
    // if (Object.keys(dataArray).length > 0) {
    //   //dataArray['m_szSurveyDesc'] = val.toString();
    //   //setCurrentAssesment(dataArray);
    //   setFormData({ ...formData, toolDesc: val });
    // }
  };



  const handleUpdateQuestionNameDesc = async (mappingArr = []) => {
    
    props.setLoader(true);

    if(questSubText.m_szQuestionSubText) 
      questFormData.m_szQuestionSubText = questSubText.m_szQuestionSubText

    let res = await functionService.post("Question/saveQuestionNameDesc", {
      assessmentId: params.id,
      userId: userDetails.id,
      lQuestionId: questFormData.m_lQuestionId,
      szQuestionText: questFormData.m_szQuestionText,
      szQuestionDesc: questFormData.m_szQuestionSubText
    });
    if (res.status === true) {
      setShowToast(true);

      // updates the question text on the left hand side list of questions
      handleUpdateQuestion(
        questFormData.m_lQuestionId,
        questFormData.m_szQuestionText,
        questFormData.m_szQuestionSubText
      );

      //handleUpdateQuestion2(res);

      var assessment = props.currentAssesment;
      let question = assessment.m_dictQuestions[props.currentQuestion.m_lQuestionId];
      question.m_szQuestionText = questFormData.m_szQuestionText;
      question.m_szQuestionSubText = questFormData.m_szQuestionSubText;
      assessment.m_dictQuestions[props.currentQuestion.m_lQuestionId] = question;
      props.setCurrentAssesment(assessment);

    } else {
      if (res.hasOwnProperty("data")) {
        settoastMessage(res.data.data.result);
      }
      setShowToast1(true);
    }
    //setQuestFormData({...questFormData,[qstKey]:e.target.value})
    setShowUpdateBtn(false);
    props.setLoader(false);
  };


  const handleUpdateHeading = async (mappingArr = []) => {
    props.setLoader(true);

    let res = await functionService.post("Question/saveQuestion", {
      assessmentId: params.id,
      userId: userDetails.id,
      lQuestionId: questFormData.m_lQuestionId,
      szQuestionText: questFormData.m_szQuestionText,
      szQuestionDesc: questFormData.m_szQuestionSubText,
      nQuestionWeight: questFormData.m_nQuestionWeight,
      nQuestionType: questFormData.m_nQuestionDisplayType,
      listDimensions:
        mappingArr.length > 0 ? mappingArr : questFormData.m_listDimensions,
      dictCustomizations: questFormData.m_dictCustomizations,
    });
    if (res.status === true) {
      setShowToast(true);

      // updates the question text on the left hand side list of questions
      handleUpdateQuestion(
        questFormData.m_lQuestionId,
        questFormData.m_szQuestionText,
        questFormData.m_szQuestionSubText,
        questSubText.m_szQuestionSubText
      );

      // manish - set the updated question returned from API back into the props

      handleUpdateQuestion2(res);

      //   var assessment = props.currentAssesment;
      //   //console.log("updated question", res.data.data.result);
      //   let question = JSON.parse(res.data.data.result);
      //   assessment.m_dictQuestions[questFormData.m_lQuestionId] = question;
      //   props.setCurrentAssesment(assessment);
      //   props.getSingleQuestion(question.m_lQuestionId);
      // end manish

      //props.getData();
    } else {
      if (res.hasOwnProperty("data")) {
        settoastMessage(res.data.data.result);
      }
      setShowToast1(true);
    }
    //setQuestFormData({...questFormData,[qstKey]:e.target.value})
    setShowUpdateBtn(false);
    props.setLoader(false);
  };
  const handleSaveOption = async (optionFormData) => {
    props.setLoader(true);
    if (optionFormData && optionFormData.hasOwnProperty("mapBands")) {
      if (optionFormData["mapBands"].length === 0) {
        settoastMessage("Please fill Response Text and Assigned Points");
        setShowToast1(true);
        return;
      }
    }

    let res = await functionService.post(
      "Question/saveQuestionResponseOption",
      optionFormData
    );

    if (res.data.status === 200) {
      setShowToast(true);

      // manish - set the updated question returned from API back into the props

      handleUpdateQuestion2(res);

      //   var assessment = props.currentAssesment;
      //   let question = JSON.parse(res.data.data.result);
      //   assessment.m_dictQuestions[questFormData.m_lQuestionId] = question;
      //   props.setCurrentAssesment(assessment);
      //   props.setCurrentQuestion(question.m_lQuestionId);
      // end manish
    } else {
      settoastMessage(res.data.data.result);
      setShowToast1(true);
    }
    props.getSingleQuestion(props.currentQuestion.m_lQuestionId);
    props.setLoader(false);
  };
  const handleSliderOption = (value, key) => {
    let array = { ...questFormData };
    array.m_dictCustomizations[key] = value;
    setQuestFormData(array);
  };
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...optionData];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setOptionData(copyListItems);
    setOptionOrder(true);
  };

  const handleUpdateOrder = async () => {
    let orderData = {
      lAssessmentId: params.id,
      lQuestionId: props.currentQuestion.m_lQuestionId,
      mapNewOrder: {},
    };

    optionData.forEach((element, index) => {
      orderData["mapNewOrder"][element.m_lResponseId] = index;
    });

    let res = await functionService.post(
      "Question/reorderResponseOptions",
      orderData
    );
    
    if (res && res.data.status === 200) {
      setShowToast(true);
      setSuccMessage("Successfully updated");
      props.setCurrentAssesment({
        ...props.currentAssesment,
        m_nPublishStatus: 3,
      });
    }
    setOptionOrder(false);
  };

  return (
    <div className={styless.settingmiantabs}>
      <Tabs
        defaultActiveKey="question"
        id="uncontrolled-tab-example"
        className={styless.customnavbarUl}
      >
        <Tab
          eventKey="question"
          className={styless.customnavbarUl}
          title="Questions"
        >
          <div className={styles.questionSection}>
            <div className={styles.marginAuto}>
              {props.rows && props.rows.length === 0 ? (
                <div className={styles.noquestion_msg}>
                  <p>
                    "No questions so far. Click Add Question to get started."
                  </p>
                </div>
              ) : (
                <>
                  <form>
                    <div className={styles.question}>
                      <div className={styles.inputquestionheadingBox}>
                        <input
                          type="text"
                          placeholder="Enter your title"
                          className={styles.inputquestionheading}
                          onChange={(e) => {
                            handleSaveQuestion(e, "m_szQuestionText");
                          }}
                          value={
                            questFormData &&
                            typeof questFormData.m_szQuestionText !==
                              "undefined"
                              ? questFormData.m_szQuestionText
                              : ""
                          }
                        />
                        {showUpadteBtn && (
                          <>
                            <span
                              className={styles.updateshowIcon}
                              onClick={handleUpdateQuestionNameDesc}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={styles.updatecloseIcon}
                              onClick={() => setShowUpdateBtn(false)}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </>
                        )}
                      </div>
                      <div className={styles.questiondatabox}>
                        <div className={styles.left_partquestion}>
                          <img
                            src={
                              functionService.awsBucketImage(
                                props.currentQuestion &&
                                  props.currentQuestion.m_oMedia
                              ) !== false
                                ? functionService.awsBucketImage(
                                    props.currentQuestion &&
                                      props.currentQuestion.m_oMedia
                                  )
                                : question_images
                            }
                            alt={questFormData.m_szQuestionText}
                          />
                          <div className={styles.deletImage}>
                            {" "}
                            <FontAwesomeIcon icon={faTrashAlt} />{" "}
                          </div>
                          <div className={styles.editIconbox}>
                            <div className={styles.editImage}>
                              {" "}
                              <FontAwesomeIcon icon={faPencilAlt} />
                            </div>
                            {/* <input type="file" className={styles.editImagechoose}/> */}
                            <div className={styles.editImagechoose}>
                              <ImageUploader
                                setCurrentObject={props.setCurrentQuestion}
                                setCurrentData={props.currentQuestion}
                                nPurpose={3}
                                lPurposeId={
                                  props.currentQuestion &&
                                  props.currentQuestion.m_lQuestionId
                                }
                                label={"Upload/change"}
                                handleImageUpdate={handleImageUpdate}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={styles.right_partquestion}>
                          <Form.Group
                            className={styles.inputquestionsubheading}
                            controlId="exampleForm.ControlInput3"
                          >
                            <TextEditor
                              height={150}
                              datas={
                                questFormData &&
                                typeof questFormData.m_szQuestionSubText !==
                                  "undefined"
                                  ? questFormData.m_szQuestionSubText
                                  : ""
                              }
                              formData={""}
                              // setFormData={setFormData}
                              handleTextData={handleTextData}
                              dataKey="szQuestionSubDesc"
                            />
                          </Form.Group>

                          {/* <textarea
                            type="text"
                            style={{border:"1px solid red"}}
                            placeholder="(optional) More details"
                            className={styles.inputquestionsubheading}
                            onChange={(e) => {
                              handleSaveQuestion(e, "m_szQuestionSubText");
                            }}
                            value={
                              questFormData &&
                              typeof questFormData.m_szQuestionSubText !==
                                "undefined"
                                ? questFormData.m_szQuestionSubText
                                : ""
                            }
                          /> */}
                          {/* {alert('question type', questionType)} */}
                          <div className={styles.onpagetext}>
                            <div className={styles.dropdown_seo}>
                              <Form.Group
                                controlId="formGridState"
                                className={styles.question_type}
                              >
                                <Form.Select
                                  className={styles.selectfont}
                                  onChange={handleQuestiontype}
                                  value={questionType}
                                >
                                  {props.currentAssesment &&
                                    props.currentAssesment.m_nAssessmentType !==
                                      3 && (
                                      <>
                                        {" "}
                                        <option value="1">Checkbox</option>
                                        <option value="3">Radio</option>
                                        <option value="7">Text Input</option>
                                        <option value="8">
                                          Information{" "}
                                        </option>
                                      </>
                                    )}
                                  {props.currentAssesment &&
                                    props.currentAssesment.m_nAssessmentType !==
                                      1 &&
                                      ( <> {" "}
                                      <option value="6">Slider</option>
                                      <option value="7">Text Input</option>
                                      <option value="8">Information</option>
                                      {" "}
                                        </>
                                      )}

                                      

                                  {/* <option value="imagequestion">Image question</option> */}
                                </Form.Select>
                              </Form.Group>
                              {props.currentAssesment &&
                                props.currentAssesment.m_nAssessmentType !==
                                  1 && (
                                  <div className={styles.feedback_question}>
                                    <p onClick={handleShowFeedback}>
                                      Feedback Texts
                                      <FontAwesomeIcon icon={faPencilAlt} />
                                    </p>
                                  </div>
                                )}

                              <div className={styles.question_maping}>
                                {/* <Select options={options} isMulti /> */}
                                <Multiselect
                                  options={options}
                                  displayValue="key"
                                  showCheckbox={true}
                                  placeholder="Mapped Dimensions"
                                  selectedValues={selectedMapping}
                                  style={multiselectmapstyle}
                                  onSelect={(selectedArgs) => {
                                    let arr = [];
                                    let mappingArr = [];
                                    Object.keys(selectedArgs).forEach(function (
                                      i
                                    ) {
                                      arr.push(selectedArgs[i].val);
                                      mappingArr.push({
                                        key: selectedArgs[i].key,
                                        val: selectedArgs[i].val,
                                      });
                                    });
                                    handleUpdateHeading(arr);
                                    setSelectedMapping(mappingArr);
                                  }}
                                  //showArrow = {true}
                                />
                              </div>
                            </div>

                            {/* --------Feedback drawer-------- */}

                            <QuestionFeedback
                              updateQuestionTostate={
                                props.updateQuestionTostate
                              }
                              handleClose={handleCloseFeedback}
                              setLoader={props.setLoader}
                              showfeedback={showfeedback}
                              currentQuestion={props.currentQuestion}
                            />

                            {(questionType === "1" ||
                              questionType === "3" ||
                              questionType === "5") && (
                              <>
                                <div className={styles.checboxselectedques}>
                                  {["checkbox"].map((type) => (
                                    <div
                                      key={`inline-${type}`}
                                      className={styles.checkboxQuestion}
                                    >
                                      {optionData &&
                                        optionData.map((obj, index) => (
                                          <AddNewOptionRC
                                            key={index}
                                            dragStart={dragStart}
                                            dragEnter={dragEnter}
                                            drop={drop}
                                            currentAssesment={
                                              props.currentAssesment
                                            }
                                            ratingBand={props.ratingBand}
                                            handleSaveOption={handleSaveOption}
                                            questionId={
                                              props.currentQuestion
                                                .m_lQuestionId
                                            }
                                            userid={userDetails.id}
                                            index={index}
                                            obj={obj}
                                            questionType={questionType}
                                            type={type}
                                            handleOptionVal={handleOptionVal}
                                            handleResponseImageUpdate={
                                              handleResponseImageUpdate
                                            }
                                            optionData={optionData}
                                            handleAddNew={handleAddNew}
                                            deleteOption={deleteOption}
                                          />
                                          // key={index}
                                        ))}
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    className={styles.btnaddoptions}
                                    onClick={handleAddNew}
                                  >
                                    Add Option
                                  </button>

                                  {optionOrder && (
                                    <button
                                      type="button"
                                      className={styles.btnaddoptions}
                                      onClick={handleUpdateOrder}
                                    >
                                      Update Order
                                    </button>
                                  )}
                                </div>
                              </>
                            )}

                            {questionType === "6" && (
                              <>
                                <div className={styles.slidersection}>
                                  {["Slider"].map((type) => (
                                    <div
                                      key={`inline-${type}`}
                                      className={styles.questionSliders}
                                    >
                                      <div className={styles.sliderQuestion}>
                                        {/* <p className = {styles.lessmore}>(Less to More)</p> */}
                                        <input
                                          type="text"
                                          className={styles.lessandmoretext}
                                          placeholder="(Less to More)"
                                          value={
                                            questFormData &&
                                            questFormData.m_dictCustomizations
                                              ? questFormData
                                                  .m_dictCustomizations[1]
                                              : ""
                                          }
                                          onChange={(e) =>
                                            handleSliderOption(
                                              e.target.value,
                                              1
                                            )
                                          }
                                        />
                                        <div className={styles.sliderr}>
                                          {props.currentAssesment &&
                                          props.currentAssesment
                                            .m_nAssessmentType === 3 ? (
                                            <>
                                              {questFormData &&
                                              questFormData
                                                .m_dictCustomizations[3] <
                                                10 ? (
                                                <>
                                                  <ul>
                                                    {rangesliderelements(() => {
                                                      const row = [];
                                                      for (
                                                        var i = 0;
                                                        i <
                                                        (questFormData &&
                                                          questFormData.m_dictCustomizations &&
                                                          questFormData
                                                            .m_dictCustomizations[3]);
                                                        i++
                                                      ) {
                                                        row.push(
                                                          <li key={i}></li>
                                                        );
                                                      }
                                                      return row;
                                                    })}
                                                  </ul>
                                                </>
                                              ) : (
                                                <ul
                                                  className={
                                                    styles.morequestionss
                                                  }
                                                >
                                                  {rangesliderelements(() => {
                                                    const row = [];
                                                    for (
                                                      var i = 0;
                                                      i <
                                                      (questFormData &&
                                                        questFormData.m_dictCustomizations &&
                                                        questFormData
                                                          .m_dictCustomizations[3]);
                                                      i++
                                                    ) {
                                                      row.push(
                                                        <li key={i}>
                                                          {" "}
                                                          {i + 1}{" "}
                                                        </li>
                                                      );
                                                    }
                                                    return row;
                                                  })}
                                                </ul>
                                              )}{" "}
                                            </>
                                          ) : (
                                            <ul>
                                              {rangesliderelements(() => {
                                                const row = [];
                                                for (
                                                  var i = 0;
                                                  i <
                                                  (questFormData &&
                                                    questFormData.m_dictCustomizations &&
                                                    questFormData
                                                      .m_dictCustomizations[3]);
                                                  i++
                                                ) {
                                                  row.push(<li key={i}></li>);
                                                }
                                                return row;
                                              })}
                                            </ul>
                                          )}
                                        </div>
                                      </div>

                                      {/*<Form.Group controlId="formGridState" className={styles.countslider}>
							<Form.Label>Number of slider level</Form.Label>
							 <Form.Select  className={styles.selectfont} value={(questFormData && questFormData.m_dictCustomizations) && questFormData.m_dictCustomizations[3]}  onChange={(e)=>{setSliderRange(e.target.value);handleSliderOption(e.target.value,3)}}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							 </Form.Select>
						   </Form.Group> */}

                                      <div className={styles.slidercheck}>
                                        <Form.Check
                                          className={styles.input}
                                          inline
                                          name="group1"
                                          type="checkbox"
                                          id=""
                                          checked={
                                            questFormData &&
                                            questFormData.m_dictCustomizations &&
                                            questFormData
                                              .m_dictCustomizations[2] ===
                                              "true"
                                              ? true
                                              : false
                                          }
                                          value={
                                            questFormData &&
                                            questFormData.m_dictCustomizations &&
                                            questFormData
                                              .m_dictCustomizations[2]
                                          }
                                          onChange={(e) => {
                                            handleSliderOption(
                                              e.target.checked.toString(),
                                              2
                                            );
                                          }}
                                        />
                                        <p>Reverse slider</p>
                                      </div>
                                      <div className="text-center">
                                        <Button
                                          type="button"
                                          className={styles.btnaddoptions}
                                          onClick={handleUpdateHeading}
                                        >
                                          Save
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                            {questionType === "7" && (
                              <>
                                <div className={styles.slidersection}>
                                  <textarea
                                    className="form-control"
                                    placeholder="Please enter your response"
                                    name=""
                                    id=""
                                    cols="40"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </>
                            )}
                            {questionType === "8" && (
                              <>
                                <div className={styles.slidersection}>
                                  <p></p>
                                </div>
                              </>
                            )}

                            {/* {questionType === "imagequestion" && (
                              <>
                                <div className={styles.imageSection}>
                                  <div className={styles.imageQuestions}>
                                    <div className={styles.questionimage}>
                                      <img src={answer_img} alt="answer_img" />
                                      <div className={styles.editDeleticon1}>
                                        <Link
                                          to="/"
                                          className={styles.deletIcon}
                                        >
                                          {" "}
                                          <FontAwesomeIcon
                                            icon={faTrashAlt}
                                          />{" "}
                                        </Link>
                                      </div>
                                    </div>
                                    <p>Ans Option 1 </p>
                                  </div>
                                  <div className={styles.imageQuestions}>
                                    <div className={styles.questionimage}>
                                      <img src={answer_img1} alt="answer_img" />

                                      <div className={styles.editDeleticon1}>
                                        <Link
                                          to="/"
                                          className={styles.deletIcon}
                                        >
                                          {" "}
                                          <FontAwesomeIcon
                                            icon={faTrashAlt}
                                          />{" "}
                                        </Link>
                                      </div>
                                    </div>
                                    <p>Ans Option 2 </p>
                                  </div>
                                  <div className={styles.imageQuestions}>
                                    <div className={styles.questionimage}>
                                      <img src={answer_img2} alt="answer_img" />

                                      <div className={styles.editDeleticon1}>
                                        <Link
                                          to="/"
                                          className={styles.deletIcon}
                                        >
                                          {" "}
                                          <FontAwesomeIcon
                                            icon={faTrashAlt}
                                          />{" "}
                                        </Link>
                                      </div>
                                    </div>
                                    <p>Ans Option 3 </p>
                                  </div>
                                </div>
                              </>
                            )} */}

                            <div className="text-center mt-3 mb-3">
                              {/* { ((questionType === "1" || questionType === "3"  || questionType === "5") && optionData.length === 0) &&
						   <button className={styles.addOptions} type="button"  onClick={handleAddNew}>Add Options</button>
					  } */}
                            </div>
                          </div>

                          <div className={styles.paginationQuestion}>
                            {message && (
                              <p
                                className={styles.updatedquestion_successfully}
                              >
                                {message}
                              </p>
                            )}
                            <ul>
                              <li>
                                <Link
                                  to="#"
                                  className="btn btn-deletequestion"
                                  onClick={() => setShow(true)}
                                >
                                  Delete Question
                                </Link>
                              </li>
                              {/* <li><Link to="#" className="btn btn-deletequestion" onClick={handleShow}>Delete</Link></li>
									   <li>to</li>
									   <li><Link to="#">2</Link></li> */}
                              {/* <li className={styles.pagination}> <FontAwesomeIcon icon={faArrowRight} /></li> */}
                            </ul>
                          </div>

                          <Modal show={show} onHide={handleClose}>
                            {/* <Modal.Header closeButton>
									<Modal.Title>Modal heading</Modal.Title>
									</Modal.Header> */}

                            <Modal.Body className={styles.textcenter}>
                              <div className={styles.modelbody_deletepopup}>
                                <h2>Are you sure?</h2>
                                <p>Do you want to delete this Question ?</p>

                                <div className={styles.modelbody_button_main}>
                                  <Button variant="light" onClick={handleClose}>
                                    Close
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => {
                                      removeSingleQuestion(
                                        questFormData.m_lQuestionId
                                      );
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>

            <Toaster
              showtoast={showtoast}
              toggleShowToast={toggleShowToast}
              bgclass="success"
              status="Success"
              message={succmessage}
              toasticon={faCheckCircle}
            />
            <Toaster
              showtoast={showtoast1}
              toggleShowToast={toggleShowToast1}
              bgclass="danger"
              status="Error"
              message={toastmessage}
              toasticon={faBan}
            />
          </div>
        </Tab>
        <Tab eventKey="dimensions" title="Dimensions">
          <Dimensions
            setLoader={props.setLoader}
            currentAssesment={props.currentAssesment}
            setCurrentAssesment={props.setCurrentAssesment}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Questionstab;
