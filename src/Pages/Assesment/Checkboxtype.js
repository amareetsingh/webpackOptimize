import React from 'react';
import styles from './assesment.module.css';
import {useParams} from "react-router-dom";
import {Form} from "react-bootstrap";
import { functionService } from '../../Context/functions';
import { useAuthState } from '../../Context';

function Checkboxtype({ratingBand,row,formScoringOptionData,setformScoringOptionData}) {
    // console.log('first',row)
   const params =useParams();
   const userDetails = useAuthState();
   const handleAction = (val,id,question_id)=>{
        let array = {...formScoringOptionData};
        array[question_id] = {};
        array[question_id][id] = val;
        setformScoringOptionData(array);
        functionService.post("Question/mapRatingBands",
        {
            "assessmentId": params.id,
            "userId": userDetails.id,
            "lQuestionId": question_id,
            "lResponseId": id,
            "listBandSequenceNums": [
                val
            ]
          }
        );
   }
  

	return (
            <>
               <div className={styles.scoringcheckbox}>
                    <p className={styles.checkboxquestion}>{row && row.m_szQuestionText}</p>
                    <span className={styles.badge}>{row && row.m_nQuestionDisplayType ===  3 ? "Radio": "Checkbox" } type</span>

                    

                    {row && row.m_listResponseOptions && row.m_listResponseOptions.map((suboption,index)=>(
                    <div className={styles.questionsbox} key={index}>
                        <p>{suboption.m_szResponseText}</p>
                        <Form.Group controlId="formGridState" className={styles.scoredrop}>
                           	<Form.Select  className={styles.selectfont} onChange={(e)=>{handleAction(e.target.value,suboption.m_lResponseId,row.m_lQuestionId)}} value={(formScoringOptionData && formScoringOptionData[row.m_lQuestionId] )&& formScoringOptionData[row.m_lQuestionId][suboption.m_lResponseId]}>
                            <option value="" >-Select-</option>
                            {ratingBand && Object.keys(ratingBand).map((key,jindex)=>(
                                <>
                                {ratingBand[key].m_nIsScoringBand !== 0 &&
                                    <option value={ratingBand[key].m_nRatingScaleSeqNum} key={jindex}>{ratingBand[key].m_sMappedPoints}</option>
                                }
                                </>
                                
                            ))}
                               
                            </Form.Select>
                        </Form.Group>
                    </div>
                    ))}

                </div>
            </>
	);
}

export default Checkboxtype;
