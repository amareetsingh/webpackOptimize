import React, { useState, useef } from "react";
import styles from "./settingstyle.module.css";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Ratingbands from "./Ratingbands";
import Options from "./Options";
import Points from "./Points";
import Dimensions from "./Dimensions";
import Promotions from "./Promotions";
import Colors from "./Colors";
import Profilefileds from "./Profilefileds";
import Integration from "./Integration";

function Setting(props) {
  const [settingActiveTab, setSettingActiveTab] = useState(0);

  const handleSelect = (key) => {
    setSettingActiveTab(key);
  };
  // console.log('props....',props)
  return (
    <>
      {props.currentAssesment && (
        <div className={styles.Settingpagemain}>
          <Container className={styles.Settingcontainer}>
            <div className={styles.settingmiantabs}>
              <Tabs
                defaultActiveKey={
                  // props.currentAssesment.m_nAssessmentType !== 3
                  //   ? "Ratingbands"
                  //   : "Dimensions"
                  "Options"
                }
                id="uncontrolled-tab-example"
                className={styles.customnavbarUl}
                onSelect={handleSelect}
              >
                {/* {props.currentAssesment.m_nAssessmentType !== 3 && (
                  <Tab
                    eventKey="Ratingbands"
                    title="Rating Bands"
                    className={styles.customnavbarli}
                  >
                    <Ratingbands
                      currentAssesment={props.currentAssesment}
                      setLoader={props.setLoader}
                      setCurrentAssesment={props.setCurrentAssesment}
                    />
                  </Tab>
                )} */}

                {/* <Tab eventKey="Dimensions" title="Dimensions">               
                  <Dimensions
                  settingActiveTab={settingActiveTab}
                    setLoader={props.setLoader}
                    currentAssesment={props.currentAssesment}
                    setCurrentAssesment={props.setCurrentAssesment}
                  />                
                </Tab> */}
                <Tab eventKey="Options" title="Options">
                  {/* {settingActiveTab === "Options" && ( */}
                    <Options
                      settingActiveTab={settingActiveTab}
                      setLoader={props.setLoader}
                      currentAssesment={props.currentAssesment}
                      setCurrentAssesment={props.setCurrentAssesment}
                    />
                  {/* )} */}
                </Tab>


                {props.currentAssesment &&
                  props.currentAssesment.m_nAssessmentType !== 1 &&
                  props.currentAssesment.m_nAssessmentType !== 3 && (
                    <Tab eventKey="Points" title="Points">
                      {settingActiveTab === "Points" && (
                        <Points
                          settingActiveTab={settingActiveTab}
                          setLoader={props.setLoader}
                          currentAssesment={props.currentAssesment}
                          setCurrentAssesment={props.setCurrentAssesment}
                        />
                      )}
                    </Tab>
                  )}


                <Tab eventKey="Profilefileds" title="Profile Fields">
                  <Profilefileds
                    setLoader={props.setLoader}
                    currentAssesment={props.currentAssesment}
                    setCurrentAssesment={props.setCurrentAssesment}
                  />
                </Tab>
                <Tab eventKey="Promotions" title="Promotions">
                  {/* {settingActiveTab === "Color" && ( */}
                  <Promotions
                    //   settingActiveTab={settingActiveTab}
                    setLoader={props.setLoader}
                    currentAssesment={props.currentAssesment}
                    setCurrentAssesment={props.setCurrentAssesment}
                  />
                  {/* )} */}
                </Tab>
                <Tab eventKey="Color" title="Colors">
                  {settingActiveTab === "Color" && (
                    <Colors
                      settingActiveTab={settingActiveTab}
                      loader={props.loader}
                      setLoader={props.setLoader}
                      currentAssesment={props.currentAssesment}
                      setCurrentAssesment={props.setCurrentAssesment}
                    />
                  )}
                </Tab>
                <Tab eventKey="Integration" title="Integrations">
                    <Integration
                     currentAssesment={props.currentAssesment}
                     setCurrentAssesment={props.setCurrentAssesment}
                      setLoader={props.setLoader}
                    />
                </Tab>
              </Tabs>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Setting;
