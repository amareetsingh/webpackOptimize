import React from 'react';
import { Form } from 'react-bootstrap';
import { checkOptionSetting, functionService } from '../../Context/functions';
import styles from './evalinator.module.css';
function RadioCheckBox1({handleNext, row, currentQuestion, questionOptions, setQuestionOptions }) {
    
    return (
        <> 

        {currentQuestion && currentQuestion.m_listResponseOptions && currentQuestion.m_listResponseOptions.map((obj, index) => (
           <div key={index} >

        {currentQuestion && currentQuestion.m_nQuestionDisplayType === 3 ?
            
            <Form.Check 
                style={obj && obj.m_oMedia && obj.m_oMedia.m_lMediaId > 0 ? { display: 'flex', alignItems: 'center' } : null}

               label={obj && obj.m_szResponseText &&
                    (obj.m_oMedia && obj.m_oMedia.m_lMediaId > 0) ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={functionService.awsBucketImage(obj.m_oMedia)}
                                style={{ maxWidth: '250px', marginLeft: '5px', marginRight: '10px' }}
                            />
                            <div style={{ flexGrow: 1 }}>{obj.m_szResponseText}</div>
                        </div>
                        
                    ) : (
                       
                        <div>{obj.m_szResponseText}</div>
                       
                    )
                }
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
            :
            <Form.Check
                // label={obj.m_szResponseText}
                style={obj && obj.m_oMedia && obj.m_oMedia.m_lMediaId > 0 ? { display: 'flex', alignItems: 'center' } : null}

               label={obj && obj.m_szResponseText &&
                    (obj.m_oMedia && obj.m_oMedia.m_lMediaId > 0) ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={functionService.awsBucketImage(obj.m_oMedia)}
                                style={{ maxWidth: '250px', marginLeft: '5px', marginRight: '10px' }}
                            />
                            <div style={{ flexGrow: 1 }}>{obj.m_szResponseText}</div>
                        </div>
                        
                    ) : (
                       
                        <div>{obj.m_szResponseText}</div>
                       
                    )
                }
                name={`opptions[${currentQuestion && currentQuestion.m_lQuestionId}]`}
                //type={type}
                type={'checkbox'}
                id={`inline-${obj.m_lResponseId}-1`}
                className={styles.spacegroups}
                value={obj.m_lResponseId}
                checked={(questionOptions && questionOptions[currentQuestion && currentQuestion.m_lQuestionId + "_" + obj.m_lResponseId] + "" === obj.m_lResponseId + "") ? true : false}
                onChange={(e) => { setQuestionOptions({ ...questionOptions, [currentQuestion && currentQuestion.m_lQuestionId + "_" + obj.m_lResponseId]: (e.target.checked === true ? e.target.value : '0') }) }}
            />
        }

            </div>
            )
        )}
        </>
    )

}
export default RadioCheckBox1;