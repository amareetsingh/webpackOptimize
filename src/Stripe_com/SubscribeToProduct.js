import React,{useState} from "react";
import { Row, Col } from "react-bootstrap";
import { withToastManager } from "react-toast-notifications";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "./ErrorHandler";
import styles from './stripe.module.css';
import { faBan, faCheckCircle,  } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from '../Context';
import {
  PRODUCT_PLANS, NEW_PRODUCT_PLANS 
} from "../Utils/Consts";
import { apiRequest } from "../Utils/API";
import Check from '../assets/images/check.png'
import { API_PATH } from "../Components/API";
import StripeForm from "./StripeForm";
import Toaster from "../Components/Toaster";
import { getClientReferenceId } from "../Context/functions";

const SubscribeToProduct = (props) => {
  const { error, showError } = useErrorHandler(null);
  
  const userDetails = useAuthState();
  const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const[message, setMessage] = useState("");
  /**
   * Make request to AWS lambda function that handles creating
   * a customer and a subscription plan on stripe
   * @param token - token with stripe key and details entered in stripe form
   * @param productPlan - id of the product plan the user is subscribing to
   */
  const subscribeToProductPlan = async (
    token = {},
    productPlan = ''
  ) => {
    // registrationapi
    props.setLoader(true);

    const bodyParams = {
      stripeToken: token.id,
      stripeEmail: token.email,
      stripeBillingName:token.card.name,
      szReferral:getClientReferenceId(),
      productPlan
    };
    // console.log("Calling payment createSubscription API", bodyParams);
    const response = await apiRequest(
      API_PATH+"Payment/createSubscription",
      "POST",
      bodyParams
    ).catch(e => {
      showError(e.message);
    });
    props.setLoader(false);
    if(response.statusCode === 200){
      if(Boolean(userDetails.token)){
         let result = JSON.parse(localStorage.getItem('currentUser'));
         result.oUser['m_oUserAccount']['m_nAccountStatus'] = 1;
         //console.log("result",result);
         localStorage.setItem('currentUser',JSON.stringify(result));
         setMessage("Successfully Subscribed your account!!");
      }else{
        setMessage("Successfully Created your account!!");
      }
      
      setShowToast(true);    
     window.location = "/thank-you";
    }else{
      setMessage(response.result)
       setShowToast1(true) 
    }
  };

  /**
   * List product plans
   * @param productPlans - array of product plans created in Stripe account that a user can subscribe to
   */
  const displayProductPlans = (
    productPlans
  ) => {
    if (productPlans && productPlans.length) {
      
      return productPlans.map((product, i) => {
        return (                    
              <Col md={4} key={i}>
                <div className={styles.planbox}>
                  <h2>
                    {product.name}
                  </h2>
                  <div className={styles.planduration}>
                    <del>${product.original}</del>
                  </div>
                  <div className={styles.planprize}>
                  {product.waiting ===false &&  <span>$</span> }{product.waiting ===false ?  product.price: 'Upcoming'}
                  </div>
                  <div className={styles.planduration}>
                    per month AFTER 3 weeks free trial
                  </div>       

                  <div className={styles.planduration}>
                  <br/>{product.desc}
                  </div>                  

                    <ul className={styles.featuresList}>
                      {product.featuresList && product.featuresList.map((obj, index) => (
                        <li key={index}><img src={Check} alt="check" /> <p>{obj}</p></li>
                      ))}
                    </ul>                
                    <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message={message} toasticon={faCheckCircle}/>
              <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message={message} toasticon={faBan}/>      
                  <StripeForm setLoader={props.setLoader} product={product} subscribeToProductPlan={subscribeToProductPlan}/>
                  <br/><br/>Your information is securely processed by Stripe. We do not store credit card information.
                </div>
              </Col>
                      
        );
      });     
    }
    return "No existing product plans";
  };

  const displayNewProductPlans = (
    productPlans
  ) => {
    if (productPlans && productPlans.length) {

      const maxStrings = Math.max(...productPlans.map(p => p.featuresList.length));
      return (
        <>
          <br></br><br></br>
          <div className={styles.comparison} style={{"marginTop": "-50px"}}>
            <table>
              {/* style="text-align:center;"  */}
              <thead>
                <tr>
                  <th colspan="4" className={styles.qbo}>
                    <h3><strong>Free 14 Day Trial. Personalized Support. See Our Guided Plan Below.</strong></h3>
                  </th>
                </tr>


                <tr>
                  <th className={styles.tl}></th>
                  {
                    productPlans.map((product, i) => {
                      return (
                        <>
                          {product.id != '' && (
                            <th className={styles.compareheading} style={{ backgroundColor: product.highlighted !== '' ? '' : '' }}>
                              {product.name}
                            </th>
                          )}
                        </>
                      )
                    })


                  }

                </tr>

                <tr>
                  <th>Price per month<br />(After 14 day trial)</th>
                  {
                    productPlans.map((product, i) => {
                      return (
                        <>
                          {product.id != '' && (
                            <th className={styles.priceinfo}>
                              <div className={styles.pricewas}>${product.original}</div>
                              <div className={styles.pricenow}><span>${product.pricelarge}<span className={styles.pricesmall}>.{product.pricesmall}</span></span></div>
                              {/* {product.price}  */}
                              <div className={styles.pricetry}><span className={styles.hidemobile}>{product.desc}</span></div>
                            </th>
                          )}
                        </>
                      )
                    })
                  }
                </tr>
              </thead>

              <tbody>

                {/* {[...Array(maxStrings)].map((_, stringIndex) => {
            return (  
            <tr key={stringIndex}>
              {productPlans.map((product, productIndex) => (
                <td key={productIndex}>{product.featuresList[stringIndex] || ''}</td>
              ))}
            </tr>
        )})} */}


                {productPlans[0].featuresList.map((string, stringIndex) => (
                  <>                    
                    <tr >
                    <td></td>
                      <td colspan="4" title=""></td>
                    </tr>
                    <tr key={stringIndex} className={stringIndex % 2 === 0 ? styles.comparerow : styles.noncomparerow}>
                      {productPlans.map((product, productIndex) => (
                        <td key={productIndex}>
                          {product.featuresList[stringIndex] == 'Y' ? <span className={styles.tickblue}>&#x2713; </span> : product.featuresList[stringIndex]}
                        </td>
                      ))}
                    </tr>
                  </>
                ))}



              </tbody>

                        
              <tr>
                <th><br /><small>Your credit card will NOT be charged until after the free trial. We'll also notify you before trial ends.</small><br></br></th>
                {
                  productPlans.map((product, i) => {
                    return (
                      <>
                      {product.id != '' && (
                        <th>
                          <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message={message} toasticon={faCheckCircle} />
                          <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message={message} toasticon={faBan} />
                          <StripeForm setLoader={props.setLoader} product={product} subscribeToProductPlan={subscribeToProductPlan} />
                          
                        </th>
                      )}
                      </>
                    )
                  })
                }
              </tr>

            </table>
           
          </div>

        </>
      )
    }
    return "No existing product plans";
  };

  /**
   * Toast notification
   * @param message - notification message to be displayed
   */


  // return (
  //   <div>
  //     <Row className={styles.display_product}>{displayProductPlans(PRODUCT_PLANS)}</Row>
  //     {error && <ErrorMessage errorMessage={error} />}
  //   </div>
  // );

  return (
    <div>
      {/* <Row className={styles.display_product}>{displayProductPlans(PRODUCT_PLANS)}</Row> */}
      <Row className={styles.display_product}>{displayNewProductPlans(NEW_PRODUCT_PLANS)}</Row>
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
};

export default withToastManager(SubscribeToProduct);
