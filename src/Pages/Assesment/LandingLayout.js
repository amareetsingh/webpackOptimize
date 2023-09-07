import React, { useEffect, useState } from "react";
import pexelsback from "../../assets/images/pexelsback.jpg";
import styles from "./assesment.module.css";
import styless from "./../Front/evalinator.module.css";
import AuthorDetails from "./AuthorDetails";
import Promotions from "./Promotions";
import GraphData from "../Front/GraphData";
import {
  checkOptionSetting,
  getOptionValue,
  functionService,
  getPreviewColor,
} from "../../Context/functions";
import { Col, Container, Row } from "react-bootstrap";
import RatingBandsTabbed from "../../Components/Sections/RatingBandsTabbed";
import DimensionsDisplay from "../../Components/Sections/DimensionsDisplay";
import DimensionsGrid from "../../Components/Sections/DimensionsGrid";
import DimensionsTabbed from "../../Components/Sections/DimensionsTabbed";
import DefaultLayout from "../../Components/Sections/DefaultLayout";
import DefaultBanner from "../../Components/Sections/DefaultBanner";
import BannerLayout1 from "../../Components/Sections/BannerLayout1";
import BannerLayout2 from "../../Components/Sections/BannerLayout2";
import BannerLayout3 from "../../Components/Sections/BannerLayout3";
import BannerLayout4 from "../../Components/Sections/BannerLayout4";
import BannerLayout5 from "../../Components/Sections/BannerLayout5";
import BannerLayout6 from "../../Components/Sections/BannerLayout6";
// import Container from 'react-bootstrap/Container';

