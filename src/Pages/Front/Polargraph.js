import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { PolarArea } from 'react-chartjs-2';
  
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  

function Polargraph(props) {
 
     /*const datas = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 12, 11, 12, 11, 11],
            backgroundColor: [
              '#4285F4',
              '#473e8f',
              '#645f91',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      };*/
      let showsubtitle = false;
      //console.log("polar", props.data)
      if( props.title == false  ){
        showsubtitle = true
      }

      const data = { 

        labels: props.data.m_oJSONData.labels,
        datasets: props.data && props.data.m_oJSONData.datasets
      };
      const options = {
        responsive: true,
        
        scales: {
         
            r: {  
                startAngle:270,            
                legend: {
                    display: false
                },
                suggestedMax:(props.data && props.data.m_nSuggestedMax),
                // max:(props.data && props.data.m_nMaxTicks),
                max:(props.data && props.data.m_nSuggestedMax),
                stepSize: (props.data && props.data.m_nStepSize),
                ticks: {
                    display: false
                },
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    callback: (label) => {
                      return label.length > 30 ? label.substr(0, 30) + '...' : label;
                    },
                    font: {
                      size: 10
                    }
                    
                }
            }
        },
        plugins: {
          legend: {
            display: false
          },
          
          title: 
          {
            display: showsubtitle,
            text: (props.data && props.data.m_szChartTitle)
          }
        },
    };

// console.log('polar data', data);
// console.log('polar options', options);

    return (
      <PolarArea  data= {data} options={options}/>
        );
}
export default Polargraph;