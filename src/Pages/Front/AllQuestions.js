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

const AllQuestions = ({row, questionOptions, setQuestionOptions, getQuestion, questionTextOptions,  setQuestionTextOptions, handleNext}) => {  
   
  useEffect(() => {
    window.scrollTo(0, 0);
  },[row])

  // console.log('row', row);

  return (
    <div key={1}>
    <h2 className={styles.textCenter}>{"All Questions"}</h2><hr></hr>
    {row && row.glistQuestions && row.glistQuestions.map((qId,index) => 
    (
      <>
      {/* {console.log('question index', index)} */}
      <EachQuestion1 
        row={row} 
        questionOptions={questionOptions} 
        setQuestionOptions={setQuestionOptions} 
        setQuestionTextOptions={setQuestionTextOptions}
        questionTextOptions={questionTextOptions}
        currentQuestion={getQuestion(qId.m_lQuestionId)}  
        handleNext={handleNext} />
      </>
    
    ))}
    </div>
  )
}

export default AllQuestions;