function LandingLayout({ colorPicker, currentAssesment }) {
  const listAllBands =
    currentAssesment.m_oRatingScalesGroup &&
    currentAssesment.m_oRatingScalesGroup.m_dictRatingScales &&
    Object.values(currentAssesment.m_oRatingScalesGroup.m_dictRatingScales);
  const ratingBands = listAllBands
    ? listAllBands.filter((item) => item.m_nIsScoringBand == 0)
    : [];
  const index = 0;

  // const options = currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions;
  const [options, setOptions] = useState(
    currentAssesment &&
      currentAssesment.oResults &&
      currentAssesment.oResults.gData &&
      currentAssesment.oResults.gData.gdictOptions
  );

  const [dimDisplay, setDimDisplay] = useState(0);
  const [dimDisplayText, setDimDisplayText] = useState(1);
  //console.log("currentAssesment",currentAssesment)

  useEffect(() => {
    let arrOptions =
      currentAssesment &&
      currentAssesment.oResults &&
      currentAssesment.oResults.gData &&
      currentAssesment.oResults.gData.gdictOptions;

    setOptions(arrOptions);

    // setDimDisplay(getOptionValue(260, arrOptions));
    // setDimDisplayText(getOptionValue(280, arrOptions));
  }, [currentAssesment]);

  //console.log("options:", currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions);

  return (
    <div style={{ overflowY: "scroll", height: "700px" }}>
      {(currentAssesment &&
        currentAssesment.m_oLayout &&
        (currentAssesment.m_oLayout.m_nLayoutId <= 0 ||
          currentAssesment.m_oLayout.m_nLayoutId > 6)) ||
      !currentAssesment.m_oLayout ? (
        // <div>
        //   <div className={styles.RightSide}
        //     style={
        //       checkOptionSetting(170, 1, options) &&
        //         functionService.awsBucketImage(
        //           currentAssesment && currentAssesment.m_oMedia
        //         ) !== false
        //         ? {}
        //         : { background: colorPicker["bgColor"] }
        //     }
        //   >
        //     {/* <img className={styles.banneredit} src={edit_image} alt="edit_image" /> */}
        //     <div
        //       className={`${styles.bgdefaultgraycolor} ${checkOptionSetting(120, 1, options)
        //         ? styles.landingshortBanner
        //         : styles.landingtallBanner
        //         }`}
        //     >
        //       <div className={checkOptionSetting(170, 1, options) ? styles.landingfullImage
        //         : styles.landingoriginalImage
        //       }
        //       >
        //         {functionService.awsBucketImage(
        //           currentAssesment && currentAssesment.m_oMedia
        //         ) !== false && (
        //             <img
        //               src={
        //                 functionService.awsBucketImage(
        //                   currentAssesment &&
        //                   currentAssesment.m_oMedia
        //                 ) !== false
        //                   ? functionService.awsBucketImage(
        //                     currentAssesment &&
        //                     currentAssesment.m_oMedia
        //                   )
        //                   : pexelsback
        //               }
        //               className={styles.pexelsback}
        //               alt={currentAssesment && currentAssesment.m_szSurveyName}
        //             />
        //           )}
        //       </div>
        //     </div>

        //     <div
        //       className={
        //         checkOptionSetting(30, 1, options)
        //           ? styles.slider_images
        //           : styles.slider_imagesnew
        //       }
        //     >
        //       <div className={styles.left_input}>
        //         <div
        //           className={
        //             checkOptionSetting(170, 1, options)
        //               ? styles.mianheadingnobanner
        //               : styles.mianheadingtopbanner
        //           }
        //         >
        //           {functionService.awsBucketImage(
        //             currentAssesment && currentAssesment.m_oMedia
        //           ) !== false && (
        //               <img
        //                 src={
        //                   functionService.awsBucketImage(
        //                     currentAssesment &&
        //                     currentAssesment.m_oMedia
        //                   ) !== false
        //                     ? functionService.awsBucketImage(
        //                       currentAssesment &&
        //                       currentAssesment.m_oMedia
        //                     )
        //                     : pexelsback
        //                 }
        //                 className={styles.pexelsback}
        //                 alt={currentAssesment && currentAssesment.m_szSurveyName}
        //               />
        //             )}
        //           {checkOptionSetting(140, 1, options) && (
        //             <div
        //               className={
        //                 checkOptionSetting(170, 1, options)
        //                   ? styles.leftHeadingtopbannertitle
        //                   : styles.leftHeadingtopbannertitles
        //               }
        //               style={{ color: colorPicker["titleColor"] }}
        //               dangerouslySetInnerHTML={{
        //                 __html:
        //                   currentAssesment &&
        //                   currentAssesment.m_szSurveyName,
        //               }}
        //             ></div>
        //           )}
        //         </div>
        //       </div>
        //       {checkOptionSetting(30, 1, options) && (
        //         <AuthorDetails
        //           btnStyle={{
        //             background: colorPicker["btnBg"],
        //             color: colorPicker["txtColor"],
        //           }}
        //           author={
        //             currentAssesment &&
        //             currentAssesment.m_oCreatedByUser
        //           }
        //           currentAssessment={currentAssesment}
        //           options={options}
        //         />
        //       )}
        //     </div>
        //   </div>

        //   <div className={styles.self_assesment} >
        //     {checkOptionSetting(180, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions) &&
        //       functionService.checkPromotion(
        //         currentAssesment &&
        //         currentAssesment.m_listPromotions &&
        //         currentAssesment.m_listPromotions[0]
        //       ) && (
        //         <Promotions
        //           showPre={true}
        //           showRedeem={false}
        //           data={
        //             currentAssesment &&
        //             currentAssesment.m_listPromotions &&
        //             currentAssesment.m_listPromotions[0]
        //           }
        //         />
        //       )}
        //     <div
        //       className={
        //         checkOptionSetting(131, 0, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions)
        //           ? styles.self_content
        //           : checkOptionSetting(131, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions)
        //             ? styles.chartTopContent
        //             : styles.chartBelowContent
        //       }
        //     >
        //       <div className={styles.self_left} >
        //         <div
        //           className={styles.assesmentDescprition}
        //           dangerouslySetInnerHTML={{
        //             __html:
        //               currentAssesment &&
        //               currentAssesment.m_szSurveyDesc,
        //           }}
        //         ></div>
        //       </div>
        //       <div className={styles.self_right}>
        //         {checkOptionSetting(130, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions) && (
        //           <div
        //             className={styles.assesmentTitle}
        //             style={{ color: colorPicker["titleColor"] }}
        //           >
        //             {functionService.getCustomizeText(
        //               currentAssesment,
        //               22
        //             )}
        //           </div>
        //         )}

        //         {checkOptionSetting(130, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions) && (
        //           <GraphData
        //             data={
        //               currentAssesment &&
        //               currentAssesment.oResults &&
        //               currentAssesment.oResults.dictChartData
        //             }
        //             chartType={"89"}
        //           />
        //         )}

        //       </div>
        //     </div>

        //     <div className={styles.foterBtn}>
        //       <button
        //         type="button"
        //         className={styles.assesmentbutton}
        //         style={{
        //           background: colorPicker["btnBg"],
        //           color: colorPicker["txtColor"],
        //         }}
        //       >
        //         {functionService.getCustomizeText(currentAssesment, 1)}
        //       </button>

        //       {checkOptionSetting(200, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions) && (
        //         <button
        //           type="button"
        //           className={styles.assesmentbuttonresult}
        //           style={{
        //             background: colorPicker["btnBg"],
        //             color: colorPicker["txtColor"],
        //           }}
        //         >
        //           {functionService.getCustomizeText(currentAssesment, 4)}
        //         </button>
        //       )}
        //     </div>

        //   </div>

        //   {checkOptionSetting(250, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions) && (
        //       <div className={`${styles.self_assesment} ${styles.self_band} `} >
        //         <Container >
        //           <div className={styles.contantBand}>
        //             <Row>
        //               <Col className="justify-content-md-center text-center" >
        //                     <RatingBandsTabbed
        //                       bands={ratingBands}
        //                       selectedBand={index}
        //                     />

        //               </Col>
        //             </Row>
        //           </div>
        //         </Container>
        //       </div>
        //       )}

        //     {/* {console.log("options: ", options)} */}
        //     { (checkOptionSetting(260, 1, options) || checkOptionSetting(260, 2, options)) && (
        //       <div className={`${styles.self_assesment} ${styles.self_band} `} >
        //          <Container>
        //           <div className={styles.contantBand}>
        //             <Row>
        //               <Col className="justify-content-md-center text-center" >
        //               <DimensionsDisplay
        //               dimensions={currentAssesment.m_dictDimensions && Object.values(currentAssesment.m_dictDimensions)}
        //               // display={getOptionValue(260, options)}
        //               // textSize={getOptionValue(280, options)}
        //               display={dimDisplay}
        //               textSize={dimDisplayText}
        //             />

        //               </Col>
        //             </Row>
        //           </div>
        //         </Container>
        //       </div>
        //     )}

        //     {/* { checkOptionSetting(260, 2, options) && (
        //       <div className={`${styles.self_assesment} ${styles.self_band} `} >
        //          <Container>
        //           <div className={styles.contantBand}>
        //             <Row>
        //               <Col className="justify-content-md-center text-center" >
        //               <DimensionsGrid
        //               dimensions={currentAssesment.m_dictDimensions && Object.values(currentAssesment.m_dictDimensions)}
        //             />

        //               </Col>
        //             </Row>
        //           </div>
        //         </Container>
        //       </div>
        //     )} */}

        //     {checkOptionSetting(30, 2, options) && (
        //     <div
        //       style={{ background: getPreviewColor(currentAssesment, 8) }}
        //       className={styles.authorProfileBottom}
        //     >
        //       <AuthorDetails
        //         btnStyle={{
        //           background: colorPicker["btnBg"],
        //           color: colorPicker["txtColor"],
        //         }}
        //         author={
        //           currentAssesment &&
        //           currentAssesment.m_oCreatedByUser
        //         }
        //         currentAssesment={currentAssesment}
        //         options={options}
        //       />
        //     </div>
        //   )}
        // </div>
        
        <DefaultBanner
            options={options}
            imageURL={
              currentAssesment &&
              currentAssesment.m_oMedia &&
              functionService.awsBucketImage(currentAssesment.m_oMedia)
            }
            name={currentAssesment && currentAssesment.m_szSurveyName}
            colors={
              currentAssesment &&
              currentAssesment.m_oColorScheme &&
              currentAssesment.m_oColorScheme.m_dictColors
            }
            authorFName={
              currentAssesment &&
              currentAssesment.m_oCreatedByUser &&
              currentAssesment.m_oCreatedByUser.m_szFirstName
            }
            authorLName={
              currentAssesment &&
              currentAssesment.m_oCreatedByUser &&
              currentAssesment.m_oCreatedByUser.m_szLastName
            }
            authorImage={
              currentAssesment &&
              currentAssesment.m_oCreatedByUser &&
              currentAssesment.m_oCreatedByUser.m_oMedia &&
              functionService.awsBucketImage(
                currentAssesment.m_oCreatedByUser.m_oMedia
              )
            }
            authorProfileDesc={
              currentAssesment &&
              currentAssesment.m_oCreatedByUser &&
              currentAssesment.m_oCreatedByUser.m_szProfileDesc
            }
            authorURL={
              currentAssesment &&
              currentAssesment.m_oCreatedByUser &&
              currentAssesment.m_oCreatedByUser.m_szExternalProfileURL
            }
          />

        // <DefaultLayout
        //   selectedBand={index}
        //   // currentAssesment={currentAssesment}
        //   // colorPicker={colorPicker}
        //   // dimDisplayText={dimDisplayText}
        //   // dimDisplay={dimDisplay}
        //   imageURL={
        //     currentAssesment &&
        //     currentAssesment.m_oMedia &&
        //     functionService.awsBucketImage(currentAssesment.m_oMedia)
        //       ? functionService.awsBucketImage(currentAssesment.m_oMedia)
        //       : ""
        //   }
        //   name={currentAssesment && currentAssesment.m_szSurveyName}
        //   desc={currentAssesment && currentAssesment.m_szSurveyDesc}
        //   ratingBands={ratingBands}
        //   promotions={currentAssesment && currentAssesment.m_listPromotions}
        //   dimensions={currentAssesment && currentAssesment.m_dictDimensions}
        //   charts={
        //     currentAssesment &&
        //     currentAssesment.oResults &&
        //     currentAssesment.oResults.dictChartData
        //   }
        //   chartTitle={
        //     currentAssesment &&
        //     currentAssesment.m_oEvalCustomizations &&
        //     currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations &&
        //     functionService.getCustomizeText2(
        //       currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations,
        //       22
        //     )
        //   }
        //   options={options}
        //   colors={
        //     currentAssesment &&
        //     currentAssesment.m_oColorScheme &&
        //     currentAssesment.m_oColorScheme.m_dictColors
        //   }
        //   customizations={
        //     currentAssesment &&
        //     currentAssesment.m_oEvalCustomizations &&
        //     currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
        //   }
        //   authorFName={
        //     currentAssesment &&
        //     currentAssesment.m_oCreatedByUser &&
        //     currentAssesment.m_oCreatedByUser.m_szFirstName
        //   }
        //   authorLName={
        //     currentAssesment &&
        //     currentAssesment.m_oCreatedByUser &&
        //     currentAssesment.m_oCreatedByUser.m_szLastName
        //   }
        //   authorImage={
        //     currentAssesment &&
        //     currentAssesment.m_oCreatedByUser &&
        //     currentAssesment.m_oCreatedByUser.m_oMedia &&
        //     functionService.awsBucketImage(
        //       currentAssesment.m_oCreatedByUser.m_oMedia
        //     )
        //   }
        //   authorProfileDesc={
        //     currentAssesment &&
        //     currentAssesment.m_oCreatedByUser &&
        //     currentAssesment.m_oCreatedByUser.m_szProfileDesc
        //   }
        //   authorURL={
        //     currentAssesment &&
        //     currentAssesment.m_oCreatedByUser &&
        //     currentAssesment.m_oCreatedByUser.m_szExternalProfileURL
        //   }
        // />


      ) : currentAssesment &&
        currentAssesment.m_oLayout &&
        currentAssesment.m_oLayout.m_nLayoutId == 1 ? (
        // <div className={styles.layout} style={{ background: colorPicker["bgColor"] }}>
        //   <h2 style={{ textAlign: 'center' }} >
        //     {checkOptionSetting(140, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions) && currentAssesment && (
        //       <div
        //         className={
        //           checkOptionSetting(170, 1, currentAssesment && currentAssesment.oResults && currentAssesment.oResults.gData && currentAssesment.oResults.gData.gdictOptions)
        //             ? styles.leftHeadingtopbannertitle
        //             : styles.leftHeadingtopbannertitles
        //         }
        //         style={{ color: colorPicker["titleColor"] }}
        //         dangerouslySetInnerHTML={{
        //           __html:
        //             currentAssesment &&
        //             currentAssesment.m_szSurveyName,
        //         }}
        //       ></div>
        //     )}
        //     {/* TITLE */}
        //   </h2>
        //   {/* <img src={layoutImages} width='100%' /> */}
        //   <div >
        //     {functionService.awsBucketImage(
        //       currentAssesment && currentAssesment.m_oMedia
        //     ) !== false && (
        //         <img
        //           src={
        //             functionService.awsBucketImage(
        //               currentAssesment &&
        //               currentAssesment.m_oMedia
        //             ) !== false
        //               ? functionService.awsBucketImage(
        //                 currentAssesment &&
        //                 currentAssesment.m_oMedia
        //               )
        //               : pexelsback
        //           }
        //           className={styles.heroimg1}
        //           alt={currentAssesment && currentAssesment.m_szSurveyName}
        //         />
        //       )}
        //   </div>
        //   <div>

        //     <p className={styles.para}>
        //       {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sunt iusto architecto ratione porro excepturi doloribus modi quam veritatis numquam? */}

        //       <div
        //         dangerouslySetInnerHTML={{
        //           __html:
        //             currentAssesment &&
        //             currentAssesment.m_szSurveyDesc,
        //         }}
        //       ></div>
        //     </p>

        //     <button

        //       className={styles.button}
        //       style={{
        //         background: colorPicker["btnBg"],
        //         color: colorPicker["txtColor"],
        //       }}
        //     >
        //       {functionService.getCustomizeText(currentAssesment, 1)}

        //       {/* Click Here */}
        //     </button>
        //   </div>
        // </div>
        <BannerLayout1
          name={currentAssesment && currentAssesment.m_szSurveyName}
          desc={currentAssesment && currentAssesment.m_szSurveyDesc}
          imageURL={
            currentAssesment &&
            currentAssesment.m_oMedia &&
            functionService.awsBucketImage(currentAssesment.m_oMedia)
          }
          options={options}
          colors={
            currentAssesment &&
            currentAssesment.m_oColorScheme &&
            currentAssesment.m_oColorScheme.m_dictColors
          }
          customizations={
            currentAssesment &&
            currentAssesment.m_oEvalCustomizations &&
            currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
          }
        />
      ) : currentAssesment &&
        currentAssesment.m_oLayout &&
        currentAssesment.m_oLayout.m_nLayoutId == 2 ? (
        // <div className={styless.hero} >

        //   {/* <img
        //   className={styles.heroimg}
        //     src={layoutImages}
        //     width="110%"
        //         /> */}

        //   {functionService.awsBucketImage(
        //     currentAssesment && currentAssesment.m_oMedia
        //   ) !== false && (
        //       <img
        //         width="100%"
        //         src={
        //           functionService.awsBucketImage(
        //             currentAssesment &&
        //             currentAssesment.m_oMedia
        //           ) !== false
        //             ? functionService.awsBucketImage(
        //               currentAssesment &&
        //               currentAssesment.m_oMedia
        //             )
        //             : pexelsback
        //         }
        //         className={styless.heroimg1}
        //         // className={styles.pexelsback}
        //         alt={currentAssesment && currentAssesment.m_szSurveyName}
        //       />
        //     )}

        //   <div className={styless.herobanner}>
        //     <div className={styless.Mainsection}>
        //       <div className={styless.leftsectiona} >
        //         {/* <h4 className={styless.leftsecth}> */}
        //         {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates dolor tenetur . */}

        //         {/* {checkOption(140, 1) && currentAssesment && ( */}
        //         <span
        //           className={styless.leftsectionh1}
        //           //   checkOption(170, 1)
        //           //     ? styles.leftHeadingtopbannertitle
        //           //     : styles.leftHeadingtopbannertitles

        //           style={{ color: colorPicker["titleColor"] }}
        //           dangerouslySetInnerHTML={{
        //             __html:
        //               currentAssesment &&
        //               currentAssesment.m_szSurveyName,
        //           }}
        //         ></span>
        //         {/* )} */}
        //         {/* </h4> */}
        //       </div>
        //       <p
        //         className={styless.leftsectp}
        //         dangerouslySetInnerHTML={{
        //           __html:
        //             currentAssesment &&
        //             currentAssesment.m_szSurveyDesc,
        //         }}
        //       ></p>

        //       {/* <button className={styles.leftsect} >START QUIZ</button> */}
        //       <button
        //         className={styless.leftsectbutton}
        //         style={{
        //           background: colorPicker["btnBg"],
        //           color: colorPicker["txtColor"],
        //         }}
        //       >
        //         {functionService.getCustomizeText(currentAssesment, 1)}
        //       </button>
        //     </div>

        //   </div>

        // </div>
        <BannerLayout2
          currentAssesment={currentAssesment}
          colorPicker={colorPicker}
          name={currentAssesment && currentAssesment.m_szSurveyName}
          desc={currentAssesment && currentAssesment.m_szSurveyDesc}
          imageURL={
            currentAssesment &&
            currentAssesment.m_oMedia &&
            functionService.awsBucketImage(currentAssesment.m_oMedia)
          }
          options={options}
          colors={
            currentAssesment &&
            currentAssesment.m_oColorScheme &&
            currentAssesment.m_oColorScheme.m_dictColors
          }
          customizations={
            currentAssesment &&
            currentAssesment.m_oEvalCustomizations &&
            currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
          }
        />
      ) : currentAssesment &&
        currentAssesment.m_oLayout &&
        currentAssesment.m_oLayout.m_nLayoutId == 3 ? (
        <BannerLayout3
          name={currentAssesment && currentAssesment.m_szSurveyName}
          desc={currentAssesment && currentAssesment.m_szSurveyDesc}
          imageURL={functionService.awsBucketImage(
            currentAssesment && currentAssesment.m_oMedia
          )}
          colors={
            currentAssesment &&
            currentAssesment.m_oColorScheme &&
            currentAssesment.m_oColorScheme.m_dictColors
          }
          customizations={
            currentAssesment &&
            currentAssesment.m_oEvalCustomizations &&
            currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
          }
        />
      ) : currentAssesment &&
        currentAssesment.m_oLayout &&
        currentAssesment.m_oLayout.m_nLayoutId == 4 ? (
        <BannerLayout4
          name={currentAssesment && currentAssesment.m_szSurveyName}
          desc={currentAssesment && currentAssesment.m_szSurveyDesc}
          imageURL={functionService.awsBucketImage(
            currentAssesment && currentAssesment.m_oMedia
          )}
          colors={
            currentAssesment &&
            currentAssesment.m_oColorScheme &&
            currentAssesment.m_oColorScheme.m_dictColors
          }
          customizations={
            currentAssesment &&
            currentAssesment.m_oEvalCustomizations &&
            currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
          }
        />
      ) : currentAssesment &&
      currentAssesment.m_oLayout &&
      currentAssesment.m_oLayout.m_nLayoutId == 5 ? (
        
      <BannerLayout5
        name={currentAssesment && currentAssesment.m_szSurveyName}
        desc={currentAssesment && currentAssesment.m_szSurveyDesc}
        imageURL={functionService.awsBucketImage(
          currentAssesment && currentAssesment.m_oMedia
        )}
        colors={
          currentAssesment &&
          currentAssesment.m_oColorScheme &&
          currentAssesment.m_oColorScheme.m_dictColors
        }
        customizations={
          currentAssesment &&
          currentAssesment.m_oEvalCustomizations &&
          currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
        }
      />
    ) : currentAssesment &&
    currentAssesment.m_oLayout &&
    currentAssesment.m_oLayout.m_nLayoutId == 6 ? (
      
    <BannerLayout6
      name={currentAssesment && currentAssesment.m_szSurveyName}
      desc={currentAssesment && currentAssesment.m_szSurveyDesc}
      imageURL={functionService.awsBucketImage(
        currentAssesment && currentAssesment.m_oMedia
      )}
      colors={
        currentAssesment &&
        currentAssesment.m_oColorScheme &&
        currentAssesment.m_oColorScheme.m_dictColors
      }
      customizations={
        currentAssesment &&
        currentAssesment.m_oEvalCustomizations &&
        currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
      }
    />
  ) : (
        ""
      )}

        <DefaultLayout
          selectedBand={index}
          imageURL={
            currentAssesment &&
            currentAssesment.m_oMedia &&
            functionService.awsBucketImage(currentAssesment.m_oMedia)
              ? functionService.awsBucketImage(currentAssesment.m_oMedia)
              : ""
          }
          name={currentAssesment && currentAssesment.m_szSurveyName}
          desc={currentAssesment && currentAssesment.m_szSurveyDesc}
          ratingBands={ratingBands}
          promotions={currentAssesment && currentAssesment.m_listPromotions}
          dimensions={currentAssesment && currentAssesment.m_dictDimensions}
          charts={
            currentAssesment &&
            currentAssesment.oResults &&
            currentAssesment.oResults.dictChartData
          }
          chartTitle={
            currentAssesment &&
            currentAssesment.m_oEvalCustomizations &&
            currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations &&
            functionService.getCustomizeText2(
              currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations,
              22
            )
          }
          options={options}
          colors={
            currentAssesment &&
            currentAssesment.m_oColorScheme &&
            currentAssesment.m_oColorScheme.m_dictColors
          }
          customizations={
            currentAssesment &&
            currentAssesment.m_oEvalCustomizations &&
            currentAssesment.m_oEvalCustomizations.m_dictEvalCustomizations
          }
          authorFName={
            currentAssesment &&
            currentAssesment.m_oCreatedByUser &&
            currentAssesment.m_oCreatedByUser.m_szFirstName
          }
          authorLName={
            currentAssesment &&
            currentAssesment.m_oCreatedByUser &&
            currentAssesment.m_oCreatedByUser.m_szLastName
          }
          authorImage={
            currentAssesment &&
            currentAssesment.m_oCreatedByUser &&
            currentAssesment.m_oCreatedByUser.m_oMedia &&
            functionService.awsBucketImage(
              currentAssesment.m_oCreatedByUser.m_oMedia
            )
          }
          authorProfileDesc={
            currentAssesment &&
            currentAssesment.m_oCreatedByUser &&
            currentAssesment.m_oCreatedByUser.m_szProfileDesc
          }
          authorURL={
            currentAssesment &&
            currentAssesment.m_oCreatedByUser &&
            currentAssesment.m_oCreatedByUser.m_szExternalProfileURL
          }
        />  

      




    </div>
  );
}

export default LandingLayout;
