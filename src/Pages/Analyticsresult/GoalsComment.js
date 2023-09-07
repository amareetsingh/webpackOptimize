import React, { useState } from "react";
import { functionService } from "../../Context/functions";
import styles from "./analyticsresult.module.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import {
  faBan,
  faCheckCircle,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GoalsComment(props) {
  const [open1, setOpen1] = useState(false);

  const [inputText, setInputText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async () => {
    if (disabled === true) {
      return;
    }
    setDisabled(true);
    props.setLoader(true);

    let defaultFormData = {
      lAssessmentId: props.resultData && props.resultData.lAssessmentId,
      lRespondentId:
        props.resultData &&
        props.resultData.oUser &&
        props.resultData.oUser.m_lUserId,
      nGoalType: props.row.nType,
      lGoalTypeId: props.row.lId,
      lGoalId: props.commentRow.m_lGoalId,
      szGoalUpdateDesc: inputText,
    };

    // changed by manish to get current token
    let additionalToken = functionService.getCurrentToken();
    //let additionalToken = '';
    //if(localStorage.getItem('localAssesmentToken')){ additionalToken=localStorage.getItem('localAssesmentToken');}
    // end manish
    //console.log("User token", additionalToken);
    //console.log("Request data", defaultFormData);

    let res = await functionService.post(
      "Goals/addGoalUpdate",
      defaultFormData,
      additionalToken
    );
    //console.log("returned from adding goal update", res);
    props.getGolas();
    setInputText("");
    setDisabled(false);
    props.setLoader(false);
  };
  return (
    <div>
      {props.commentRow && props.commentRow.m_nGoalStatus != 2 && (
        <Form>
          <Form.Group
            className={styles.lisitngformgroup}
            controlId="formBasicEmail"
          >
            <Form.Control
              type="text"
              placeholder="Post an update"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button onClick={handleSubmit}> Post </Button>
            {props.commentRow.m_listGoalUpdates.length > 0 && (
              <div className="d-flex  align-items-center">
                <span className={styles.analytcounticsListingmanagegoals}>
                  {props.commentRow.m_listGoalUpdates.length}
                </span>

                <span
                  onClick={() => setOpen1(!open1)}
                  className={styles.viewallgoals}
                >
                  <FontAwesomeIcon
                    icon={open1 === false ? faChevronRight : faChevronDown}
                  />
                </span>
              </div>
            )}
          </Form.Group>
        </Form>
      )}
      {props.commentRow.m_listGoalUpdates.length > 0 && (
        <Collapse in={open1}>
          <div>
            {props.commentRow.m_listGoalUpdates.map((commentObj, index) => (
              <div key={index} className={styles.goalslisting}>
                <div className={styles.maincommentsection}>
                  <div className={styles.firsttextname}>S</div>
                  <div className={styles.textnamecollapse}>
                    <p className={styles.commentername}>
                      {commentObj.m_oUpdateByUser.m_szFirstName}{" "}
                      {commentObj.m_oUpdateByUser.m_szLastName}
                    </p>
                    <p>{commentObj.m_szGoalUpdateDesc}</p>
                  </div>
                </div>
                <div className={styles.lasttimegoals}>
                  <p>
                    {functionService.convertDate(commentObj.m_dtGoalUpdateDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
}
export default GoalsComment;
