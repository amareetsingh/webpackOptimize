import React, { useCallback, useEffect, useState } from "react";
import styles from "./settingstyle.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { functionService } from "../../Context/functions";
import { useParams } from "react-router-dom";
import Toaster from "../../Components/Toaster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheckCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

function Points(props) {
  //console.log("props.currentAssesment", props.currentAssesment);
  const [open] = useState(true);
  const [errors, setErrors] = useState({});
  const [pointsList, setPointsList] = useState({});
  const [handleInput, setHandleInput] = useState("");
  const [ratingBandId, setRatingBandId] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [message, setMessage] = useState("Some error occurs!");
  const params = useParams();
  // const getPointScore = useCallback(async () =>  {
  //    let res = await functionService.post('ScoringPoints/getAllScoringPoints',{"lAssessmentId": params.id});
  //    if(res !== false && res.status !== false){
  //     let data = JSON.parse(res.data.data.result);
  //     console.log("resk",setPointsList(data.m_dictRatingScales));
  //     setPointsList(data.m_dictRatingScales);
  //     // setPointsList({...props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales}}
  /*console.log("ratingscale", props.currentAssesment &&
      props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales
  );*/
  //    }else{
  //     if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
  //         localStorage.removeItem('currentUser');
  //         localStorage.removeItem('token');
  //         window.location = "/login";
  //         return;
  //       }
  //    }

  // },[params])

  const getPointScore = useCallback(async () => {
    if (props.currentAssesment !== undefined) {
    //   let listItem 
      if (props.currentAssesment.m_oRatingScalesGroup) {
        setPointsList(
          props.currentAssesment &&
      props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales 
        );
      }
    }
  });

  useEffect(() => {
    getPointScore();
  }, [params, getPointScore]);
  const handleAdd = async () => {
    let data = functionService.validateError({ fPoints: handleInput });
    if (Object.keys(data).filter((x) => data[x] === true).length > 0) {
      setErrors(data);
      return;
    } else {
      setErrors({});
    }
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    props.setLoader(true);
    let res = await functionService.post("ScoringPoints/save", {
      assessmentId: params.id,
      userId: 0,
      lRatingBandId: ratingBandId,
      szBandName: "dummy",
      fPoints: handleInput,
    });
    if (res !== false && res.status !== false) {
      setHandleInput("");
      setShowToast(true);
      setDisabled(false);
      getPointScore();
      
      props.setCurrentAssesment({
        ...props.currentAssesment,
        m_oRatingScalesGroup: JSON.parse(res.data.data.result),
      });
      setPointsList( props.currentAssesment &&
        props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales);
      //  console.log("current",props.currentAssesment);
    } else {
      setMessage(res.data.data.result);
      // console.log(res.data.data.result)
      setShowToast1(true);
      if (
        res.error &&
        res.error.response &&
        res.error.response.status === 401 &&
        localStorage.getItem("currentUser")
      ) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.location = "/login";
        return;
      }
    }
    props.setLoader(false);
  };

  const handleEdit = (point, id) => {
    setHandleInput(point);
    setRatingBandId(id);
  };
  const handleCancel = () => {
    setHandleInput("");
    setRatingBandId(0);
  };
  //    console.log("pointsList",pointsList)
  return (
    <>
      <div className={styles.Ratingbandsdetails}>
        <div className={styles.ratingbandsdetailsinnerbody}>
          <div className={styles.mianboxratingbands}>
            <div className={styles.mianboxheaderratingbands}>
              <h4>Points</h4>
              {/*<div className={styles.rightsideeditremove}>
                                <a  className={styles.btn_skyblue} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>Add Points</a>
    </div>*/}
            </div>
            <div className={styles.mianboxinnerbodyratingbands}>
              <p>
                Rather than typing in points for every question response, just
                specify them here and assign them to the response options as you
                create them. We have included some preset values below for your
                convenience. Edit them or add to them as you need to. e.g. if
                you need a negative score for some options.
              </p>
            </div>
            <div className={styles.pointsadd_main}>
              <h4>Points</h4>
              <Form>
                {Object.keys(pointsList).map((obj, index) => (
                  <div key={index}>
                    {pointsList[obj].m_nIsScoringBand === 1 && (
                      <Form.Group
                        key={index}
                        className={styles.formgrouppoints}
                        controlId="formBasicEmail"
                      >
                        <label>
                          Score Point : {pointsList[obj].m_sMappedPoints}
                        </label>
                        {/* <img onClick={()=>{handleEdit(pointsList[obj].m_sMappedPoints,pointsList[obj].m_lRatingScaleId)}} className={styles.banneredit}  src={edit_image} alt="edit_image"/> */}
                        <span
                          className={styles.banneredit}
                          onClick={() => {
                            handleEdit(
                              pointsList[obj].m_sMappedPoints,
                              pointsList[obj].m_lRatingScaleId
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} size={"sm"} />
                        </span>
                      </Form.Group>
                    )}
                  </div>
                ))}
              </Form>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  <div className={styles.addclosepointsmain}>
                    <Form>
                      <Form.Group
                        className={styles.formgrouppoints1}
                        controlId="formBasicEmail"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter Point"
                          value={handleInput}
                          onChange={(e) => {
                            setHandleInput(e.target.value);
                          }}
                        />
                        {errors && errors.hasOwnProperty("fPoints") && (
                          <p className="error errcont">
                            Please fill required field!
                          </p>
                        )}
                      </Form.Group>
                      <Button
                        className={styles.btn_skyblue}
                        onClick={handleAdd}
                      >
                        {ratingBandId === 0 ? "Add New" : "Update"}
                      </Button>
                      {ratingBandId !== 0 && (
                        <Button
                          className={styles.btn_cancel}
                          onClick={handleCancel}
                        >
                          {" "}
                          Cancel
                        </Button>
                      )}
                    </Form>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        showtoast={showtoast}
        toggleShowToast={toggleShowToast}
        bgclass="success"
        status="Success"
        message="Updated Successfully!!"
        toasticon={faCheckCircle}
      />
      <Toaster
        showtoast={showtoast1}
        toggleShowToast={toggleShowToast1}
        bgclass="danger"
        status="Error"
        message={message}
        toasticon={faBan}
      />
    </>
  );
}

export default Points;
