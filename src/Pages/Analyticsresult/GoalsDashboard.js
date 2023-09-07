
import styles from './analyticsresult.module.css';
import React, { useState } from 'react';
import DOMPurify from "dompurify";
import { functionService } from '../../Context/functions';

import { Container } from "react-bootstrap";
import GanttChart from '../../Components/GanttChart';

const GoalsDashboard = ({ goalRow, index, completedGoals }) => {

    // const tasks = apiData.map(task => [
    //     task.id,
    //     task.name,
    //     new Date(task.start_date),
    //     new Date(task.end_date),
    //     task.duration,
    //     task.percent_complete,
    //     task.dependencies,
    //   ]);



    let tempDate = new Date();
    let date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const currDate = date;


    return (
        <>
            {
                !completedGoals ? <div className={styles.GoalsContainer} >

                    <div className={styles.GoalsContent} >

                       
                        <div key={index} className={styles.collapseMainanalysticDash}>
                            <div className={styles.goalslistheadermain}>
                                <div className={`${styles.goalsheaderpart} ${styles.goalssheaderPartFlex}`}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize("</h3>" + goalRow?.m_szGoalDesc + "</h3>")
                                        }}

                                    >

                                    </div>

                                    {/* <h3>{goalRow.m_szGoalDesc}</h3> */}
                                    <div className={styles.floatRight}>

                                        <p className={styles.cretaeddategoals}>Start Date: {
                                            goalRow && goalRow.m_dtGoalStartDate !== null ?
                                                functionService.convertDate(goalRow.m_dtGoalStartDate
                                                ) : functionService.convertDate(currDate
                                                )}</p>

                                        {/* <p className={styles.cretaeddategoals}>Created: {functionService.convertDate(goalRow.m_dtCreatedDate)}</p> */}
                                        <p className={styles.duedategoals}>Due: {functionService.convertDate(goalRow?.m_dtGoalDueDate)}</p>
                                    </div>
                                </div>
                                <div className={styles.iconsheaderpart}>
                                    {/* {console.log('sttus', goalRow?.m_nGoalStatus)} */}
                                    {goalRow?.m_nGoalStatus == 2 && <span className={styles.GoalsCompleted} >Completed</span>}

                                </div>

                            </div>


                            {/* <div>{props.obj.szTitle }</div> */}


                        </div>




                    </div>



                </div> : <> {
                    goalRow.m_nGoalStatus == 2 && <div className={styles.GoalsContainer} >

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
                                            <p className={styles.cretaeddategoals}>Created: {functionService.convertDate(goalRow.m_dtCreatedDate)}</p>
                                            <p className={styles.duedategoals}>Due: {functionService.convertDate(goalRow.m_dtGoalDueDate)}</p>
                                        </div>
                                    </div>
                                    <div className={styles.iconsheaderpart}>
                                        {console.log('sttus', goalRow.m_nGoalStatus)}
                                        {goalRow.m_nGoalStatus == 2 && <span>Completed</span>}

                                    </div>

                                </div>


                                {/* <div>{props.obj.szTitle }</div> */}


                            </div>




                        </div>



                    </div>
                }</>

            }




        </>
    )
}

export default GoalsDashboard