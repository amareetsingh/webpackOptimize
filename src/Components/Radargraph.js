import React from 'react';

import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';

  ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
  );

 

function Radargraph(props) {
	// console.log("radar",props.data);
	const data = {      
		labels: props.data.m_oJSONData.labels,
		datasets: props.data && props.data.m_oJSONData.datasets
	  };
	  const options= {
		plugins: {
			legend: { display: props.data.m_nShowLegend === 1 ? true : false },
			title: {
			  display: true,
			  text: props.data && props.data.m_szChartTitle,
			},
		  },
		  scales: {         
            r: {  
				beginAtZero: true,  
				suggestedMax:(props.data && props.data.m_nSuggestedMax),
                maxTicks:(props.data && props.data.m_nMaxTicks),
                stepSize: (props.data && props.data.m_nStepSize),          
                legend: {
                    display: false
                },
                
                ticks: {
                    display: props.data && props.data.m_bDisplayTickValue // true
                },
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    callback: (label) => {
                      return label.length > 10 ? label.substr(0, 25) + '...' : label;
                    },
                    font: {
                      size: 10
                    }
                    
                }
            }
        },		  
	  }

    return (
        <Radar data={data} options={options}/>
        );
}
export default Radargraph;