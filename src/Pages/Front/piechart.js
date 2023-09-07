import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

function Piechart(props) {

  const data = {      
    labels: props.data.m_oJSONData.labels,
    datasets: props.data && props.data.m_oJSONData.datasets
  };
  const options= {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },   
      }
    }
  }

    return (
        <Pie data={data} options={options}/>
        );
}
export default Piechart;