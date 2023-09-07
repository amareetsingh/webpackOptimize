import React  from 'react';
import DOMPurify from "dompurify";
import stylesresults from '../../Pages/Analyticsresult/analyticsresult.module.css'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function DimensionsTabbed(props) {
  
  //  console.log("gData", props.bands);
//    console.log("selected band", props.selectedBand);
     //console.log("Showing Tabbed Dims");

    return (

        <>
        <br></br>
        {props.dimensions && Object.entries(props.dimensions).length > 0 && 
          <h2 style={{ textAlign: 'center' }}>Assessment Dimensions</h2>
        }
      <br></br>
        <Tabs style={{display: 'flex', justifyContent: "center" , paddingBottom: "20px", fontSize: "18px"}}
        // defaultActiveKey={"MaturityLevel0"}
        defaultActiveKey="Dimension0"
        id="uncontrolled-tab-example"
        //className={styles.customnavbarUl}
        //onSelect={handleSelect}
      >
        {props.dimensions && props.dimensions.map((dimension, index) => (
            <Tab key={index}
                eventKey={`Dimension${index}`} 
                title={dimension.m_szDimensionName}
              >               
              <br></br>
              <h4 style={{ textAlign: 'center' }}>{dimension.m_szDimensionName}</h4>
              <br></br>
              <div style={{textAlign: "left"}}
                className={stylesresults.textDescription}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    
                    props.textSize === 1 
                    ? dimension.m_szDimensionTagLine
                    : dimension.m_szDimensionDesc
                    
                    )
                }}
              >
              </div>
                
            </Tab>
    
        ))}

    </Tabs>  

    </>

    );
}
export default DimensionsTabbed;