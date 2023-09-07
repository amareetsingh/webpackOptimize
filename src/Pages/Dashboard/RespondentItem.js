import React, { useState, useEffect, useRef } from "react";
import styles from "./dashboard.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../Components/Confirmmodal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { functionService } from "../../Context/functions";
import Toaster from "../../Components/Toaster";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import dot from '../../assets/images/dot.svg';
import Form from 'react-bootstrap/Form';

function RespondentItem(props) {
  const [message, setMessage] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showss, setShowss] = useState({ id: 'null', status: false });
  const [dateKey, setDateKey] = useState()
  const manuRef = useRef();
  const inputRef = useRef(null);


  const dateFormatter = (dt) => {
    var date = new Date(dt + "Z");
    var options = { year: "numeric", month: "short", day: "2-digit" };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .replace(/ /g, "-");
  };

  useEffect(() => {
    setDateKey(inputRef.current.value)
    let handler = (e) => {
      if (!manuRef.current.contains(e.target)) {
        setShowss(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleDelete = () => {
    setShow(true);
  };
  // console.log("props.respondentList",props.respondentList)
  // console.log("props.respondentList",props.setRespondentList)

  const handleActionRemoveRespondent = async () => {
    if (disabled === true) {
      return;
    }
    setDisabled(true);
    props.setLoader(true);
    setShow(false);
    let res = await functionService.post("Assessment/removeRespondent", {
      lAssessmentId: props.lAssessmentId,
      lRespondentId: props.obj.m_oRespondent.m_lUserId,
    });
    // console.log("object", props)
    if (res !== false && res.status !== false) {
      setShowToast(true);
      setShowContent(false);

      /* // too expensive as number increases    
      let rlist = props.respondentList;
      rlist = rlist.filter((respondent) => respondent.m_oRespondent.m_lUserId !== props.obj.m_oRespondent.m_lUserId)
      props.setRespondentList(rlist);
       */
    } else {
      setShowToast1(true);
      setMessage(res.data.message);
    }
    setDisabled(false);
    props.setLoader(false);
    props.setDeleted(new Date().getTime());
  };

  return (

    <div>
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
      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        handleAction={handleActionRemoveRespondent}
        data={"0"}
      />
      {showContent ?
        <div>
          <div className={styles.innerlistgoals}>
            <div className={styles.listleftside}>
              <div className={styles.listleftsidein}>
                <h3>
                  {`${props.obj.m_oRespondent.m_szFirstName} ${props.obj.m_oRespondent.m_szLastName}`}{" "}
                </h3>
                <p className={styles.goalsCounter}>
                  {props.obj.m_nNumGoalsSet} Goals
                </p>
              </div>
              <div ref={manuRef} className={styles.btnDiv}>
                <p className={styles.completedgoals}>
                  {/* {props.obj.m_bIsComplete ? "Completed " : "Not Completed"} */}
                  <Form.Select ref={inputRef} onChange={(e) => setDateKey(e.target.value)} aria-label="Select date" style={{ width: '150px' }}>


                    {


                      Object.entries(props.obj.dictSubmissions).sort((a, b) => a > b ? 1 : -1).reverse().map(([key, items]) => (
                        <option value={key}> {dateFormatter(items)} </option>
                      ))
                    }


                  </Form.Select>

                  {/* {dateFormatter(props.obj.m_dtDateTaken)}
                {console.log("props.obj", props.obj)} */}
                </p>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`/analyticsresult?id=${props.lAssessmentId}&respondId=${props.obj.m_oRespondent.m_lUserId}&nIterationId=${dateKey}`}
                  className={styles.view_link}
                >
                  View{" "}
                </a>
                {
                  props.user &&
                  props.user.oUser &&
                  props.user.oUser.m_nUserType === 1 && (
                    <img src={dot} className={styles.dotbtn} alt='logo' onClick={() => setShowss({ id: props.obj.m_oRespondent.m_lUserId, status: !showss.status })} />)}

                {showss.status && props.obj.m_oRespondent.m_lUserId === showss.id ? <div style={{right:'-36px', top:'35px'}} className={styles.btnGroup} >
                  <div className={styles.btnItems}>
                    <a onClick={handleDelete}>Remove</a>
                  </div>

                </div> : null
                }




              </div>
            </div>
            <div className={styles.listbottomside}>
              <p>
                <span>{props.obj.m_oRespondent.m_szUserEmailAddress}</span>
              </p>


              {/* <p className={styles.completedgoals}>
                {props.obj.m_bIsComplete ? "Completed " : "Not Completed"}
                <Form.Select aria-label="Select date" style={{ width: '256px' }}>

      

           {    
          Object.values(props.obj.dictSubmissions).map((items)=>(
            <option value='hello'> {dateFormatter(items) } </option>

           ))          
           }
               </Form.Select>

                 {dateFormatter(props.obj.m_dtDateTaken)}
                {console.log("props.obj", props.obj)} 
              </p> */}

            </div>
          </div>
          <hr />
        </div> : "Removed"}
    </div>
  );
}

export default RespondentItem;
