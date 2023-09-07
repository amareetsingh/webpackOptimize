import React  from 'react';
import stylesresults from '../../Pages/Analyticsresult/analyticsresult.module.css'
import { functionService } from '../../Context/functions';
import DOMPurify from "dompurify";

function RatingBand(props) {
  
    //console.log("gData", props.bands);
    //console.log("selected band", props.selectedBand);
    // console.log("bands", assessment.glistBands);
    return (

        <>
          <br></br>
          <h4 style={{ textAlign: 'center' }}>{props.band.m_szRatingScaleName}</h4>

          {functionService.awsBucketImage(props.band.m_oMedia)  && (
              <div style={{ paddingTop: '20px' }} className={stylesresults.ratingImage}>
                  <img
                  src={functionService.awsBucketImage(props.band.m_oMedia)}
                  alt={props.band.m_szRatingScaleName} />
              </div>
          )}
          <br></br>
          <div 
          className={stylesresults.textDescription}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.band.m_szRatingScaleDesc)}}>                    
          </div>       
    </>

    );
}
export default RatingBand;