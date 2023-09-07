import React from 'react';
import styles from '../../Pages/Front/evalinator.module.css';
import DOMPurify from 'dompurify';
import Userdetail from '../../Pages/Front/userdetail';
import DefaultBanner from './DefaultBanner';
import Promotions from '../../Pages/Assesment/Promotions';
import { Col, Container, Row } from 'react-bootstrap';
import GraphData from '../../Pages/Front/GraphData';
import RatingBandsTabbed from './RatingBandsTabbed';
import { checkOptionSetting, getOptionValue, functionService, getColor2 } from '../../Context/functions';

import DimensionsDisplay from './DimensionsDisplay';

const DefaultLayout = ({name, desc, imageURL, promotions, dimensions, ratingBands, selectedBand, options, charts, chartTitle, colors, customizations, authorFName, authorLName, authorImage, authorProfileDesc, authorURL, handleStart, handleView}) => {

  return (
    <div>

    {/* <div className={styles.RightSide} >
    <div className={styles.landingtallBanner}> */}
    
    {/* <DefaultBanner
      options={options}
      imageURL={imageURL}
      name={name}
      colors={colors}
      authorFName={authorFName}
      authorLName={authorLName}
      authorImage={authorImage}
      authorProfileDesc={authorProfileDesc}
      authorURL={authorURL}
    /> */}
    


    {/* </div>
    </div> */}

    {/* <div
      className={styles.RightSide}
      style={
        checkOptionSetting(170, 1, options) &&
          functionService.awsBucketImage(
            currentAssesment && currentAssesment.m_oMedia
          ) !== false
          ? {}
          : { background: colorPicker["bgColor"] }
      }
    >
      //  <img className={styles.banneredit} src={edit_image} alt="edit_image" />
      <div
        className={`${styles.bgdefaultgraycolor} ${checkOptionSetting(120, 1, options)
          ? styles.landingshortBanner
          : styles.landingtallBanner
          }`}
      >
        <div className={checkOptionSetting(170, 1, options) ? styles.landingfullImage
          : styles.landingoriginalImage
        }
        >
          {functionService.awsBucketImage(
            currentAssesment && currentAssesment.m_oMedia
          ) !== false && (
              <img
                src={
                  functionService.awsBucketImage(
                    currentAssesment &&
                    currentAssesment.m_oMedia
                  ) !== false
                    ? functionService.awsBucketImage(
                      currentAssesment &&
                      currentAssesment.m_oMedia
                    )
                    : pexelsback
                }
                className={styles.pexelsback}
                alt={currentAssesment && currentAssesment.m_szSurveyName}
              />
            )}
        </div>
      </div>

      <div
        className={
          checkOptionSetting(30, 1, options)
            ? styles.slider_images
            : styles.slider_imagesnew
        }
      >
        <div className={styles.left_input}>
          <div
            className={
              checkOptionSetting(170, 1, options)
                ? styles.mianheadingnobanner
                : styles.mianheadingtopbanner
            }
          >
            {functionService.awsBucketImage(
              currentAssesment && currentAssesment.m_oMedia
            ) !== false && (
                <img
                  src={
                    functionService.awsBucketImage(
                      currentAssesment &&
                      currentAssesment.m_oMedia
                    ) !== false
                      ? functionService.awsBucketImage(
                        currentAssesment &&
                        currentAssesment.m_oMedia
                      )
                      : pexelsback
                  }
                  className={styles.pexelsback}
                  alt={currentAssesment && currentAssesment.m_szSurveyName}
                />
              )}
            {checkOptionSetting(140, 1, options) && (
              <div
                className={
                  checkOptionSetting(170, 1, options)
                    ? styles.leftHeadingtopbannertitle
                    : styles.leftHeadingtopbannertitles
                }
                style={{ color: colorPicker["titleColor"] }}
                dangerouslySetInnerHTML={{
                  __html:
                    currentAssesment &&
                    currentAssesment.m_szSurveyName,
                }}
              ></div>
            )}
          </div>
        </div>
        {checkOptionSetting(30, 1, options) && (
          <AuthorDetails
            btnStyle={{
              background: colorPicker["btnBg"],
              color: colorPicker["txtColor"],
            }}
            author={
              currentAssesment &&
              currentAssesment.m_oCreatedByUser
            }
            currentAssessment={currentAssesment}
            options={options}
          />
        )}
      </div>
    </div> */}


    {/* <div className={styles.self_assesment} >
      {checkOptionSetting(180, 1, options) &&
        functionService.checkPromotion(
          promotions[0]
        ) && (
          <Promotions
            showPre={true}
            showRedeem={false}
            data={
              promotions[0]
            }
          />
        )}
      <div
        className={
          checkOptionSetting(131, 0, options)
            ? styles.self_content
            : checkOptionSetting(131, 1, options)
              ? styles.chartTopContent
              : styles.chartBelowContent
        }
      >
        <div className={styles.self_left} >
          <div
            className={styles.assesmentDescprition}
            dangerouslySetInnerHTML={{
              __html:desc,
            }}
          ></div>
        </div>
        <div className={styles.self_right}>
          {checkOptionSetting(130, 1, options) && (
            <div
              className={styles.assesmentTitle}
              style={{ color: getColor2(colors, 3) }}
            >
              {functionService.getCustomizeText2(
                customizations,
                22
              )}
            </div>
          )}


          {checkOptionSetting(130, 1, options) && (
            <GraphData
              data={
                charts
              }
              chartType={"89"}
            />
          )}

        </div>
      </div>

      <div className={styles.foterBtn}>
        <button
          type="button"
          className={styles.assesmentbutton}
          style={{
            background: getColor2(colors, 2),
            color: getColor2(colors, 5),
          }}
        >
          {functionService.getCustomizeText2(customizations, 1)}
        </button>

        {checkOptionSetting(200, 1, options) && (
          <button
            type="button"
            className={styles.assesmentbuttonresult}
            style={{
              background: getColor2(colors, 2),
              color: getColor2(colors, 5),
            }}
          >
            {functionService.getCustomizeText2(customizations, 4)}
          </button>
        )}
      </div>

      
    </div> */}


    {/* start of front details code */}

    {checkOptionSetting(180, 1, options) &&
          functionService.checkPromotion(
            promotions[0]
          ) && (
            <Promotions
              showPre={true}
              showRedeem={false}
              data={
                promotions[0]
              }

            />
          )}

          {checkOptionSetting(131, 4, options) == false && 

            <div className={styles.frontdetailspage}>
              <Row
                className={
                  checkOptionSetting(131, 0, options)
                    ? styles.frontdetailspagerow
                    : checkOptionSetting(131, 1, options)
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
                          DOMPurify.sanitize(desc)
                      }}
                    ></div>
                  }
                </Col>
                {checkOptionSetting(130, 1, options) && (
                  <Col>
                    <div className={styles.landingfrontdetailrightside}>
                      <h1>
                        {chartTitle}
                      </h1>
                      <div>
                        <GraphData
                          data={charts}
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
                    background: getColor2(colors, 2),
                    color: getColor2(colors, 5),
                  }}
                  // onClick={() => {
                  //   // setCurrentStage(0);
                  //   handleStart();
                  // }}
                  onClick={handleStart}
                  className={styles.btnfrontdetails}
                >
                  {functionService.getCustomizeText2(customizations, 1)}
                </button>

                {checkOptionSetting(200, 1, options) && (
                  <button
                    onClick={() => handleView(true)}
                    style={{
                      background: getColor2(colors, 2),
                      color: getColor2(colors, 5),
                    }}
                    className={styles.btnfrontdetails}
                  >
                    {functionService.getCustomizeText2(customizations, 4)}
                  </button>
                )}
              </div>

            </div>
            }


            {checkOptionSetting(250, 1, options) && ratingBands && ratingBands.length > 0 && (
                <div className={styles.frontdetailspage} style={{marginBottom:'25px'}}>

                      <Row className={styles.frontdetailspagerow}>
                      <Col className="justify-content-md-center text-center" >
                                          
                      <RatingBandsTabbed
                        bands={ratingBands}
                        selectedBand={selectedBand}
                      />

                    </Col>
                    </Row>

                </div>
              )}

            { (checkOptionSetting(260, 1, options) || checkOptionSetting(260, 2, options)) 
              && (
              <div className={styles.frontdetailspage} style={{marginTop:'0px'}}>

                  <Row className={styles.frontdetailspagerow}>
                    <Col className="justify-content-md-center text-center">
                     
                        {/* <DimensionsTabbed
                          dimensions={dimensions}
                        /> */}

                        <DimensionsDisplay
                          dimensions={dimensions && Object.values(dimensions)}
                          display={getOptionValue(260, options)}
                          textSize={getOptionValue(280, options)}
                        />

                      </Col>
                    </Row>
              </div>
            )}

            {checkOptionSetting(30, 2, options) && 
              <Userdetail 
              options={options} 
              colors={colors}
              fname={authorFName} 
              lname={authorLName} 
              profileURL={authorURL} 
              profileDesc={authorProfileDesc} 
              imageURL={authorImage} 
            />}

    {/* // end of front details code */}

    {/* {checkOptionSetting(250, 1, options) && (        
        <div className={`${styles.self_assesment} ${styles.self_band} `} >
          <Container >
            <div className={styles.contantBand}>
              <Row>
                <Col className="justify-content-md-center text-center" >
                      <RatingBandsTabbed
                        bands={ratingBands}
                        selectedBand={selectedBand}
                      />
                    
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        )}

      { (checkOptionSetting(260, 1, options) || checkOptionSetting(260, 2, options)) && (
        <div className={`${styles.self_assesment} ${styles.self_band} `} >
           <Container>
            <div className={styles.contantBand}>
              <Row>
                <Col className="justify-content-md-center text-center" >
                <DimensionsDisplay
                  dimensions={dimensions && Object.values(dimensions)}
                  display={getOptionValue(260, options)}
                  textSize={getOptionValue(280, options)}
              />

                </Col>
              </Row>
            </div>
          </Container>
        </div>
      )}

      {checkOptionSetting(30, 2, options) && (
        <div
          style={{ background: getColor2(colors, 8) }}
          className={styles.authorProfileBottom}
        >
          <AuthorDetails
            authorFName={authorFName}
            authorLName={authorLName}
            authorImage={authorImage} 
            authorProfileDesc={authorProfileDesc} 
            authorURL={authorURL}
            options={options}
            colors={colors}          
          />
        </div>
      )} */}


  </div>
  )
}

export default DefaultLayout