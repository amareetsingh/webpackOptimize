import React, { useEffect, useState } from "react";
import styles from "./evalinator.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
//import topbannerimage from "../../assets/images/topbanner.png";
import EvalRangeSlider1 from "./RangeSlider1";
import RadioCheckBox1 from "./RadioCheckBox1";

import { functionService, getColor } from "../../Context/functions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DOMPurify from "dompurify";


const EachQuestion1 = ({
  row,
  currentQuestion,
  handleNext,
  questionOptions,
  setQuestionOptions,
  setQuestionTextOptions,
  questionTextOptions,
}) => {
  // const[currentQuestion, setCurrentQuestion] = useState({})

  // useEffect(() => {

  //   let question = row && Object.values(row.glistQuestions).filter( (obj) => {
  //     if(obj.m_lQuestionId === currentQuestionId)
  //       {
  //         setCurrentQuestion(obj);
  //         return obj;
  //       }
  //     })

  // }, []);

  //console.log("currentQuestion", currentQuestion);
  const handleTextArea = (e) => {
    const value = e.target.value;
    setQuestionTextOptions({
      ...questionTextOptions,
      [currentQuestion && currentQuestion.m_lQuestionId]: value,
    });
  };

  return (
    <Row>
      <Col>
        <div className={styles.questionlistwithoption}>
          {currentQuestion && currentQuestion.m_szQuestionText && currentQuestion.m_szQuestionText.length > 0 &&  
            <div className={styles.headingquestion}>
              <h1>{currentQuestion && currentQuestion.m_szQuestionText}</h1>
            </div>
          }
          <div className={styles.bodyQuestionlist}>
            <Row>
              {functionService.awsBucketImage(
                currentQuestion &&
                  currentQuestion.hasOwnProperty("m_oMedia") &&
                  currentQuestion &&
                  currentQuestion.m_oMedia
              ) !== false && (
                <Col lg={3}>
                  <div className={styles.questionimagelest}>
                    <img
                      src={
                        functionService.awsBucketImage(
                          currentQuestion && currentQuestion.m_oMedia) 
                          // !== false
                          // ? functionService.awsBucketImage(
                          //     currentQuestion && currentQuestion.m_oMedia)
                          // : topbannerimage
                      }
                      alt={currentQuestion && currentQuestion.m_szQuestionText}
                    />
                  </div>
                </Col>
              )}
              <Col
                lg={
                  functionService.awsBucketImage(
                    currentQuestion && currentQuestion.m_oMedia
                  ) !== false
                    ? 9
                    : 9
                }
              >
                <div className={styles.questionsbox}>
                  <h4
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        currentQuestion && currentQuestion.m_szQuestionSubText
                      ),
                    }}
                  ></h4>

                  <Form>
                    {currentQuestion &&
                    currentQuestion.m_nQuestionDisplayType === 7 ? (
                      <div>
                        {" "}
                        <textarea
                          className="form-control"
                          placeholder="Please enter your response"
                          name=""
                          id=""
                          cols="30"
                          rows="8"
                          onChange={handleTextArea}
                          // ref={}
                        ></textarea>{" "}
                      </div>
                    ) : currentQuestion &&
                      currentQuestion.m_nQuestionDisplayType === 8 ? (
                      <div></div>
                    ) : currentQuestion &&
                      currentQuestion.m_nQuestionDisplayType === 6 ? (
                      <>
                        <input
                          type="text"
                          className={styles.lessandmoretext}
                          placeholder={
                            currentQuestion &&
                            currentQuestion.m_dictCustomizations[1]
                              ? currentQuestion.m_dictCustomizations[1]
                              : "(Less to More)"
                          }
                        />
                        <EvalRangeSlider1
                          handleNext={handleNext}
                          centerAlign={
                            functionService.awsBucketImage(
                              currentQuestion && currentQuestion.m_oMedia
                            ) !== false
                              ? true
                              : false
                          }
                          row={row}
                          currentQuestion={currentQuestion}
                          questionOptions={questionOptions}
                          setQuestionOptions={setQuestionOptions}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          key={`inline-${currentQuestion && currentQuestion}`}
                          className="mb-3"
                        >
                          {/* {currentQuestion && currentQuestion.m_listResponseOptions && currentQuestion.m_listResponseOptions.map(
                            (obj, index) => (
                              <div key={index}> */}
                          <RadioCheckBox1
                            responseOptions={
                              currentQuestion.m_listResponseOptions
                            }
                            handleNext={handleNext}
                            row={row}
                            currentQuestion={currentQuestion}
                            // obj1={obj}
                            questionOptions={questionOptions}
                            setQuestionOptions={setQuestionOptions}
                          />
                          {/* </div>
                            )
                          )} */}
                        </div>
                      </>
                    )}
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default EachQuestion1;
