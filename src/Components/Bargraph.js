import React  from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function Bargraph(props) {
  let showsubtitle = false;
if(props.title === false ){
 showsubtitle = true; 
 }
  
  // console.log('bargraph',props.data);
    const options = {
        responsive: true,
        scales:{
          x:{             
              ticks:{
                callback: function(index) {
                  let label = props.data.m_oJSONData.labels[index]
                 return label.length > 20 ? label.substr(0, 20) + '...' : label;
              },
              }
            },
            y:
            {
                beginAtZero: true,
                suggestedMax:(props.data && props.data.m_nSuggestedMax),
                max:(props.data && props.data.m_nSuggestedMax),
            }
          
          },  
         
        plugins: {
          legend: { display: false },
          title: {
            display: showsubtitle,
            text: props.data && props.data.m_szChartTitle,
          },
        },
      };
      
    //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   
    const data = {
        labels: props.data && props.data.m_oJSONData.labels,
        datasets: props.data && props.data.m_oJSONData.datasets
      };
    
    return (
      <>
            <Bar options={options} data={data} />
           
            </>
        );
}
export default Bargraph;