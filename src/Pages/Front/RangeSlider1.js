import React, { useEffect } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { checkOptionSetting, getColor } from '../../Context/functions';
import styles from './evalinator.module.css';

function EvalRangeSlider1({handleNext,centerAlign,row,currentQuestion,questionOptions,setQuestionOptions}) {
    let list = []
    //console.log("row.glistQuestions[currentQuestion].m_dictCustomizations[3]",row.glistQuestions[currentQuestion].m_dictCustomizations[3])
	// console.log("currentQuestion",row.glistQuestions[currentQuestion].m_dictCustomizations);
    if(
        // row.glistQuestions[currentQuestion] && Object.keys(row.glistQuestions[currentQuestion].m_dictCustomizations).length > 0
        currentQuestion && currentQuestion.m_dictCustomizations && currentQuestion.m_dictCustomizations.length > 0
        ){
    for (var i=1; i <= (
        
        // row.glistQuestions[currentQuestion].m_dictCustomizations && parseInt(row.glistQuestions[currentQuestion].m_dictCustomizations[3]
        currentQuestion && currentQuestion.m_dictCustomizations && currentQuestion.m_dictCustomizations[3]
            
        ); i++) {
        list.push(i)        
    }
    }
    else{
    if(list.length === 0){
        for (var j=1; j <= (row.gNumBands); j++) {
            list.push(j)        
        }
    }
    }
    useEffect(()=>{
        
        if(currentQuestion)
        { 
             
                // let textOption = ((questionOptions && questionOptions[row.glistQuestions[currentQuestion].m_lQuestionId] !== undefined) ? questionOptions[row.glistQuestions[currentQuestion].m_lQuestionId] : 1);

                let textOption = ((questionOptions && questionOptions[currentQuestion && currentQuestion.m_lQuestionId] !== undefined) ? questionOptions[currentQuestion && currentQuestion.m_lQuestionId] : 1);

                // if(textOption === 1){
                //     setQuestionOptions({...questionOptions,[row.glistQuestions[currentQuestion].m_lQuestionId]:1}) ;
        
                if(textOption === 1){
                    setQuestionOptions({...questionOptions,[currentQuestion && currentQuestion.m_lQuestionId]:1}) ;
                }
        }
    },[currentQuestion]);
   // console.log("questionOptions",questionOptions);
    //console.log("row.glistQuestions[currentQuestion].m_lQuestionId", (row && row.glistQuestions[currentQuestion].m_lQuestionId))
    return (
        <>
        <div className={`${styles.rangeslidercustom} ${centerAlign !== true ? styles.contentCenter:''}`}>
            {(row && (row.nType === "3" || row.nType === 3)) ? 
            <div className={styles.range_slide_options}>
                <ul>
                { list.length > 0 && list.map((obj,index) => {
                    return <li  key={index}>
                        <input type={"radio"} name={`radioOption-${currentQuestion && currentQuestion.m_lQuestionId}-2`}  checked={(obj+"" === questionOptions[currentQuestion && currentQuestion.m_lQuestionId]) ? true : false} value={obj}  onChange={(e)=>{
                            setQuestionOptions({...questionOptions,[currentQuestion && currentQuestion.m_lQuestionId]:e.target.value });
                            if(checkOptionSetting(150,1,row && row.gdictOptions)){
                                setTimeout(function(){handleNext();},500)
                            }
                            }}/>
                        <span> {obj}</span>
                        </li>            
                })               
                }
                </ul>
        </div>
        :
        <>
        <RangeSlider 
        value={((questionOptions && questionOptions[currentQuestion && currentQuestion.m_lQuestionId] !== undefined) ? questionOptions[currentQuestion && currentQuestion.m_lQuestionId] : 1)}       
        className={styles.rangeslidermarker}
        min={1}
        tooltip={false}
        //max={ (row.glistQuestions[currentQuestion].m_dictCustomizations && row.glistQuestions[currentQuestion].m_dictCustomizations.hasOwnProperty(3)) && parseInt(row.glistQuestions[currentQuestion].m_dictCustomizations[3])}
        max={list.length}
        
        onChange={(e)=>{setQuestionOptions({...questionOptions,[currentQuestion && currentQuestion.m_lQuestionId]:e.target.value });
        if(checkOptionSetting(150,1,row && row.gdictOptions)){
            setTimeout(function(){handleNext();},500)
        }
    
    }}
        />
        <div className={styles.range_slide_option}>
            { list.length > 0 && list.map((obj,index) => {
                return <span key={index} style={{backgroundColor: (questionOptions[currentQuestion && currentQuestion.m_lQuestionId] && questionOptions[currentQuestion && currentQuestion.m_lQuestionId].toString() === obj.toString()) ? getColor(row,2) : ""}}
                ><label>{index+1}</label></span> })               
            }
            
        </div>
      
        </>
        
}
        </div>
    </>
    )

}
export default EvalRangeSlider1;