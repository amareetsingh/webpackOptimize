import React from 'react'
import Styles from './EvalAssessmentSection.module.css';
import styles from '../../../Analyticsresult/analyticsresult.module.css';
import GraphData from '../../../Front/GraphData'
import { Container } from "react-bootstrap";
import styless from '../../../Dashboard/dashboard.module.css'

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import AssementScroreTable from '../AssementScroreTable';
const Index = (props) => {
  const groups = props.obj?.oGroup?.listUsers;
  const resultData = props.resultData;

  return (
    <>
      {
        props.obj && Object.keys(props.obj.dictAssessmentScoresByUser).length > 0 ?
          <Container className={Styles['container']} >
            <div className={Styles["title-2"]}>
              <div className={Styles["head-num"]}>{props.obj.oStatusSummary.m_sFinalScore}</div>
              <div className={Styles["head-title"]}>{props.obj.oAssessment?.m_szSurveyName
              }</div>
            </div>

            <div className={Styles['mainContainer']}>
              <div className={Styles['Score']}>
                <div className={Styles['scoreCircular']}>
                  <CircularProgressbarWithChildren
                    value={((props.obj.oStatusSummary.m_sFinalScore / props.obj.oAssessment.m_sHighestPossibleScore) * 100)}
                    styles={buildStyles({
                      strokeLinecap: 'butt',
                      textSize: '32px',
                      pathTransitionDuration: 0.5,
                      pathColor: `#473E8F`,
                      textColor: '#000',
                      trailColor: '#C4C4C4',
                      backgroundColor: '#000',
                    })}>
                    <div style={{ fontSize: 20, marginTop: -5 }}>
                      <strong>{Math.floor(props.obj.oStatusSummary.m_sFinalScore)}</strong> {props.obj.oAssessment.m_sHighestPossibleScore > 0 && `/ ${props.obj.oAssessment.m_sHighestPossibleScore}`}
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <div>
                  <a className={styless.view_link} variant="outline-primary"
                    target="_blank" href={`/analyticsresultgroup?id=${props.obj.oAssessment?.m_lSurveyId}&groupId=${props.obj?.oGroup?.m_lGroupId}`} >View</a>
                </div>

                <div className={styles.roundcircelresult}>
                  <h4>

                    <span>




                    </span>

                  </h4>
                </div>
              </div>
              <div className={Styles['ChartData']} >
                <GraphData
                  data={props.obj && props.obj.dictChartData}
                  title={false}
                  chartType={"90"}
                />

              </div>
            </div>

            <AssementScroreTable groups={props.obj?.oGroup?.listUsers} dictAssessmentScore={props.obj.dictAssessmentScoresByUser} m_sHighest={props.obj.oAssessment} id={props.obj.oAssessment?.m_lSurveyId} />
          </Container> : null
      }

    </>
  )
}

export default Index