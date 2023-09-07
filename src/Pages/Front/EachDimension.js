import React, {componentDidMount, useEffect, useState } from "react";
import styles from "./evalinator.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
//import topbannerimage from "../../assets/images/topbanner.png";
//import RadioCheckBox from "./RadionCheckBox";
//import EvalRangeSlider from "./RangeSlider";
//import EachQuestion   from  "./EachQuestion";
import EachQuestion1   from  "./EachQuestion1";

import { functionService, getColor } from "../../Context/functions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EachDimension = ({row,currentDim, getQuestion, handleNext, questionOptions, setQuestionOptions, setQuestionTextOptions, questionTextOptions}) => {  
 
  useEffect(() => {
    window.scrollTo(0, 0);
  },[currentDim])


  // console.log('currentDim', currentDim);
  return (
    <div key={currentDim && currentDim.m_lDimensionId}>
    <h2 className={styles.textCenter}>{currentDim && currentDim.m_szDimensionName}</h2><hr></hr>
    {currentDim && currentDim.m_listQuestions && currentDim.m_listQuestions.map((qId,index) => 
    (
      <>
      {/* {console.log('questionid', qId)} */}
      <EachQuestion1 
        row={row} 
        questionOptions={questionOptions} 
        setQuestionOptions={setQuestionOptions} 
        currentQuestion={getQuestion(qId)}  
        setQuestionTextOptions={setQuestionTextOptions}
        questionTextOptions={questionTextOptions}
        handleNext={handleNext} />
      </>
    
    ))}
    </div>
  )
}

export default EachDimension