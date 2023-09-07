import React, { useEffect, useState } from "react";
import styles from "./settingstyle.module.css";
//import { CONSTANT_CONTACT_CLIENT_ID, CONSTANT_CONTACT_REDIRECT_URI } from "../../Components/API";
//import { HUBSPOT_CLIENT_ID, HUBSPOT_REDIRECT_URI } from "../../Components/API";
import ConstantContactSetup from "../../Integrations/constantcontactsetup";
import HubspotSetup from "../../Integrations/hubspotsetup";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { useLocation } from "react-router-dom";
import { functionService } from "../../Context/functions";
import { Button } from "react-bootstrap";
import ConfirmModal from "../../Components/Confirmmodal/ConfirmModal";
import Toaster from "../../Components/Toaster";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import zapierImg from "../../assets/images/zapier.png";
import MailerLiteImg from "../../assets/images/mailerlitelogo.png";
import constantImg from "../../assets/images/Constant-contact-logo.png";
import HubspotImg from "../../assets/images/hubspotlogo.jpg"
// import ConstantContact from "../../constantcontact/constantcontact";
import Zapier from './Zapier'

function Integration2(props) {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [row, setRow] = useState({ status: false, id: 0, name: "" });
  const [providerList, setProviderList] = useState();
  const [disabled, setDisabled] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [message, setMessage] = useState("Wrong Credentials");
  const [apiKey, setApiKey] = useState([]);
  const [zapieropen, setZapierOpen] = useState(false)
  var setting;
  // const history = useHistory();
  let obj1;
  const getProviderList = async () => {
    let res = await functionService.post("Provider/getProviderList", {
      lAssessmentId: params.id,
      userId: 0,
    });
    if (res !== false && res.status !== false) {
      let data = JSON.parse(res.data.data.result);
      setProviderList(data);
    } else {
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
  };

  useEffect(() => {
    getProviderList();
  }, [params]);

  const handleMoal = async (status, mapStatus, id, name) => {
    if (id === 11 || id === 6 || id === 7 || id === 3) {
      setShow(status);
      setRow({ status: mapStatus, id: id, name: name });
    }
  };
 
  const handleSubmit = async () => {
    if (disabled === true) {
      return;
    }
    setDisabled(true);
    props.setLoader(true);
    let data = {
      lAssessmentId: params.id,
      nToolType: 1,
      nProviderId: row.id,
    };

    let url = "Provider/mapProvider";
    if (row.status === true && row.id === 11) {
      url = "Provider/generateZapierKey";
    }
    let res = await functionService.post(url, data);

    if (res !== false && res.status !== false) {
      let result = await functionService.post(
        "Provider/getProviderSettings",
        data
      );
      if (result !== false && result.status !== false) {
        let data = JSON.parse(res.data.data.result);
        setShowToast(true);
        setGeneratedKey(data[0]["m_szKeyValue"]);
        getProviderList();
        //console.log("ProviderSettings", data)
      } else {
        setMessage(result.data.data.result);
        setShowToast(true);
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
    }
    setDisabled(false);
    setShow(false);
    props.setLoader(false);
  };

  const saveMailerLiteSettings = async (providerId, key, apiKey) => {
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    let KeyValue = {
      lAssessmentId: parseInt(params.id),
      nProviderId: providerId,
      dictSettings: {
        70: apiKey,
      },
    };
    props.setLoader(true);

    let res = await functionService.post(
      "Provider/saveProviderSettings",
      KeyValue
    );
    if (res.status === true) {
      setShowToast(true);
    } else {
      if (res.hasOwnProperty("data")) {
        // (res.data.data.result);
      }
      setShowToast1(true);
    }
    props.setLoader(false);
  };

  const handleApiKey = (e) => {
    setApiKey(e.target.value);
  };
  //console.log("object", providerList);
  return (
    <div className={styles.providerList}>
      <ul>
        {providerList &&
          providerList.map((obj, index) => {
            return (
              
              <li
                className={
                  obj.m_bIsMapped === false
                    ? styles.providerItem
                    : styles.providerItemSetting
                }
                key={index}
              >
                {obj.m_bIsMapped === false ? (
                  <>
                    <div>
                      {obj.m_nProviderId === 11 && (
                        <img
                          className={styles.providerImgDiv}
                          src={zapierImg}
                          alt="zapierImg"
                        />
                      )}
                      {obj.m_nProviderId === 7 && (
                        <img
                          className={styles.providerImgDiv}
                          src={MailerLiteImg}
                          alt="MailerLiteImg"
                        />
                      )}
                      {obj.m_nProviderId === 3 && (
                        <img
                          className={styles.providerImgDiv}
                          src={constantImg}
                          alt="constantImg"
                        />
                      )}
                      {obj.m_nProviderId === 6 && (
                        <img
                          className={styles.providerImgDiv}
                          src={HubspotImg}
                          alt="Hubspot"
                        />
                      )}

                      <br></br>

                      <Button
                          onClick={() =>
                            handleMoal(
                              true,
                              obj.m_bIsMapped,
                              obj.m_nProviderId,
                              obj.m_szProviderName
                            )
                          }
                        >
                          {" "}
                          Set As Provider{" "}
                        </Button>

                          
                    </div>
                     
                     
                     {/* <div className={styles.providerSetButton}>
                      <br />
                      <Button
                        onClick={() =>
                          handleMoal(
                            true,
                            obj.m_bIsMapped,
                            obj.m_nProviderId,
                            obj.m_szProviderName
                          )
                        }
                      >
                        {" "}
                        Set As Provider{" "}
                      </Button>
                    </div>
                     */}

                    {/* {obj.m_nProviderId === 7 && (
                    <div>
                        <img style={{width:'400px',height:'170px'}} src={MailerLiteImg} />
                      <Button
                        onClick={() =>
                          handleMoal(
                            true,
                            obj.m_bIsMapped,
                            obj.m_nProviderId,
                            obj.m_szProviderName
                          )
                        }
                      >
                      {" "}
                      Set As Provider{" "}
                    </Button>
                  </div>
                
                  )} */}
                  
                  </>
                ) : (
                  <div>
                    {/* <span className={obj.m_szProviderName.replaceAll(" ", "")}>
                    View Settings {obj.m_szProviderName}
                  </span> */}
                  
                    <div className={styles.connectedAccount}>
                    {/* <Button onClick={() => setZapierOpen(true)}>open zapier setting</Button>
                    {zapieropen ?<Zapier/>: null} */}

                      {obj.m_nProviderId === 11 ? (
                       <>
                       <div>
                        <Button onClick={() => zapieropen ? setZapierOpen(false) : setZapierOpen(true)}>{zapieropen ? "Close Zapier Settings" : "Open Zapier Settings" }</Button>
                        {zapieropen ?<Zapier/>: null}
                       </div>
                      
                      <div className={styles.providerMainDiv}>
                          <div className={styles.providerImgDiv}>
                            <img
                              className={styles.providerImgDiv}
                              src={zapierImg}
                              alt="zapierImg"
                            />
                          </div>
                          <p>Zapier has been set as your provider.</p>
                         
                          { (obj.listProviderSettings.length === 0 || obj.listProviderSettings[0].m_szKeyValue =='') ? (
                            <>

                              <p>
                                Click the button below to generate a new key.
                                You will use this key to set up your Zapier
                                integration. Do NOT share this with anyone.
                              </p>
                              
                              <Button
                                onClick={() =>
                                  handleMoal(
                                    true,
                                    obj.m_bIsMapped,
                                    obj.m_nProviderId,
                                    obj.m_szProviderName
                                  )
                                }
                              >
                                Generate Zapier Key
                              </Button>
                            </>
                            
                            )  : (
                            <div className={styles.zapierDiv}>
                              <p className={styles.api_key}>
                                <label>API Key (do NOT share this with anyone): </label><br/>{" "}
                                {obj.listProviderSettings[0].m_szKeyValue}
                              </p>
                              <Button
                                onClick={() =>
                                  handleMoal(
                                    true,
                                    obj.m_bIsMapped,
                                    obj.m_nProviderId,
                                    obj.m_szProviderName
                                  )
                                }
                              >
                                Reset Zapier Key
                              </Button>
                              <p className={styles.api_key}>
                                Note: You will have to authenticate your zapier
                                connection again.
                              </p>
                              {generatedKey !== "" && (
                                <p className={styles.copyKey}>
                                  Copy Your Key : <label>{generatedKey}</label>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        </> 
                        )  : (
                        " "
                      )}

                      {obj.m_nProviderId === 7 && (
                        <div className={styles.providerMainDiv}>
                          <div className={styles.providerImgDiv}>
                            <img
                              className={styles.providerImg}
                              src={MailerLiteImg}
                              alt="MailerLiteImg"
                            />
                          </div>
                          <div>
                            <p>MailerLite is set as your provider!</p>
                            <br />
                            <p className={styles.api_key}>
                              <label>
                                Enter your API Key from MailerLite here:{" "}
                              </label>
                            </p>
                            <br />
                            <input
                              size="40"
                              onChange={(e) => handleApiKey(e, "m_szKeyValue")}
                              defaultValue={
                                obj.listProviderSettings[0].m_szKeyValue
                              }
                              placeholder="Enter your Api Key"
                              className={styles.inputApi_key}
                              type="text"
                            />
                            <br />
                            <br />
                            <b>Important:</b> Copy & create the following
                            contact field in MailerLite under{" "}
                            <i>Subscribers - Fields</i>
                            <br />
                            <br />
                            <ol>
                              <li>integration_source</li>
                            </ol>
                            <br />
                            <b>Why?&nbsp;</b>When a contact is created or
                            updated in MailerLite from this assessment in
                            Evalinator, the <i>integration_source</i> field will
                            have the value{" "}
                            <i>Evalinator - *your assessment name*</i>. You can
                            define automations based on this field. e.g. move
                            subscriber to a new group to trigger an email
                            sequence.
                            <br />
                            <br></br>
                            <Button
                              onClick={(e) => {
                                saveMailerLiteSettings(
                                  obj.m_nProviderId,
                                  obj.listProviderSettings[0].m_nConfigKeyId,
                                  apiKey
                                );
                              }}
                            >
                              Save{" "}
                            </Button>
                          </div>
                        </div>
                      )}

                      {obj.m_nProviderId === 3 && (
                       
                       <ConstantContactSetup
                        obj={obj}
                        params={params}
                        styles={styles}
                        constantImg={constantImg}
                     />    
                       
                      //  <div className={styles.providerMainDiv}>
                      //     <div className={styles.providersImgDiv}>
                      //       <img
                      //         width="300px"
                      //         src={constantImg}
                      //         alt="constantImg"
                      //       />
                      //     </div>
                      //     <div className={styles.ConstantDiv}>
                      //       <p>Constant Contact is set as your provider!</p>

                      //       {obj1 = Object.keys(obj.listProviderSettings).filter((setting) => setting.m_nConfigKeyId === 10)}
                            
                      //       <div className={styles.ConstantButtonDiv}>
                      //         <a
                      //           target="_blank" 
                      //           onclick="return window.confirm('Are you sure you want to reset the connection?')" 
                      //           href={`https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=${CONSTANT_CONTACT_CLIENT_ID}&redirect_uri=${CONSTANT_CONTACT_REDIRECT_URI}&response_type=code&scope=contact_data%20campaign_data%20offline_access&state=${params.id} `}
                      //         >

                      //           {
                      //             obj1.m_szKeyValue === '' ? 
                      //             <>
                      //             <p>To configure Constant Contact, click the button below. You will be taken to Constant Contact. Please login and authorize Evalinator to send contact data.</p>
                      //             <Button onclick="return window.confirm('Are you sure you want to reset the connection?')" > Connect </Button> 
                      //             </>
                      //             : 
                      //             <>
                      //             <p>You have previously authorized Constant Contact and NO action is needed. However, if your information has changed, then please click "Reset" below. You will be taken to Constant Contact. Please login and authorize Evalinator to send contact data.</p>
                      //             <Button onclick="return window.confirm('Are you sure you want to reset the connection?')" > Reset </Button>
                      //             </>
                      //           }

                      //         </a>
                      //       </div>
                      //     </div>
                      //   </div>
                      )}

                      {obj.m_nProviderId === 6 && (
                      
                      <HubspotSetup
                      obj={obj}
                      params={params}
                      styles={styles}
                      HubspotImg={HubspotImg}
                   />    

                      /*    
                        <div className={styles.providerMainDiv}>
                          <div className={styles.providersImgDiv}>
                            <img
                              width="300px"
                              src={HubspotImg}
                              alt="Hubspot"
                            />
                          </div>
                          <div className={styles.ConstantDiv}>
                            <p>Hubspot is set as your provider!</p>

                            <div className={styles.ConstantButtonDiv}>
                              <a
                                target="_blank" 
                                onclick="return window.confirm('Are you sure you want to reset the connection?')" 
                                href={`https://app.hubspot.com/oauth/authorize?client_id=${HUBSPOT_CLIENT_ID}&redirect_uri=${HUBSPOT_REDIRECT_URI}&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.lists.read%20crm.lists.write&state=${params.id}`}
                              >

                                {obj1 = Object.keys(obj.listProviderSettings).filter((setting) => setting.m_nConfigKeyId === 60)}
                                {
                                  obj1.m_szKeyValue === '' ? 
                                  <>
                                  <p>To configure Hubspot, click the button below. You will be taken to Hubspot. Please login and authorize Evalinator to send contact data to Hubspot.</p>
                                  <p>Important: Please also create a new field with name "<b>integration_source</b>" in HubSpot. This will contain the latest Evalinator quiz or assessment the contact has responsed to, and  will allow you to run  any automations in HubSpot based on this information. e.g. send a custom email as soon as the quiz or assessment is complete, or add them to a specific nurturing flow. </p>
                                  <Button onclick="return window.confirm('Are you sure you want to reset the connection?')" > Connect </Button> 
                                  </>
                                  : 
                                  <>
                                  <p>You have previously authorized Hubspot and NO action is needed. However, if your information has changed, then please click "Reset" below. You will be taken to Hubspot. Please login and authorize Evalinator to send contact data.</p>
                                  <Button onclick="return window.confirm('Are you sure you want to reset the connection?')" > Reset </Button>
                                  </>
                                }

                              </a>
                            </div>
                          </div>
                        </div>
                        */
                      )}
                    </div>
                  </div>
                  
                )}
              </li>
            );
          })}
      </ul>
      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        handleAction={handleSubmit}
        data={"0"}
      />
      <Toaster
        showtoast={showtoast}
        toggleShowToast={toggleShowToast}
        bgclass="success"
        status="Success"
        message="Your settings have been saved successfully."
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

      {/* <Modal show={show} onHide={() => setShow(false)} className={styles.modalZapierTemplete}>
                <Form method="post">
                    <div className={styles.modalZapierBody}>
                        <Image src={WarningIcon} alt='icon' />
                        <h2>Are you sure  you want to  {row.status === false ? 'integrate ' : "reset "} {row.name}? </h2>
                        <Button className= {styles.closebtn} type="button" onClick={() => setshow(false)}> Cancel</Button>
                        <Button variant="danger" type="button" onClick={handleSubmit}>Confirm</Button>
                        
                    </div>
                </Form>
            </Modal> */}
    </div>
  );
}

export default Integration2;