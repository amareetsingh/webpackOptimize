import React, { useEffect, useState } from "react";
import styles from "./settingstyle.module.css";
import { useParams } from "react-router-dom";
import SketchColorPicker from "../Assesment/Sketch";
import { functionService } from "../../Context/functions";
import Toaster from "../../Components/Toaster";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Colors(props) {
  //console.log('assessment', props.currentAssesment) ;
  const params = useParams();
  const [ratingBand, setRatingBand] = useState({});
  const [dimList, setDimList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [message, setMessage] = useState("Some error occurs!");
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  let defaultColor = {
    lAssessmentId: params.id,
    lUserId: 0,
    dictColors1: {},
    dictColors: {},
  };
  const [formData, setFormData] = useState(defaultColor);
  const [disabled, setDisabled] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const setDefaultData = async () => {
    if (props.currentAssesment !== undefined) {
      let listItem = props.currentAssesment.m_oRatingScalesGroup
        ? props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales
        : [];

      listItem &&
        Object.keys(listItem).forEach(function (element) {
          if (listItem[element].m_nIsScoringBand === 0 && showTitle === false) {
            setShowTitle(true);
          }
        });     
      if (props.currentAssesment.m_oRatingScalesGroup) {
        setRatingBand(
          props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales
        );
      }
      let dataArray = { ...formData };
      dataArray["dictColors"] =
        props.currentAssesment.m_oColorScheme.m_dictColors;
      dataArray["dictColors1"] =
        props.currentAssesment.m_oColorScheme.m_dictColors1;
      setFormData(dataArray);
      
    }
  };

  // const getColorAllRatingBand = async () => {
  //     let res = await functionService.post('RatingBands/getAssessmentBands',{
  //         "assessmentId": params.id,
  //         "userId": 0
  //       });
  //     if(res !== false && res.status !== false){
  //         let data = JSON.parse(res.data.data.result);
  //     //    console.log('Rating Band',data);
  //        let listItem = data['m_oRatingScalesGroup']['m_dictRatingScales'];

  //         listItem && Object.keys(listItem).forEach(function(element){
  //             if(listItem[element].m_nIsScoringBand === 0 && showTitle === false){
  //                 setShowTitle(true);
  //             }
  //         })
  //        setRatingBand(data['m_oRatingScalesGroup']['m_dictRatingScales']);
  //     }else{
  //         if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
  // 			localStorage.removeItem('currentUser');
  // 			localStorage.removeItem('token');
  // 			window.location = "/login";
  // 			return;
  // 		  }
  //     }
  //  }
  const getColorAllDim = async () => {
    /*let res = await functionService.post("Dimensions/getDimensions", {
      assessmentId: params.id,
    });
    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        setDimList(JSON.parse(res.data.data.result));
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
      
    
      }*/
      setDimList(Object.values(props.currentAssesment.m_dictDimensions));

    };
  const getColorAllQuestion = async () => {
    /*let res = await functionService.post("Question/getQuestionsList", {
      assessmentId: params.id,
    });
    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        //console.log("questionList",JSON.parse(res.data.data.result))
        setQuestionList(JSON.parse(res.data.data.result).m_listSurveyQuestions);
      }
    }*/
    setQuestionList(Object.values(props.currentAssesment.m_dictQuestions));

  };
  const getAllColors = async () => {
    /*let res = await functionService.post("Colors/getAssessmentColors", {
      assessmentId: params.id,
      userId: 0,
    });
    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        let result = JSON.parse(res.data.data.result);
        // console.log("result",result)
        let dataArray = { ...formData };
        dataArray["dictColors"] = result.m_oColorScheme.m_dictColors;
        dataArray["dictColors1"] = result.m_oColorScheme.m_dictColors1;
        setFormData(dataArray);
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
    }*/
    let dataArray = { ...formData };
        dataArray["dictColors"] = props.currentAssesment.m_oColorScheme.m_dictColors;
        dataArray["dictColors1"] =props.currentAssesment.m_oColorScheme.m_dictColors1;
        setFormData(dataArray);
  };

  useEffect(() => {
    setDefaultData();
    getColorAllQuestion();
    // getColorAllRatingBand();
    getColorAllDim();
    getAllColors();
  }, [params]);

  const handleColor = (val, key, type = "normal") => {
    //alert("val" + val);
    props.setCurrentAssesment({
      ...props.currentAssesment,
      m_nPublishStatus: 3,
    });
    let array = { ...formData };
    if (type === "normal") {
      array["dictColors"][key] = val;
    } else {
      if (array["dictColors1"].hasOwnProperty(type) === false) {
        array["dictColors1"][type] = {};
      }
      array["dictColors1"][type][key] = val;
    }

    setFormData(array);
    return val;
  };
  const handleSubmit = async () => {
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    props.setLoader(true);
    let res = await functionService.post("Colors/save", formData);
    // console.log("color", res.data.data.result)
    if (res !== false && res.status !== false) {
      setShowToast(true);
      //    console.log("props.currentAssesment",props.currentAssesment);
      // console.log("JSON.parse(res.data.data.result)",JSON.parse(res.data.data.result));
      props.setCurrentAssesment({
        ...props.currentAssesment,
        m_oColorScheme: JSON.parse(res.data.data.result),
      });
    } else {
      setMessage(res.data.data.result);
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
    props.setLoader(false);
  };

  return (
    <>
      <div className={styles.colorsettingdetails}>
        <div className={styles.colorheader}>
          <h3>Color Setting</h3>
          <button className={styles.btn_skyblue} onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
        <div className={styles.colorboxes}>
          <p>Header Background Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 1)}
            setSelectedColor={(e) => handleColor(e, 1)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Banner Header Text Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 3)}
            setSelectedColor={(e) => handleColor(e, 3)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Banner Header Text Background Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 7)}
            setSelectedColor={(e) => handleColor(e, 7)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Author Profile Section Background Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 8)}
            setSelectedColor={(e) => handleColor(e, 8)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Button Background Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 2)}
            setSelectedColor={(e) => handleColor(e, 2)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Buttons Text Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 5)}
            setSelectedColor={(e) => handleColor(e, 5)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Other Headings Text Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 6)}
            setSelectedColor={(e) => handleColor(e, 6)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Default Actual Ratings Color (used for Radar chart) :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 4)}
            setSelectedColor={(e) => handleColor(e, 4)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        <div className={styles.colorboxes}>
          <p>Default Average Ratings Color :</p>
          <SketchColorPicker
            selectedColor={functionService.getColors(formData, 9)}
            setSelectedColor={(e) => handleColor(e, 9)}
            colorPelletes={styles.colorPellete1}
          />
        </div>
        {dimList && dimList.length > 0 && (
          <div className={styles.colorinnerboxes}>
            <h5>Colors Mapped To Dimensions</h5>
            {dimList &&
              dimList.map((obj, index) => (
                <div className={styles.colorboxes} key={index}>
                  <p>{obj.m_szDimensionName}</p>
                  <SketchColorPicker
                    selectedColor={functionService.getColors(
                      formData,
                      obj.m_lDimensionId,
                      "3"
                    )}
                    setSelectedColor={(e) =>
                      handleColor(e, obj.m_lDimensionId, 3)
                    }
                    colorPelletes={styles.colorPellete1}
                  />
                </div>
              ))}
          </div>
        )}
        {showTitle && (
          <div className={styles.colorinnerboxes}>
            <h5>Colors Mapped To Rating Bands</h5>
            {ratingBand &&
              Object.keys(ratingBand).map((obj, index) => (
                <div key={index}>
                  {ratingBand[obj].m_nIsScoringBand === 0 && (
                    <div className={styles.colorboxes}>
                      <p>{ratingBand[obj].m_szRatingScaleName}:</p>
                      <SketchColorPicker
                        selectedColor={functionService.getColors(
                          formData,
                          ratingBand[obj].m_lRatingScaleId,
                          "6"
                        )}
                        setSelectedColor={(e) =>
                          handleColor(e, ratingBand[obj].m_lRatingScaleId, 6)
                        }
                        colorPelletes={styles.colorPellete1}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
        {questionList && questionList.length > 0 && (
          <div className={styles.colorinnerboxes}>
            <h5>Colors Mapped To Questions</h5>
            {questionList &&
              questionList.map((obj, index) => (
                <div className={styles.colorboxes} key={index}>
                  <p>{obj.m_szQuestionText}</p>
                  <SketchColorPicker
                    selectedColor={functionService.getColors(
                      formData,
                      obj.m_lQuestionId,
                      "4"
                    )}
                    setSelectedColor={(e) =>
                      handleColor(e, obj.m_lQuestionId, 4)
                    }
                    colorPelletes={styles.colorPellete1}
                  />
                </div>
              ))}
          </div>
        )}
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
      </div>
    </>
  );
}

export default Colors;
