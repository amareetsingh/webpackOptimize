import React  from 'react';
import DOMPurify from "dompurify";
import stylesresults from '../../Pages/Analyticsresult/analyticsresult.module.css'
import { checkOptionSetting } from '../../Context/functions';
import Card from 'react-bootstrap/Card';

function DimensionsGrid(props) {

  
    return (

          <div className="container">

            <br></br>
            {props.dimensions && Object.entries(props.dimensions).length > 0 && 
              <h2 style={{ textAlign: 'center' }}>Assessment Dimensions</h2>
            }

            <br></br>
            <div className="row">
            {props.dimensions && props.dimensions.map((dimension, index) => (

                <div key={index} className="col-sm-4" style={{"marginBottom": "20px"}}>
                  
                  <Card>
                    <Card.Body>
                      <Card.Title>
                      <h4 style={{ textAlign: 'center' }}>{dimension.m_szDimensionName}</h4>
                      </Card.Title>
                      <Card.Text tag="div">
                          {/* <div style={{textAlign: "left"}}
                            className={stylesresults.textDescription}
                              dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(dimension.m_szDimensionDesc)
                        }}
                      > </div> */}
                      <div
                        style={{ minHeight: '100px' }} dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            
                          props.textSize === 1 
                              ? dimension.m_szDimensionTagLine
                              : dimension.m_szDimensionDesc
                            
                            )
                        }}></div>
                      </Card.Text>
                    </Card.Body>

                  </Card>
                  
                  {/* <br></br>
                  <h4 style={{ textAlign: 'center' }}>{dimension.m_szDimensionName}</h4>
                  <br></br>
                  <div style={{textAlign: "left"}}
                    className={stylesresults.textDescription}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(dimension.m_szDimensionDesc)
                    }}
                  >
                  </div> */}


                </div>

            ))}
            </div>
          </div>

    );
}
export default DimensionsGrid;