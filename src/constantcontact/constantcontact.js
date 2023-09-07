import {useLocation,useHistory} from "react-router-dom";
// import styles from '../Pages/Settings/settingstyle.module.css';
import Footer from '../Components/Footer';
import { Container, Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { functionService } from "../Context/functions";
import Toaster from "../Components/Toaster";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import styles from "../Pages/Pricing/pricing.module.css"

function ConstantContact() {
  // const params = useParams();
  const history = useHistory();
  
  const [message, setMessage] = useState("Wrong Credentials");
  const [disabled, setDisabled] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);
  const [showWait, setShowWait] = useState(true);
  const search = useLocation().search;
  //alert(search);
  const code = new URLSearchParams(search).get("code");
  const state = new URLSearchParams(search).get("state");


  const saveConstantContactSettings = async () => {
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    let KeyValue = {
        lAssessmentId: state,
        nProviderId: 3,
      dictSettings: {
        10: code
      },
    };

    // props.setLoader(true);
    let res = await functionService.post(
      "Provider/saveProviderSettings",
      KeyValue
    );
    if (res.status === true) {
        setShowToast(true);
        setShowWait(false);
        // history.push(
        //     "/dashboard" 
        //   );
    } else {
      if (res.hasOwnProperty("data")) {
      }
      setShowToast1(true);
    }
    // props.setLoader(false);
  };
 
 useEffect(() => {
  saveConstantContactSettings();
  }, []);

  return (
    <div>
      <div style={styles.container}>
        <div className={styles.pricing_top}>
          <Container >

            <h2>Your Contact Contact settings are being saved..</h2>
            {/* <p>Engage like an expert should. Upgrade each customer touchpoint into a conversation.</p> */}

            {!showWait && 
            <><br></br><h2>Done! You may close this tab.</h2></>
            }
            {/* <Row style={{paddingTop:'100px'}} >					
						<Button style={{height:'60px'}} onClick={saveConstantContactSettings} className={styles.btntrial}>Continue With Dashboard </Button> 
					  </Row> */}

          </Container >
        </div>
			<div >
		</div>
		{/* <Footer/> */}
		</div>
        {/* <Toaster
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
      /> */}
    </div>
  );
}

export default ConstantContact;