import React, {useEffect}  from 'react';
import DOMPurify from "dompurify";
import stylesresults from '../../Pages/Analyticsresult/analyticsresult.module.css';
import { checkOptionSetting } from '../../Context/functions';
import DimensionsGrid from './DimensionsGrid';
import DimensionsTabbed from './DimensionsTabbed';  

function DimensionsDisplay({dimensions, display, textSize}) {
  
  if (!dimensions) {
    return null;
  }

    return (

      <>

          {display===1 &&
            <DimensionsTabbed
              dimensions={dimensions}
              textSize={textSize}
            />
          }

        {display===2 &&
            <DimensionsGrid 
              dimensions={dimensions}
              textSize={textSize} 
            />
        }

      </>
    );
}
export default DimensionsDisplay;