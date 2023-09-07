import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import GraphData from "../Front/GraphData";
// import styles from '../Analyticsresult/analyticsresult.module.css';
import styles from "../Assesment/assesment.module.css";

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';


function QuestionShow(props) {

  let responses = props.obj.dictResponseCounts;

let graphData = {"6" : props.obj.oChartData};

//console.log("graphData", props.obj.oChartData)
  return (

    <>   
        <ListGroup as="ol" numbered>
        <span className={styles.QuestionMainDiv}>
  <div className={styles.QuestionDiv}>
    <div className={styles.QuestionInfo}>
      <div className={styles.QuestionText}>
        {props.obj.szQuestionName}
        {props.obj.nQuestionType === 6 && <><br /><small>(Slider)</small></>}
      </div>
      {props.obj.dAverageScore > 0 && 
        <div className={styles.AverageScoreWrapper}>
          <div className={styles.AverageScoreLabel}>Average Score:</div>
          <div className={styles.AverageScore}>{props.obj.dAverageScore}</div>
        </div>
      }
    </div>
  </div>
</span>


         
        {props.obj.nQuestionType === 6 ?
        (
          <>
          
            <div className={styles.compareGraphBar}>
                  <GraphData
                    data= {graphData}   
                    title={false}                 
                    chartType={'6'}
                  />
                </div>
          </>
        ):
        (

          responses && Object.entries(responses).length <= 0 ?
          (
            <ListGroup.Item>
                    No data available
          </ListGroup.Item>  
            ) 
          :
          (
          responses &&
            Object.entries(responses).map(([key, value]) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
               
									
                <div className="ms-2 me-auto">{key}</div>
                <div className={styles.analyticsListingleftbar}>
                <CircularProgressbarWithChildren value={props.obj.lTotalCount > 0 ?((value / props.obj.lTotalCount) * 100) : '0'}  styles={buildStyles({
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
                  {props.obj.lTotalCount > 0 ? Math.round((value / props.obj.lTotalCount) * 100).toFixed(0) : 0 }%
                </div>
								</CircularProgressbarWithChildren>
                </div>
              </ListGroup.Item>
            
             ))
          )
            )}

        </ListGroup>
    </>
  );
}

export default QuestionShow;
