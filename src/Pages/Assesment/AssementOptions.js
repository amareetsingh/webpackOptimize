import React from 'react';
import styles from './assesment.module.css';
import {Form} from "react-bootstrap";


function AssesmentOptions(props) {
    //console.log("props.data", props.data);
    return (
        <>
          {Object.keys(props.data).length > 0 &&
            props.data.hasOwnProperty('m_dictEvalOptionMeta') &&
            Object.keys(props.data.m_dictEvalOptionMeta).length > 0 && (
              <>
                {Object.keys(props.data.m_dictEvalOptionMeta).map((obj, index) => {
                  if (props.data.m_oLayout.m_nLayoutId != 0 && [35, 130, 131, 140, 170, 200].includes(props.data.m_dictEvalOptionMeta[obj].m_lEvalOptionId)) {
                    // Skip this iteration and move to the next one
                    return null;
                  }
      
                  return (
                    <div key={index}>
                      {props.data.m_dictEvalOptionMeta[obj].m_nSequenceNumber === props.type && (
                        <Form.Group className="mb-2 mt-4" controlId="formBasicCheckbox">
                          <Form.Label>{props.data.m_dictEvalOptionMeta[obj].m_szEvalOptionName}</Form.Label>
      
                          {Object.keys(props.data.m_dictEvalOptionMeta[obj].m_dictEvalOptionValues).map((subobj, jindex) => (
                            <div className={styles.inlineradio} key={`sub${jindex}`}>
                              <Form.Check
                                type="radio"
                                name={`chart${obj}`}
                                id={`sub-${obj}-${jindex}`}
                                label={props.data.m_dictEvalOptionMeta[obj].m_dictEvalOptionValues[subobj].m_szEvalOptionValueName}
                                value={props.data.m_dictEvalOptionMeta[obj].m_dictEvalOptionValues[subobj].m_lEvalOptionValueId}
                                checked={
                                  props.data.m_dictUserOptions[props.data.m_dictEvalOptionMeta[obj].m_lEvalOptionId] ===
                                  props.data.m_dictEvalOptionMeta[obj].m_dictEvalOptionValues[subobj].m_lEvalOptionValueId
                                }
                                onChange={(e) =>
                                  props.handleOptionAction(props.data.m_dictEvalOptionMeta[obj].m_lEvalOptionId, e.target.value)
                                }
                              />
                            </div>
                          ))}
                        </Form.Group>
                      )}
                    </div>
                  );
                })}
              </>
            )}
        </>
      );
      
}

export default AssesmentOptions;
