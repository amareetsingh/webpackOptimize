import React from 'react';
import Bargraph from '../../Components/Bargraph';
import Polargraph from './Polargraph';
import Piegraph from './piechart';
import Radargraph from '../../Components/Radargraph';


function GraphData(props) {
    
	return (
        <>
        { typeof props.data !== 'undefined' && 
            
            <>
              { typeof props.data !== 'undefined' &&  Object.keys(props.data).map((element,index)=>(
                  <div key={index}>
                  
                   {element === props.chartType && 
                   <>
                    { props.title === true && 
                    ( <h2>{ props.data  && props.data[element].m_szChartTitle }</h2>)
                    }
                    {
                        (props.data[element].m_nChartType) === 4 &&
                        <Polargraph title={props.title} key={index} data={props.data[element]}/>
                    }
                    {
                        (props.data[element].m_nChartType) === 2 &&
                        <Bargraph title={props.title} key={index} data={props.data[element]}/>
                    }
                    {
                        (props.data[element].m_nChartType) === 3 &&
                        <Piegraph  key={index} data={props.data[element]}/>
                    }
                    {
                        (props.data[element].m_nChartType) === 1 &&
                        <Radargraph key={index} data={props.data[element]}/>
                    }
                    </>}
                    
                  </div>
              ))}
            </>
         }
        </>
               
	);
}

export default GraphData;
