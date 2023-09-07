import React, { useEffect, useLayoutEffect, useState } from "react";
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

function Integration(props) {
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

//   useEffect(() => {
//     // Load external script
//     const script = document.createElement("script");
//     script.src = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js"; // js path
//     // script.async = false;
//     document.head.appendChild(script);

//   // Load external CSS
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css"; //  css path
//   document.head.appendChild(link);

//   // Clean up function
//   return () => {
//     document.body.removeChild(script);
//     document.head.removeChild(link);
//   };
// }, []);


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
    else
    {
      setShowToast1(true);
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
      {/* {props.currentAssesment && 
        <p>Custom fields if any will use this identifier: {props.currentAssesment.m_szSurveyDisplayIdentifier}</p>
      } */}

        {providerList &&
            providerList.map((obj, index) => (
              obj.m_bIsMapped === true && (

                <div className={styles.connectedAccount}>

                  {obj.m_nProviderId === 3 && (     
                        <ConstantContactSetup
                          obj={obj}
                          params={params}
                          styles={styles}
                          constantImg={constantImg}
                      />   
                  )}

                  {obj.m_nProviderId === 6 && (      
                      <HubspotSetup
                      obj={obj}
                      currentAssessment={props.currentAssesment}
                      params={params}
                      styles={styles}
                      HubspotImg={HubspotImg}
                   />    
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

                  {obj.m_nProviderId === 11 ? (
                    <>
                      <div>
                        <Button onClick={() => zapieropen ? setZapierOpen(false) : setZapierOpen(true)}>{zapieropen ? "Close Zapier Settings" : "Open Zapier Settings"}</Button>
                        {zapieropen ? <Zapier /> : null}
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

                        {(obj.listProviderSettings.length === 0 || obj.listProviderSettings[0].m_szKeyValue == '') ? (
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

                        ) : (
                          <div className={styles.zapierDiv}>
                            <p className={styles.api_key}>
                              <label>API Key (do NOT share this with anyone): </label><br />{" "}
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
                  ) : (
                    " "
                  )}


                  <br></br><hr></hr>
                </div>

        )))}

      

      <table style={{borderCollapse:'separate',borderSpacing: '0 50px'}}>
        <tbody>
          {providerList &&
            providerList.map((obj, index) => (
              obj.m_bIsMapped === false && (
                <tr key={index} style={{border: '1px solid black'}}>
                  <td className="col-sm-1">{/* Column 1: Empty column */}</td>
                  <td className="col-sm-4">
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
                  </td>
                  <td className="col-sm-2">{/* Column 3: Empty column */}</td>
                  <td className="col-sm-2">
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
                      Set As Provider
                    </Button>
                  </td>
                </tr>
              )
            ))}
        </tbody>
      </table>


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

export default Integration;