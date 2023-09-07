import React, { useEffect, useState } from "react";
import styles from "./evalinator.module.css";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GraphData from "./GraphData";
import DOMPurify from "dompurify";
import {
  checkOptionSetting,
  functionService,
  getColor,
} from "../../Context/functions";
import Promotions from "../Assesment/Promotions";
//import Mainbanner from "./Mainbanner.js";
import DefaultLayout from "../../Components/Sections/DefaultLayout";
import DefaultBanner from "../../Components/Sections/DefaultBanner";
import BannerLayout1 from "../../Components/Sections/BannerLayout1";
import BannerLayout2 from "../../Components/Sections/BannerLayout2";
import BannerLayout3 from "../../Components/Sections/BannerLayout3";
import BannerLayout4 from '../../Components/Sections/BannerLayout4';
import BannerLayout5 from "../../Components/Sections/BannerLayout5";
import BannerLayout6 from "../../Components/Sections/BannerLayout6";

import Userdetail from "./userdetail.js";
import topbannerimage from "../../assets/images/pexelsback.jpg";

import RatingBandsTabbed from "../../Components/Sections/RatingBandsTabbed";
import DimensionsTabbed from "../../Components/Sections/DimensionsTabbed";

// import ReactGA from 'react-ga';
//import gtag from 'ga-gtag';
//import { GOOGLE_ANALYTICS_TAG } from '../../Components/API';

