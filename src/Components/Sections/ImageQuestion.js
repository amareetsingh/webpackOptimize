import React  from 'react';
import DOMPurify from "dompurify";
import stylesresults from '../../Pages/Analyticsresult/analyticsresult.module.css';
import { checkOptionLanding2 } from '../../Context/functions';
import DimensionsGrid from './DimensionsGrid';
import DimensionsTabbed from './DimensionsGrid';  

function ImageQuestion({options, question}) {
  
  if (!question) {
    return null;
  }

console.log("question", question);

    return (

      <>

      <Form.Check
            //label="I mention both - we have a great product to solve a problem"
            label={obj.m_szResponseText}
            name={`opptions[${currentQuestion && currentQuestion.m_lQuestionId}]`}
            //type={type}
            type={'radio'}
            id={`inline-${obj.m_lResponseId}-1`}
            className={styles.spacegroups}
            value={obj.m_lResponseId}
            checked={(questionOptions && questionOptions[currentQuestion && currentQuestion.m_lQuestionId] + "" === obj.m_lResponseId + "") ? true : false}
            onChange={(e) => {
                setQuestionOptions({ ...questionOptions, [currentQuestion && currentQuestion.m_lQuestionId]: e.target.value });
                if (checkOptionSetting(150, 1, row && row.gdictOptions)) {
                    setTimeout(function () { handleNext(); }, 500)
                }
            }}
        />


      </>
    );
}
export default ImageQuestion;