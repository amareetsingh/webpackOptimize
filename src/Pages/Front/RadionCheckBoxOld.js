import React from 'react';
import { Form } from 'react-bootstrap';
import { checkOptionLanding } from '../../Context/functions';
import styles from './evalinator.module.css';
function RadioCheckBox({ handleNext, row, currentQuestion, obj, questionOptions, setQuestionOptions }) {
    //console.log("questionOptions",row.glistQuestions)
    return (
        <>                                      {row.glistQuestions[currentQuestion].m_nQuestionDisplayType === 3 ?
            <Form.Check
                //label="I mention both - we have a great product to solve a problem"
                label={obj.m_szResponseText}
                name={`opptions[${row.glistQuestions[currentQuestion].m_lQuestionId}]`}
                //type={type}
                type={'radio'}
                id={`inline-${obj.m_lResponseId}-1`}
                className={styles.spacegroups}
                value={obj.m_lResponseId}
                checked={(questionOptions && questionOptions[row.glistQuestions[currentQuestion].m_lQuestionId] + "" === obj.m_lResponseId + "") ? true : false}
                onChange={(e) => {
                    setQuestionOptions({ ...questionOptions, [row.glistQuestions[currentQuestion].m_lQuestionId]: e.target.value });
                    if (checkOptionLanding(150, 1, row)) {
                        setTimeout(function () { handleNext(); }, 500)
                    }
                }}
            />
            :
            <Form.Check
                //label="I mention both - we have a great product to solve a problem"
                label={obj.m_szResponseText}
                name={`opptions[${row.glistQuestions[currentQuestion].m_lQuestionId}]`}
                //type={type}
                type={'checkbox'}
                id={`inline-${obj.m_lResponseId}-1`}
                className={styles.spacegroups}
                value={obj.m_lResponseId}
                checked={(questionOptions && questionOptions[row.glistQuestions[currentQuestion].m_lQuestionId + "_" + obj.m_lResponseId] + "" === obj.m_lResponseId + "") ? true : false}
                onChange={(e) => { setQuestionOptions({ ...questionOptions, [row.glistQuestions[currentQuestion].m_lQuestionId + "_" + obj.m_lResponseId]: (e.target.checked === true ? e.target.value : '0') }) }}
            />
        }
        </>
    )

}
export default RadioCheckBox;