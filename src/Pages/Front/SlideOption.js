import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './evalinator.module.css';
function SlideOption({ row, currentQuestion }) {

    return (
        <Form>
            {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                    {row && row.glistQuestions[currentQuestion].m_listResponseOptions.map((obj, index) => (
                        <div key={index}>
                            <Form.Check
                                //label="I mention both - we have a great product to solve a problem"
                                label={obj.m_szResponseText}
                                name="group1"
                                //type={type}
                                type={row.glistQuestions[currentQuestion].m_nQuestionDisplayType === 3 ? type : 'checkbox'}
                                id={`inline-${type}-1`}
                                className={styles.spacegroups}
                            />
                        </div>
                    ))
                    }

                </div>
            ))}
        </Form>
    )

}
export default SlideOption;