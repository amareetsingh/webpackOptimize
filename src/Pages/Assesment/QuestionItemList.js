import { faFaceGrinWide } from '@fortawesome/free-regular-svg-icons';
import { faBars, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useRef } from 'react';
import styles from './assesment.module.css';
const QuestionItemList = (props) => {
  
  const dragItem = useRef();
  const dragOverItem = useRef();

 
  const dragStart = (e, position) => {
    dragItem.current = position;
    //console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    //console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...props.rows];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    props.setRows(copyListItems);
    props.setQuestionOrder(true);
  };
 
  return (
    <>
    {
    props.rows &&
    props.rows.map((obj, index) => (
      <div
      className={styles.questionItem}
      key={index}
       >
            <span  onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        title={"Drag to reorder"}
        onDragEnd={drop}       
        draggable 
        >
          <FontAwesomeIcon className={styles.dragIcon} icon={faBars}/></span>
         <h5 key={index} className={obj.m_lQuestionId === (props.currentQuestion && props.currentQuestion.m_lQuestionId)? styles.active : ''} onClick={()=>{props.getSingleQuestion(obj.m_lQuestionId)}}>
								 {/* <span><img src={questionIcon} alt="pexelsback" /></span> */}
							
								{index+1} : {obj.m_szQuestionText.substring(0,30) }{obj.m_szQuestionText.length > 30 ? '...':'' } {obj.m_szQuestionText === "" && " Question"}
								<span className={styles.questionhover}>
									<label>{obj.m_szQuestionText}</label>
									<p>{obj.m_szQuestionSubText}</p>
								</span>
								 </h5>
      </div>
      ))}
    </>
  );
};
export default QuestionItemList;