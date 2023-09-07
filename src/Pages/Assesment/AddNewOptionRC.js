import React, { useEffect, useState } from "react";
import styles from "./assesment.module.css";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import question_images from "../../assets/images/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Multiselect from "multiselect-react-dropdown";
import ImageAddEdit from "../../Components/ImageAddEdit";
import { functionService } from "../../Context/functions";  

function AddNewOptionRC({
  dragStart,
  dragEnter,
  drop,
  currentAssesment,
  ratingBand,
  questionId,
  userid,
  index,
  obj,
  questionType,
  type,
  handleOptionVal,
  handleResponseImageUpdate,
  optionData,
  handleAddNew,
  deleteOption,
  handleSaveOption,
}) {

  const [questionOption, handlequestionOption] = useState(
    obj.m_lResponseId === 0 ? true : false
  );



  const params = useParams();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  
  const [optionFormData, setOptionFormData] = useState({
    assessmentId: params.id,
    userId: userid,
    lQuestionId: questionId,
    lResponseId: obj.m_lResponseId.toString(),
    szResponseText: obj.m_szResponseText,
    szResponseDesc: obj.m_szResponseSubText,
    mapBands: obj.m_listMappedPersonalityBands || [1],
  });

  useEffect(() => {
    setOptionFormData({
      assessmentId: params.id,
      userId: userid,
      lQuestionId: questionId,
      lResponseId: obj.m_lResponseId.toString(),
      szResponseText: obj.m_szResponseText,
      szResponseDesc: obj.m_szResponseSubText,
      //szURL:obj.m_oMedia?.m_szURL,
      mapBands: obj.m_listMappedPersonalityBands || [1],
    });
    let arr = [];
    let sel = [];
  
    ratingBand &&
      Object.keys(ratingBand).forEach((key, jindex) => {
        if (ratingBand[key].m_nIsScoringBand === 0) {
          arr.push({
            val: ratingBand[key].m_nRatingScaleSeqNum,
            key: ratingBand[key].m_szRatingScaleName,
          });
          if (
            obj.m_listMappedPersonalityBands &&
            obj.m_listMappedPersonalityBands.includes(
              ratingBand[key].m_nRatingScaleSeqNum
            )
          ) {
            sel.push({
              val: ratingBand[key].m_nRatingScaleSeqNum,
              key: ratingBand[key].m_szRatingScaleName,
            });
          }
        }
      });
    setSelectedOption(sel);
    setOptions(arr);
  }, [obj]);


  // const handleOptionImageUpdate = (id, oMedia) => {
  //   alert('updating response option:' + id);
  //   const newObj = { ...obj, m_oMedia: oMedia };
  //   //handleResponseImageUpdate(id, oMedia);
  //   setMedia();
  // };

  const handleUptionOption = (arr) => {
  
    setOptionFormData({ ...optionFormData, mapBands: arr });
  };




  //
  return (
    <div className={styles.questionradio} key={index}>

      
      <div className={styles.questionradiocheck}>
        <Form.Check
          className={styles.input}
          inline
          value={obj.m_lResponseId}
          name="group1"
          type={questionType === "1" || questionType === "5" ? type : "radio"}
          id={`inline-${type}-2`}
        />

        {obj && obj.m_lResponseId > 0 && functionService.awsBucketImage(obj.m_oMedia) !== false && 
        <img  
          src={functionService.awsBucketImage(obj.m_oMedia)} 
          alt="image for option" 
          style={{ maxWidth: '50px', marginRight: '10px' }} 
        />

      }

        <p className={styles.optionText}>
          {" "}
          &nbsp;
          {optionData[index].m_szResponseText}
          {currentAssesment && currentAssesment.m_nAssessmentType !== 1 ? (
            <>
              {ratingBand &&
                Object.keys(ratingBand).map(
                  (key, kindex) =>
                    obj.m_listMappedPersonalityBands &&
                    ratingBand[key].m_nIsScoringBand === 1 &&
                    ratingBand[key].m_nRatingScaleSeqNum ===
                      obj.m_listMappedPersonalityBands[0] && (
                      <>
                        <span className={styles.titlePoints} key={kindex}>
                          ({ratingBand[key].m_sMappedPoints} &nbsp;points)
                        </span>
                      </>
                    )
                )}
            </>
          ) : (
            <>
              {selectedOption.map((obj, index) => (
                <span className={styles.titlePoints} key={index}>
                  ({obj.key})
                </span>
              ))}
            </>
          )}
        </p>
      </div>

      <div className={styles.questionIconHead}>
        <div className={styles.editDeleticon}>
          <span
            className={styles.editiconsoptions}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            title={"Drag to reorder"}
            draggable
          >
            <FontAwesomeIcon icon={faBars} />
          </span>
          {/* {(index + 1) === optionData.length && <span className={styles.editiconsoptions} ><FontAwesomeIcon onClick={handleAddNew} icon={faPlus} size="lg" /></span>} */}
          <span
            className={styles.editiconsoptions}
            onClick={(e) => {
              handlequestionOption(!questionOption);
            }}
          >
            <FontAwesomeIcon icon={faCaretDown} size="lg" />
          </span>
          <span
            className={styles.deletIcon}
            onClick={(e) => {
              deleteOption(e, index, obj);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />{" "}
          </span>
        </div>
      </div>
      <div
        className={
          questionOption === true ? styles.hidesubOption : styles.showsubOption
        }
      >




        <Form.Group className={styles.setinputwidth1} controlId="">
          <Form.Label>Response text:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter option text here"
            value={optionFormData.szResponseText}
            onChange={(e) => {
              setOptionFormData({
                ...optionFormData,
                szResponseText: e.target.value,
              });
            }}
          />
        </Form.Group>

        {/* 
        <Form.Group className={styles.setinputwidth1} controlId="">
          <Form.Label>Subtext (optional):</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter option sub text here"
            value={optionFormData.szResponseDesc}
            onChange={(e) => {
              setOptionFormData({
                ...optionFormData,
                szResponseDesc: e.target.value,
              });
            }}
          />
        </Form.Group> 
        */}

        <Form.Group className={styles.setinputwidth1} controlId="">
          <Form.Label>
            {currentAssesment && currentAssesment.m_nAssessmentType !== 1
              ? "Assigned Points:"
              : "Assigned Bands:"}
          </Form.Label>
          {currentAssesment && currentAssesment.m_nAssessmentType !== 1 ? (
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setOptionFormData({
                  ...optionFormData,
                  mapBands: [e.target.value],
                });
              }}
              value={optionFormData && optionFormData["mapBands"][0]}
            >
              {ratingBand &&
                Object.keys(ratingBand).map(
                  (key, jindex) =>
                    ratingBand[key].m_nIsScoringBand === 1 && (
                      <option
                        value={ratingBand[key].m_nRatingScaleSeqNum}
                        key={jindex}
                      >
                        {" "}
                        {ratingBand[key].m_sMappedPoints} points{" "}
                      </option>
                    )
                )}
            </Form.Select>
          ) : (
            <div className="optionmultiselect">
              <Multiselect
                options={options}
                displayValue="key"
                showCheckbox={true}
                placeholder=""
                selectedValues={selectedOption}
                onSelect={(selectedArgs) => {
                  let arr = [];
                  Object.keys(selectedArgs).forEach(function (i) {
                    arr.push(selectedArgs[i].val);
                  });
                  handleUptionOption(arr);
                }}
                onRemove={(selectedArgs) => {
                  let arr = [];
                  Object.keys(selectedArgs).forEach(function (i) {
                    arr.push(selectedArgs[i].val);
                  });
                  handleUptionOption(arr);
                }}
              />
            </div>
          )}
        </Form.Group>


        {obj && obj.m_lResponseId > 0 && 
          <> <p>(image optional)</p>
          <ImageAddEdit
            //setCurrentObject={handleUpdateOptionImage}
            //setCurrentData={obj}
            oMedia={obj.m_oMedia}
            nPurposeType={4}
            lPurposeId={obj.m_lResponseId}
            handleImageUpdate={handleResponseImageUpdate}
          />
          </>
        }

        <div className={styles.hideoptionbtn}>
          <button
            type="button"
            onClick={() => handleSaveOption(optionFormData)}
          >
            Save
          </button>
        </div>



      </div>
    </div>
  );
}
export default AddNewOptionRC;
