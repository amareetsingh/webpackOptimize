import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import styles from "./stripe.module.css";
import styless from "../Pages/Pricing/pricing.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Key from "../assets/images/lock.png";
// import Button from '../Components/Button'
import { STRIPE_PUBLISHABLE_KEY } from "../Utils/Consts";
import { useAuthState } from "../Context";
import { functionService } from "../Context/functions";
import  {load}  from 'recaptcha-v3';
import {GOOGLE_RECAPTCHAV3_SITE_KEY} from '../Components/API'
function StripeForm(props) {
  const ref = useRef(null);
  const userDetails = useAuthState();
  const defaultData = {
    szFirstName: "",
    szLastName: "",
    szEmail: Boolean(userDetails.token) ? userDetails.email : "",
    szPassword: "",
    bPrivacy: false,
    bTerms: false,
    szCaptcha: "string",
    szClientIP: "string",
    szStripePriceId:"STARTER",
  };

  const defaultStripeData = {
    priceIdentifier: "STARTER",
    szCaptcha: "string",
    szEmail: Boolean(userDetails.token) ? userDetails.email : "",

};
  //console.log("defaultData",defaultData);
  const [disabled, setDiabled] = useState(false);

  const [show, setShow] = useState(false);
  const [product, setproduct] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(defaultData);
  const [message, setMessage] = useState("");

  const showRegisterForCheckout = (productName) => {
    setShow(true);
    setproduct(productName);
  }

  const getStripeCheckout = async (productName) => {
    setproduct(productName);
    //alert("getting checkout session - " + productName);
    // get session and redirect
    defaultStripeData["priceIdentifier"] = productName;
    const recaptcha = await load(GOOGLE_RECAPTCHAV3_SITE_KEY)
    const token = await recaptcha.execute()
    defaultStripeData["szCaptcha"] = token;

    setMessage("");
    props.setLoader(true);
    let res = await functionService.post("Payment/getStripeSession", defaultStripeData);
    setDiabled(false);
    props.setLoader(false);
    if (res.status !== false) {
      if (res.data.data.statusCode !== 200) {
        setMessage(res.data.data.result);
        return;
      }
      
      // redirect to stripe checkout
      let results = JSON.parse(res.data.data.result);
      let stripeUrl= (results && results.stripeSessionURL) ? results.stripeSessionURL : "";
      if(stripeUrl != ''){
          window.location = stripeUrl;
      }
    }

  }
  
  const handleSubmit = async (e) => {

    const recaptcha = await load(GOOGLE_RECAPTCHAV3_SITE_KEY)
    const token = await recaptcha.execute()
    formData["szCaptcha"] = token;
  
    if (disabled) {
      return;
    }

    let data = functionService.validateError(formData);
    if (formData["bPrivacy"] === false) {
      data["bPrivacy"] = true;
    }
    if (formData["bTerms"] === false) {
      data["bTerms"] = true;
    }

    formData["szStripePriceId"] = product;

    // alert(formData["szStripePriceId"]);

    if (Object.keys(data).filter((x) => data[x] === true).length > 0) {
      setErrors(data);
      return;
    } else {
      setErrors({});
    }

    setDiabled(true);
    setMessage("");
    props.setLoader(true);
    let res = await functionService.post("User/registerUser", formData);
    setDiabled(false);
    props.setLoader(false);
    if (res.status !== false) {
      if (res.data.data.statusCode !== 200) {
        setMessage(res.data.data.result);
        return;
      }
      
      // redirect to stripe checkout
      let results = JSON.parse(res.data.data.result);
      let stripeUrl= (results && results.stripeSessionURL) ? results.stripeSessionURL : "";
      if(stripeUrl != ''){
          window.location = stripeUrl;
      }
      else{ 
          window.location = "/thank-you";
      }

      // require stripe submission
      //window.location = "/thank-you";

      //setShow(false);
      //ref.current.click();

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
      } else {
        setMessage(res.data.data.result);
      }
    }

    //ref.current.click();
  };
  useEffect(() => {
    if (Boolean(userDetails.token)) {
      setFormData({
        ...formData,
        szEmail: Boolean(userDetails.token) ? userDetails.email : "",
      });
    }
  }, [userDetails]);

  

  return (
    <>
      {/* <StripeCheckout
        name="Evalinator"
        description={`${props.product.name}`}
        token={(token) => props.subscribeToProductPlan(token, props.product.id)}
        billingAddress={true}
        billing_name={`${formData.szFirstName} ${formData.szLastName}`}
        zipCode={true}
        email={formData.szEmail}
        panelLabel="Subscribe"
        stripeKey={STRIPE_PUBLISHABLE_KEY}
      >
        {
          props.product.waiting === false ? (
            <Button
              ref={ref}
              style={!Boolean(userDetails.token) ? { display: "none" } : {}}
              className={styless.btntrial}
            >
              {!Boolean(userDetails.token) ? "Sign Up. No CC Required" : "Subscribe" }
            </Button>
          ) : (
            "Coming Soon"
          )
        }
      </StripeCheckout> */}

      {!Boolean(userDetails.token) && props.product.waiting === false && (
        <Button 
        className={styless.btntrial} 
        onClick={(e) => {
            //setShow(true);
            showRegisterForCheckout(props.product.name);
          }}
        >
          Subscribe
        </Button>
      )}

      {Boolean(userDetails.token) && props.product.waiting === false && (
        <Button 
        className={styless.btntrial} 
        onClick={(e) => {
            getStripeCheckout(props.product.name);
          }}
        >
          Subscribe
        </Button>
      )}    

      <Modal
        show={show}
        onHide={setShow}
        className={styles.modalTemplete}
        size="md"
      >
        <Form method="post">
          <Modal.Body className={styles.modalBody}>
            <h4>Sign up for an account</h4>
            <p className={styles.modeltxt}>
              Already have an account?
              <Link to="/">Log In</Link>
            </p>
            <Form.Group
              className={styles.modalinput}
              controlId="exampleForm.ControlInput1"
            >
              {/* <Form.Label>First Name</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setFormData({ ...formData, szFirstName: e.target.value });
                }}
              />
              <FontAwesomeIcon icon={faUser} />
              {errors && errors.hasOwnProperty("szFirstName") && (
                <p className="error errcont">Please fill required field!</p>
              )}
            </Form.Group>
            <Form.Group
              className={styles.modalinput}
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  setFormData({ ...formData, szLastName: e.target.value });
                }}
              />
              <FontAwesomeIcon icon={faUser} />
              {errors && errors.hasOwnProperty("szLastName") && (
                <p className="error errcont">Please fill required field!</p>
              )}
            </Form.Group>
            <Form.Group
              className={styles.modalinput}
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setFormData({ ...formData, szEmail: e.target.value });
                }}
              />
              <FontAwesomeIcon icon={faEnvelope} />
              {errors && errors.hasOwnProperty("szEmail") && (
                <p className="error errcont">Please fill required field!</p>
              )}
            </Form.Group>
            <Form.Group
              className={styles.modalinput}
              controlId="exampleForm.ControlInput4"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setFormData({ ...formData, szPassword: e.target.value });
                }}
              />
              <img src={Key} />
              {errors && errors.hasOwnProperty("szPassword") && (
                <p className="error errcont">Please fill required field!</p>
              )}
              <p className={styles.passHint}>
                Password must be longer than 8 characters, and must contain at
                least 1 uppercase letter and 1 special character such as - ! " $
                % ^ @
              </p>
            </Form.Group>
            <div className={styles.modalinput}>
              <Form.Group
                className={styles.registraioncheckbox}
                controlId="exampleForm.ControlInput5"
              >
                <Form.Control
                  type="checkbox"
                  onChange={(e) => {
                    setFormData({ ...formData, bPrivacy: e.target.checked });
                  }}
                />
                <label>
                  I have read and agree with the <a href="/">privacy policy</a>
                </label>
              </Form.Group>
              {errors && errors.hasOwnProperty("bPrivacy") && (
                <p className="error errcont">Please accept Privacy & Policy!</p>
              )}
            </div>
            <div className={styles.modalinput}>
              <Form.Group
                className={styles.registraioncheckbox}
                controlId="exampleForm.ControlInput6"
              >
                <Form.Control
                  type="checkbox"
                  onChange={(e) => {
                    setFormData({ ...formData, bTerms: e.target.checked });
                  }}
                />
                <label>
                  I have read and agree with the{" "}
                  <a href="/">Terms & Condition</a>
                </label>
              </Form.Group>
              {errors && errors.hasOwnProperty("bTerms") && (
                <p className="error errcont">
                  Please accept Terms & Condition!
                </p>
              )}
            </div>
   
            {message !== "" && <p className={styles.stripeerror}>{message}</p>}

            <Button 
            // btnSize='large'
            // btnType='passive'
             variant="primary" 
             type="button" 
            onClick={handleSubmit}>
              Continue
            </Button>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default StripeForm;
