import React, { useState } from 'react';
import DOMPurify from "dompurify";
import RatingBand from './RatingBand';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function RatingBandsTabbed(props) {
  
//console.log("tabbedbands", props.bands);
    //console.log("selected band", props.selectedBand);
    // console.log("bands", assessment.glistBands);


  const [selectedBand, setSelectedBand] = useState(props.selectedBand);
  
  if (!props.bands || Object.entries(props.bands).length === 0) {
    return null; // Return null to indicate that the component should render nothing
  }

      
    if(selectedBand === 0)
    {
      setSelectedBand(props.bands[0].m_nRatingScaleSeqNum);
    } 

    return (

        <>
       {props.bands && Object.entries(props.bands).length > 0 &&  
        <h2 style={{ textAlign: 'center' }}>All Rating Levels</h2>        
       }
       <br></br>
        <Tabs style={{display: 'flex', justifyContent: "center" , paddingBottom: "20px", fontSize: "18px"}}
        defaultActiveKey={selectedBand}
        id="uncontrolled-tab-example"
        //className={styles.customnavbarUl}
        //onSelect={handleSelect}
      >
        {props.bands.map((band, index) => (

          <Tab 
                key={index}
                // eventKey={`MaturityLevel${band.m_nRatingScaleSeqNum}`}
                eventKey={band.m_nRatingScaleSeqNum} 
                title={band.m_szRatingScaleName}
              >               

              <RatingBand band={band} />              
               
            </Tab>
          
    
        ))}

    </Tabs>  

    </>

    );
}
export default RatingBandsTabbed;