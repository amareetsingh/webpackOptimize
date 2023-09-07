import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { useHistory } from "react-router-dom";
import { functionService } from "../../Context/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../Components/Confirmmodal/ConfirmModal";
import Toaster from "../../Components/Toaster";
import LinkedAssessmentPopup from './LinkedAssessmentPopup'
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Collapse from "react-bootstrap/Collapse";
import { Row } from "react-bootstrap";
function Respondent(props) {
  const history = useHistory();
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const handleCloseFeedback = () => setShowfeedback(false);
  const [showfeedback, setShowfeedback] = useState(false);
  const [open, setOpen] = useState(false);

  const [predefinedValue, setPredefinedValue] = useState()
  const handleShowFeedback = (obj) => {
    setPredefinedValue(obj)
    setShowfeedback(true)

  };

  const handleDelete = () => {
    setShow(true);
  };

  const handleAction = async () => {

    setDisabled(true);
    props.setLoader(true);
    let res = await functionService.post('Assessment/removeLinkedAssessment', {
      lEvalinatorId: props.obj.m_lEvalinatorId,
      szName: props.obj.m_szEvalinatorName,
      szDesc: '',
      nChartType: props.obj.m_nChartType,

    });
    if (res !== false && res.status !== false) {
      setShowToast(true);
      props.getData()
    } else {
      setShowToast1(true);
      setMessage(res.error.response.result);
    }
    setDisabled(false);
    props.setLoader(false);
    setShow(false);
    // props.setDeleted(new Date().getTime());
  };
  const dateFormatter = (dt) => {
    var date = new Date(dt + "Z");
    var options = { year: "numeric", month: "short", day: "2-digit" };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .replace(/ /g, "-");
  };

  const m_dictDimensions = props.obj && props.obj.m_dictDimensions && Object.keys(props.obj.m_dictDimensions);
  return (
    <>
      <Toaster
        showtoast={showtoast}
        toggleShowToast={toggleShowToast}
        bgclass="success"
        status="Success"
        message="Deleted Successfully!!"
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
      <div className={styles.rowsection} >
        <div className={styles.scored_status}>
          <p >Dimensions:{props.obj.m_nNumDimensions}</p>
          <span>Assessments: {props.obj.m_nNumAssessments}</span>

        </div>
        <div className={styles.content_btn}>
          <button onClick={() => handleShowFeedback(props.obj, 1
          )}
            className={styles.edit_btn} >
            <FontAwesomeIcon icon={faEdit} size={"sm"} />
            <span className={styles.toolstip}  >Edit</span>
          </button>
          <button className={styles.trash_btn} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} size={"sm"} />
            <span className={styles.toolstip}>Delete</span>
          </button>
          <button
            className={styles.analytic_btn}
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <FontAwesomeIcon icon={faChartLine} className="me-1" />{" "}
            <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
            <span className={styles.toolstip}>Analytics</span>
          </button>

        </div>
      </div>
      <Collapse in={open} className={styles.dashanalytics}>

        <div  id="example-collapse-text">
          <Row className="align-items-center">
            {
              props.obj && Object.values(props.obj.m_dictDimensions).map((value, index) => (

                <ul className={styles.assessmentUL}>
                  <div className={styles.assessmentContainer}>

                      {
                        value?.m_listTools?.map((obj1, index) => (
                          <div className={styles.assessmentContent}  >
                            <div className={styles.assessmentImg} ><img src={obj1?.m_oMedia?.m_szURL } alt="" /></div>
                            <div className={styles.assessmentName} >
                            <p >{obj1.m_szSurveyName}</p>
                            </div>
                            <div className={styles.assessmentDates} >
                            <span className={styles.date} >Published : {dateFormatter(obj1.m_dtPublished)} </span>
                            </div>
                            <div>
                            <span className={styles.date} >Created Date : {dateFormatter(obj1.m_dtCreated)} </span>
                            </div>
                          </div>
                        ))

                      }
                  </div>
                </ul>
              ))

            }

          </Row>



        </div>
      </Collapse>
      <LinkedAssessmentPopup
        handleClose={handleCloseFeedback}
        setLoader={props.setLoader}
        showfeedback={showfeedback}
        predefinedValue={predefinedValue}
        m_dictDimensions={m_dictDimensions}
        setShowfeedback={setShowfeedback}
        m_listTools={props.obj.m_listTools}
        getData={props.getData}

      />

      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        handleAction={handleAction}
        data={"0"}
      />

    </>


  );
}

export default Respondent;
