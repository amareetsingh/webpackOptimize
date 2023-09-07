import React, { useEffect, useState } from "react";
import styles from "./evalinator.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
//import topbannerimage from "../../assets/images/topbanner.png";
//import RadioCheckBox from "./RadionCheckBox";
//import EvalRangeSlider from "./RangeSlider";

import {
  functionService,
  getColor,
  checkOptionSetting,
} from "../../Context/functions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import EachQuestion from './EachQuestion';
import EachQuestion1 from "./EachQuestion1";
import EachDimension from "./EachDimension";
import AllQuestions from "./AllQuestions";

function Questionlist({
  row,
  currentStage,
  setCurrentStage,
  questionOptions,
  setQuestionOptions,
  setQuestionTextOptions,
  questionTextOptions
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  //const [currentDimension, setCurrentDimension] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (
      checkOptionSetting(230, 1, row && row.gdictOptions) == true &&
      checkOptionSetting(235, 1, row && row.gdictOptions) == true
    ) {
      // all questions mode
      setTotalQuestion(1); // all on one page
    } else if (checkOptionSetting(10, 1, row && row.gdictOptions) == true) {
      if (row && row.glistDimensions) {
        setTotalQuestion(row.glistDimensions.length);
        //setCurrentDimension(row.glistDimensions.getIndex[0])
        //console.log("current dimension", currentDimension);
      }

      return;
    } else if (row && row.glistQuestions) {
      setTotalQuestion(row.glistQuestions.length);
    }
  }, [row]);

  const handleNext = () => {
    if (currentQuestion >= totalQuestion - 1) {
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
  };
  const handleBack = () => {
    if (currentQuestion <= 0) {
      return;
    }
    setCurrentQuestion(currentQuestion - 1);
  };

  const getQuestion = (qId) => {
    let question =
      row &&
      Object.values(row.glistQuestions).filter((obj) => {
        if (obj.m_lQuestionId === qId) {
          return obj;
        }
      });

    return question[0];
  };

  // const getQuestionBySeq = (qSeqNum) =>{
  //   return row.glistQuestions[qSeqNum];
  // }

  //console.log("row", row);

  return (
    <>
      {totalQuestion > 0 && (
        <div className={styles.questionlistpage}>
          <div className={styles.container}>
            <h3
              className={styles.innerSubHeading}
              style={{ color: getColor(row, 3) }}
              dangerouslySetInnerHTML={{
                __html: row && row.goAssessment && row.goAssessment.szName,
              }}
            ></h3>
            {/* <h2 className={styles.questiontitle}>{(row  && row.glistQuestions[currentQuestion]) && row.glistQuestions[currentQuestion].m_szQuestionText}</h2> */}
            {
              <h2 className={styles.questiontitle}>
                {row && row.gszAssessmentName && row.gszAssessmentName}
              </h2>
            }
            <div className={styles.questionlistMain}>
              <div
                className={styles.questionprogressbar}
                style={{
                  width:
                    (totalQuestion === currentQuestion
                      ? 100
                      : (100 / totalQuestion) * (currentQuestion + 1)) + "%",
                }}
              ></div>
              {checkOptionSetting(230, 1, row && row.gdictOptions) == true &&
              checkOptionSetting(235, 1, row && row.gdictOptions) == true ? (
                <>
                  <AllQuestions
                    row={row}
                    questionOptions={questionOptions}
                    setQuestionOptions={setQuestionOptions}
                    getQuestion={getQuestion}
                    questionTextOptions={questionTextOptions}
                    setQuestionTextOptions={setQuestionTextOptions}
                    handleNext={handleNext}
                  />
                </>
              ) : checkOptionSetting(10, 1, row && row.gdictOptions) ? (
                <>
                  {/* {console.log("Current Seq", currentQuestion)} */}
                  <EachDimension
                    row={row}
                    currentDim={
                      row &&
                      row.glistDimensions &&
                      row.glistDimensions[currentQuestion]
                    }
                    questionOptions={questionOptions}
                    getQuestion={getQuestion}
                    setQuestionOptions={setQuestionOptions}
                    questionTextOptions={questionTextOptions}
                    setQuestionTextOptions={setQuestionTextOptions}
                    handleNext={handleNext}
                  />
                </>
              ) : (
                <EachQuestion1
                  row={row}
                  questionOptions={questionOptions}
                  setQuestionOptions={setQuestionOptions}
                  questionTextOptions={questionTextOptions}
                  setQuestionTextOptions={setQuestionTextOptions}
                  currentQuestion={
                    row &&
                    row.glistQuestions &&
                    row.glistQuestions[currentQuestion]
                  }
                  handleNext={handleNext}
                
                />
              )}
            </div>
            <div
              className={styles.questionHandleAction}
              style={{ paddingBottom: "20px" }}
            >
              <Row>
                <Col className={styles.paginationQuestion}>
                  <div className={styles.nextprevarrowes}>
                    {currentQuestion !== 0 && (
                      <button
                        onClick={handleBack}
                        style={{
                          background: getColor(row, 2),
                          color: getColor(row, 5),
                        }}
                        className={styles.paginationBtn}
                      >
                        <span>
                          <FontAwesomeIcon icon={faArrowLeft} /> Previous
                        </span>
                      </button>
                    )}
                  </div>
                  <div className={styles.nextprevarrowes}>
                    {currentQuestion + 1 >= totalQuestion ? (
                      <button
                        style={{
                          background: getColor(row, 2),
                          color: getColor(row, 5),
                        }}
                        onClick={() => {
                          setCurrentStage(currentStage + 1);
                        }}
                        className={styles.paginationBtn}
                      >
                        <span>Continue</span>
                      </button>
                    ) : (
                      <button
                        style={{
                          background: getColor(row, 2),
                          color: getColor(row, 5),
                        }}
                        onClick={handleNext}
                        className={styles.paginationBtn}
                      >
                        <span> {currentQuestion + 1}</span>of
                        <span className={styles.totalQuestioncounter}>
                          {totalQuestion}{" "}
                          <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}

      {/*<div className={styles.questionlistpage}>
                <div className={styles.container}>
                    <h2 className={styles.questiontitle}>Generate Your Wheel of Life (Template)</h2>
                    <div className={styles.questionlistMain}>
                        <Row>
                            <Col>
                                <div className={styles.questionlistwithoption}>
                                    <div className={styles.headingquestion}>
                                        <h1>Family</h1>
                                    </div>
                                    <div className={styles.bodyQuestionlist}>
                                        <Row>
                                             <Col xs={3}>
                                               <div className={styles.questionimagelest}>
                                                    <img src={topbannerimage} alt="Question Image" />
                                               </div> 
                                             </Col>
                                             <Col xs={9}>
                                                <div className={styles.questionsbox}>
                                                    <h4>How satisfied are you with how things are going on the Family front?</h4>
                                                    <div className={styles.questinlistcheckbox}>
                                                            <p>(Less to More)</p>
                                                            <Form>
                                                                {['radio'].map((type) => (
                                                                    <div key={`inline-${type}`} className="mb-3">

                                                                    {rangesliderelements(() => {
                                                                        const row = [];
                                                                        for (var i = 1; i <= 10 ; i++) {
                                                                        row.push(<Form.Check className={styles.inlinecheckbox} inline label={i} name="group1" type={type} id={`inline-${type}-1`} key={i}/>);												
                                                                        }
                                                                        return row;
                                                                    })}

                                                                     {/* <Form.Check inline label="1" name="group1" type={type} id={`inline-${type}-1`} />

                                                                    <Form.Check
                                                                        inline
                                                                        label="2"
                                                                        name="group1"
                                                                        type={type}
                                                                        id={`inline-${type}-2`}
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        label="3"
                                                                        name="group1"
                                                                        type={type}
                                                                        id={`inline-${type}-3`}
                                                                    />
                                                                     */}
      {/*</div>
                                                                ))}
                                                            </Form>
                                                    </div>
                                                </div>
                                             </Col>
                                        </Row>
                                        <Row>
                                        <Col className={styles.paginationQuestion}>
                                            <div className={styles.nextprevarrowes}>
                                                <a href="#" className={styles.paginationBtn}><span>Previous</span></a>
                                            </div>
                                            <div className={styles.nextprevarrowes}>
                                                <a href="#" className={styles.paginationBtn}><span>Next</span></a>
                                            </div>
                                        </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div> */}
    </>
  );
}
export default Questionlist;
