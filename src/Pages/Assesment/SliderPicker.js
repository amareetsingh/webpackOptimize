import React from 'react';
import styles from './assesment.module.css';

function SliderPicker({fullData,ratingBand,row,formScoringOptionData,setformScoringOptionData}) {
  
	return (
            <>
               <div className={styles.scoringcheckbox}>
                <p className={styles.checkboxquestion}>{row && row.m_szQuestionText}</p>
                <span className={styles.badge}>Slider</span>
                <span className={styles.purplebadge}>Default</span>

                <div className={styles.questionsbox1}>
                    <ul className={styles.dotquestionul}> 
                       
                        {ratingBand && Object.keys(ratingBand).map((key,jindex)=>(
                                <>
                                {ratingBand[key].m_sMappedPoints > 0 &&
                                     <li className={jindex === 0 ? styles.blue_bg:''} key={jindex} value={ratingBand[key].m_sMappedPoints}></li>
                                }
                                </>
                                
                            ))}
                    </ul>
                   
                </div>
								
            </div>	
            </>
	);
}

export default SliderPicker;