function Frontdetail({ row, setCurrentStage, handleViewResults }) {
  //const szAssessmentId='assess' + row && row.goAssessment && row.goAssessment.nId;
  const lAssessmentId = row && row.goAssessment && row.goAssessment.nId;

  function handleClick() {
    if (
      lAssessmentId > 0 &&
      checkOptionSetting(230, 1, row && row.gdictOptions) == false
    )
      functionService.sendTrackingData("assess/postTrackingEvent", {
        assessId: lAssessmentId,
        eventId: 20,
      });

    setCurrentStage(0);
  }

  return (
    <div className={styles.scrollFront}>
      <>
        {(row &&
          row?.m_oLayout &&
          (row?.m_oLayout?.m_nLayoutId <= 0 ||
            row?.m_oLayout?.m_nLayoutId > 6)) ||
        !row.m_oLayout ? (
          <div>
            {/* call the detail layout here   */}


          <DefaultBanner
            options={row.gdictOptions}
            imageURL={row.goAssessment && row.goAssessment.szImageURL}
            name={row.goAssessment && row.goAssessment.szName}
            colors={row.gdictColors}
            authorFName={
              row.goAssessment &&
              row.goAssessment.oAuthor &&
              row.goAssessment.oAuthor.szFirstName
            }
            authorLName={
              row.goAssessment &&
              row.goAssessment.oAuthor &&
              row.goAssessment.oAuthor.szLastName
            }
            authorImage={
              row.goAssessment &&
              row.goAssessment.oAuthor &&
              row.goAssessment.oAuthor.szImageURL
            }
            authorProfileDesc={
              row.goAssessment &&
              row.goAssessment.oAuthor &&
              row.goAssessment.oAuthor.szProfileDesc
            }
            authorURL={
              row.goAssessment &&
              row.goAssessment.oAuthor &&
              row.goAssessment.oAuthor.szProfileURL
            }
          /> 


            {/* <DefaultLayout
              handleStart={handleClick}
              handleView={handleViewResults}
              name={row.goAssessment && row.goAssessment.szName}
              desc={row.goAssessment && row.goAssessment.szDesc}
              imageURL={row.goAssessment && row.goAssessment.szImageURL}
              promotions={row.goAssessment && row.goAssessment.listPromotions}
              dimensions={row.glistDimensions}
              ratingBands={row.glistBands}
              selectedBand={0}
              options={row.gdictOptions}
              charts={row && row.dictChartData}
              chartTitle={
                row && row.goAssessment && row.goAssessment.szChartTitle
              }
              colors={row.gdictColors}
              customizations={row.gdictCustomizations}
              authorFName={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szFirstName
              }
              authorLName={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szLastName
              }
              authorImage={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szImageURL
              }
              authorProfileDesc={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szProfileDesc
              }
              authorURL={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szProfileURL
              }
            /> */}

            {/* <Mainbanner row={row} /> */}

            {/* <DefaultBanner
              options={row.gdictOptions}
              imageURL={row.goAssessment && row.goAssessment.szImageURL}
              name={row.goAssessment && row.goAssessment.szName}
              color={row.glistColors && Object.fromEntries(row.glistColors.map(({ key, value }) => [key, value]))}
              authorFName={row.goAssessment && row.goAssessment.oAuthor && row.goAssessment.oAuthor.szFirstName}
              authorLName={row.goAssessment && row.goAssessment.oAuthor && row.goAssessment.oAuthor.szLastName}
              authorImage={row.goAssessment && row.goAssessment.oAuthor && row.goAssessment.oAuthor.szImageURL}
              authorProfileDesc={row.goAssessment && row.goAssessment.oAuthor && row.goAssessment.oAuthor.szProfileDesc}
              authorURL={row.goAssessment && row.goAssessment.oAuthor && row.goAssessment.oAuthor.szProfileURL}
            /> */}

            {/* {checkOptionSetting(180, 1, row && row.gdictOptions) &&
              functionService.checkPromotion(
                row.goAssessment &&
                row.goAssessment.listPromotions &&
                row.goAssessment.listPromotions[0]
              ) && (
                <Promotions
                  showPre={true}
                  showRedeem={false}
                  data={
                    row.goAssessment &&
                    row.goAssessment.listPromotions &&
                    row.goAssessment.listPromotions[0]
                  }

                />
              )}

            <div className={styles.frontdetailspage}>
              <Row
                className={
                  checkOptionSetting(131, 0, row && row.gdictOptions)
                    ? styles.frontdetailspagerow
                    : checkOptionSetting(131, 1, row && row.gdictOptions)
                      ? styles.frontdetailspagerowTopContent
                      : styles.frontdetailspagerowBelowContent
                }
              >
                <Col>
                  {
                    <div
                      className={styles.landingfrontdetailleftside}
                      dangerouslySetInnerHTML={{
                        __html:
                          DOMPurify.sanitize(row && row.goAssessment && row.goAssessment.szDesc)
                      }}
                    ></div>
                  }
                </Col>
                {checkOptionSetting(130, 1, row && row.gdictOptions) && (
                  <Col>
                    <div className={styles.landingfrontdetailrightside}>
                      <h1>
                        {row && row.goAssessment && row.goAssessment.szChartTitle}
                      </h1>
                      <div>
                        <GraphData
                          data={row && row.dictChartData}
                          chartType={"89"}
                        />
                      </div>
                    </div>
                  </Col>
                )}


              </Row>


              <div className={styles.frontdetailscenterbutton}>
                <button
                  style={{
                    background: getColor(row, 2),
                    color: getColor(row, 5),
                  }}
                  onClick={() => {
                    // setCurrentStage(0);
                    handleClick();
                  }}

                  className={styles.btnfrontdetails}
                >
                  {functionService.getButtonText(row, 1)}
                </button>
                {checkOptionSetting(200, 1, row && row.gdictOptions) && (
                  <button
                    onClick={() => handleViewResults(true)}
                    style={{
                      background: getColor(row, 2),
                      color: getColor(row, 5),
                    }}
                    className={styles.btnfrontdetails}
                  >
                    {functionService.getButtonText(row, 4)}
                  </button>
                )}
              </div>

              </div>

              {checkOptionSetting(250, 1, row && row.gdictOptions) && (
                <div className={styles.frontdetailspage} style={{marginTop:'25px'}}>

                      <Row className={styles.frontdetailspagerow}>
                      <Col className="justify-content-md-center text-center" >
                                          
                      <RatingBandsTabbed
                        bands={row.glistBands}
                        selectedBand={0}
                      />

                    </Col>
                    </Row>

                </div>
              )}

            {checkOptionSetting(260, 1, row && row.gdictOptions) && (
              <div className={styles.frontdetailspage} style={{marginTop:'25px'}}>

                  <Row className={styles.frontdetailspagerow}>
                    <Col className="justify-content-md-center text-center">
                     
                        <DimensionsTabbed
                          dimensions={row.glistDimensions}
                        />
                      
                      </Col>
                    </Row>
              </div>
            )}

            {checkOptionSetting(30, 2, row && row.gdictOptions) && <Userdetail row={row} />} 
          
          */}
          </div>
        ) : row && row.m_oLayout && row.m_oLayout.m_nLayoutId == 1 ? (
          // <Container fluid className={styles.LayoutPage} style={{ background: getColor(row, 1) }}>
          //   <h2 className={styles.descriptionLayout} >
          //     {checkOptionSetting(140, 1, row && row.gdictOptions) && (
          //       <div
          //         className={
          //           checkOptionSetting(170, 1, row && row.gdictOptions)
          //             ? styles.leftHeadingtopbannertitle
          //             : styles.leftHeadingtopbannertitles
          //         }
          //         style={{ color: getColor(row, 3) }}
          //         dangerouslySetInnerHTML={{
          //           __html: DOMPurify.sanitize(row && row.goAssessment && row.goAssessment.szName)
          //         }}
          //       ></div>
          //     )}

          //   </h2>
          //   <Container>
          //     <Image thumbnail className={styles.heroimg} width="100%" src={(row && row.goAssessment && row.goAssessment.hasOwnProperty('szImageURL') && row.goAssessment.szImageURL !== '') ? row['goAssessment']['szImageURL'] : topbannerimage} alt={row && row.goAssessment && row.goAssessment.szName} />
          //   </Container>

          //   <Container>
          //     <div style={{ marginTop: '20px' }}>
          //       <p className={styles.para}>
          //         <div
          //           dangerouslySetInnerHTML={{
          //             __html: DOMPurify.sanitize(row && row.goAssessment && row.goAssessment.szDesc)
          //           }}
          //         ></div>
          //       </p>

          //       <button
          //         onClick={() => {
          //           // setCurrentStage(0);
          //           handleClick();
          //         }}
          //         className={styles.button}
          //         style={{ background: getColor(row, 2), color: getColor(row, 5) }}
          //       >
          //         {functionService.getButtonText(row, 1)}
          //       </button>
          //     </div>
          //   </Container>
          // </Container>

          <BannerLayout1
            name={row && row.goAssessment && row.goAssessment.szName}
            desc={row && row.goAssessment && row.goAssessment.szDesc}
            imageURL={row && row.goAssessment && row.goAssessment.szImageURL}
            options={row && row.gdictOptions}
            colors={row && row.gdictColors}
            customizations={row && row.gdictCustomizations}
            handleClick={handleClick}
          />
        ) : row && row.m_oLayout && row.m_oLayout.m_nLayoutId == 2 ? (
          // <div className={styles.hero}>
          //   <img width="100%" className={styles.heroimg1} src={(row && row.goAssessment && row.goAssessment.hasOwnProperty('szImageURL') && row.goAssessment.szImageURL !== '') ? row['goAssessment']['szImageURL'] : topbannerimage} alt={row && row.goAssessment && row.goAssessment.szName} />
          //   <div className={styles.herobanner}>

          //     <div className={styles.Mainsection}>
          //       <div className={styles.leftsection} >

          //         <span
          //           className={styles.leftsectionh}
          //           // className={
          //           //   checkOptionLanding(170, 1, row)
          //           //     ? styles.leftHeadingtopbannertitle
          //           //     : styles.leftHeadingtopbannertitles
          //           // }
          //           style={{ color: getColor(row, 3) }}
          //           dangerouslySetInnerHTML={{
          //             __html:
          //               DOMPurify.sanitize(row && row.goAssessment && row.goAssessment.szName)
          //           }}
          //         ></span>
          //       </div>
          //       <p
          //         className={styles.leftsectp}
          //         dangerouslySetInnerHTML={{
          //           __html: DOMPurify.sanitize(row && row.goAssessment && row.goAssessment.szDesc)
          //         }}
          //       ></p>

          //       <button
          //         className={styles.leftsectbutton}
          //         onClick={() => {
          //           // setCurrentStage(0);
          //           handleClick();
          //         }}
          //         style={{
          //           background: getColor(row, 2),
          //           color: getColor(row, 5),
          //         }}
          //       >
          //         {functionService.getButtonText(row, 1)}
          //       </button>
          //     </div>

          //   </div>
          // </div>

          <BannerLayout2
            name={row && row.goAssessment && row.goAssessment.szName}
            desc={row && row.goAssessment && row.goAssessment.szDesc}
            imageURL={row && row.goAssessment && row.goAssessment.szImageURL}
            options={row && row.gdictOptions}
            colors={row && row.gdictColors}
            customizations={row && row.gdictCustomizations}
            handleClick={handleClick}
          />
        ) : row && row.m_oLayout && row.m_oLayout.m_nLayoutId == 3 ? (
          <BannerLayout3
            name={row && row.goAssessment && row.goAssessment.szName}
            desc={row && row.goAssessment && row.goAssessment.szDesc}
            imageURL={row && row.goAssessment && row.goAssessment.szImageURL}
            // options={row && row.gdictOptions}
            colors={row && row.gdictColors}
            customizations={row && row.gdictCustomizations}
            handleClick={handleClick}
          />
        ) : row && row.m_oLayout && row.m_oLayout.m_nLayoutId == 4 ? (
          <BannerLayout4
            name={row && row.goAssessment && row.goAssessment.szName}
            desc={row && row.goAssessment && row.goAssessment.szDesc}
            imageURL={row && row.goAssessment && row.goAssessment.szImageURL}
            // options={row && row.gdictOptions}
            colors={row && row.gdictColors}
            customizations={row && row.gdictCustomizations}
            handleClick={handleClick}
          />
        ) : row && row.m_oLayout && row.m_oLayout.m_nLayoutId == 5 ? (
          <BannerLayout5
            name={row && row.goAssessment && row.goAssessment.szName}
            desc={row && row.goAssessment && row.goAssessment.szDesc}
            imageURL={row && row.goAssessment && row.goAssessment.szImageURL}
            // options={row && row.gdictOptions}
            colors={row && row.gdictColors}
            customizations={row && row.gdictCustomizations}
            handleClick={handleClick}
          />
        ) : row && row.m_oLayout && row.m_oLayout.m_nLayoutId == 6 ? (
          <BannerLayout6
            name={row && row.goAssessment && row.goAssessment.szName}
            desc={row && row.goAssessment && row.goAssessment.szDesc}
            imageURL={row && row.goAssessment && row.goAssessment.szImageURL}
            // options={row && row.gdictOptions}
            colors={row && row.gdictColors}
            customizations={row && row.gdictCustomizations}
            handleClick={handleClick}
          />
        ) : (
          console.log("no")
        )}


        <DefaultLayout
              handleStart={handleClick}
              handleView={handleViewResults}
              name={row.goAssessment && row.goAssessment.szName}
              desc={row.goAssessment && row.goAssessment.szDesc}
              imageURL={row.goAssessment && row.goAssessment.szImageURL}
              promotions={row.goAssessment && row.goAssessment.listPromotions}
              dimensions={row.glistDimensions}
              ratingBands={row.glistBands}
              selectedBand={0}
              options={row.gdictOptions}
              charts={row && row.dictChartData}
              chartTitle={
                row && row.goAssessment && row.goAssessment.szChartTitle
              }
              colors={row.gdictColors}
              customizations={row.gdictCustomizations}
              authorFName={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szFirstName
              }
              authorLName={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szLastName
              }
              authorImage={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szImageURL
              }
              authorProfileDesc={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szProfileDesc
              }
              authorURL={
                row.goAssessment &&
                row.goAssessment.oAuthor &&
                row.goAssessment.oAuthor.szProfileURL
              }
            />


      </>
    </div>
  );
}

export default Frontdetail;
