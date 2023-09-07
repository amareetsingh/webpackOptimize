import React,{useState} from 'react'
import styles from "../../Analyticsresult/analyticsresult.module.css";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import viewLink from '../../../assets/view_link.svg';

const AssementScroreTable = (props) => {
    const { m_sHighest, groups, id, dictAssessmentScore } = props;
   

    return (
        <>

            <div className='resutlPageBreak'>

                <Container  >
                  
                    <div className={styles.contantforresult}>
                        <h2 className="justify-content-md-center text-center">Assessment Scores by User</h2>
                        <div className={styles.tablepadding}>
                            <Table bordered >
                                <thead >
                                    <tr className={styles.flexCenter} >
                                        <th>Name</th>
                                        <th>Score</th>
                                        <th>Link to Results</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        groups && Object.values(groups).map((obj) => (
                                            <tr className={styles.flexCenter}>
                                                <td>{obj.m_szFirstName}</td>

                                                <td >
                                                    <div className={`${styles['analyticsListingleftbar']} ${styles['textcenter']}`}>

                                                        {dictAssessmentScore[obj.m_lUserId] ? (
                                                            <CircularProgressbarWithChildren value={dictAssessmentScore[obj.m_lUserId].m_sFinalScore > 0 ? (((dictAssessmentScore[obj.m_lUserId] && dictAssessmentScore[obj.m_lUserId].m_sFinalScore) / m_sHighest.m_sHighestPossibleScore) * 100) : '0'} styles={buildStyles({
                                                                strokeLinecap: 'butt',
                                                                marginTop: '34px',
                                                                textSize: '12px',
                                                                pathTransitionDuration: 0.5,
                                                                pathColor: `#473E8F`,
                                                                textColor: '#000',
                                                                trailColor: '#C4C4C4',
                                                                backgroundColor: '#000',
                                                            })}>
                                                                <div style={{ fontSize: 14, fontWeight: 750 }}>
                                                                    { dictAssessmentScore[obj.m_lUserId].m_sFinalScore > 0 ? Math.round((dictAssessmentScore[obj.m_lUserId].m_sFinalScore)).toFixed(0) : 0}
                                                                </div>
                                                            </CircularProgressbarWithChildren>
                                                        ) : "N/A"
                                                        }

                                                    </div>
                                                </td>

                                                <td>
                                                    {
                                                        dictAssessmentScore[obj.m_lUserId] && (
                                                            <a href={`/analyticsresult?id=${id}&respondId=${obj.m_lUserId}`} target="_blank"><img className={styles.viewLinkImg} src={viewLink} alt="" /></a>
                                                        )

                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>

                        </div>

                    </div>
                </Container> </div>

        </>
    )
}

export default AssementScroreTable