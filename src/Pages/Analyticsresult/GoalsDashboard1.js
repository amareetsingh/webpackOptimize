
import styles from './analyticsresult.module.css';
import React, { useState } from 'react';
import DOMPurify from "dompurify";
import { functionService } from '../../Context/functions';

// import { Container } from "react-bootstrap";
// import GanttChart from '../../Components/GanttChart';

const GoalsDashboard1 = ({ resultData }) => {

    // console.log('resultData', resultData);

    let tempDate = new Date();
    let date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const currDate = date;

    const nTotalQuestionGoals = resultData && resultData.nTotalQuestionGoals || "0";
    const nDimQuestionGoals = resultData && resultData.nDimQuestionGoals || "0";
    const sum = parseInt(nTotalQuestionGoals) + parseInt(nDimQuestionGoals);


    return (
        
        
        (resultData && resultData.dictGoals && (Object.keys(resultData.dictGoals).length) > 0 ? 
        <>
         <div className={styles.GoalsContainer}>

        {resultData && Object.values(resultData.dictGoals).map((goalRow, index) => (

                <div className={styles.GoalsContent} >

                    <div key={index} className={styles.collapseMainanalysticDash}>
                        <div className={styles.goalslistheadermain}>
                            <div className={`${styles.goalsheaderpart} ${styles.goalssheaderPartFlex}`}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize("</h3>" + goalRow.m_szGoalDesc + "</h3>")
                                    }}

                                >

                                </div>

                                {/* <h3>{goalRow.m_szGoalDesc}</h3> */}
                                <div className={styles.floatRight}>

                                    <p className={styles.cretaeddategoals}>Start: {
                                        goalRow && goalRow.m_dtGoalStartDate !== null ?
                                            functionService.convertDate(goalRow.m_dtGoalStartDate
                                            ) : functionService.convertDate(currDate
                                            )}</p>

                                    {/* <p className={styles.cretaeddategoals}>Created: {functionService.convertDate(goalRow.m_dtCreatedDate)}</p> */}
                                    <p className={styles.duedategoals}>Due: {functionService.convertDate(goalRow.m_dtGoalDueDate)}</p>
                                    

                                </div>
                            </div>
                            <div className={styles.iconsheaderpart}>
                                {goalRow.m_nGoalStatus == 2 && <span className={styles.GoalsCompleted} >Completed</span>}
                            </div>

                        </div>


                        {/* <div>{props.obj.szTitle }</div> */}


                    </div>




                </div>

            
    ))}
    </div> 
    </>
    : <div>No Goals Yet </div>
    )


    )
}

export default GoalsDashboard1;