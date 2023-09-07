import React from 'react';

const MaturityChart = ({ ratings, levels, levelColors, szTitle, iteration }) => {
  
    // console.log("colors", levelColors);
    // console.log("ratings", ratings);
    // console.log("levels", levels);
  return (

    <div key={iteration}>
        <h2>{szTitle}</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
        <thead>
            
            <tr style={{backgroundColor: '#d8d8d8'}}>
            <th style={{ border: '1px solid #f2f2f2', padding: '10px', backgroundColor: '#f2f2f2'}}>Dimension</th>
            {levels.map((item) => (
                <th key={item.Key}
                style={{
                    border: '1px solid #f2f2f2',
                    padding: '10px',
                    //backgroundColor: levelColors[key] //levelColors[Object.keys(levels).find((key) => levels[key] === header)] || 'white',
                }}
                >
                {item.Value}
                </th>
            ))}
        </tr>
        
        </thead>
        <tbody>
            {ratings.map((dimBand) => (
                <tr key={dimBand.Key}>
                    <td style={{ border: '1px solid #f2f2f2', padding: '10px' }}>{dimBand.Key}</td>
                    {levels.map((item) => (
                    
                    <td key={item.Key+dimBand.Key}
                        style={{
                        border: '1px solid #f2f2f2',
                        backgroundColor: dimBand.Value == item.Key ? levelColors[item.Key] : 'white',
                        padding: '10px',
                        }}
                    >
                    </td>
                    
                    ))}
                </tr>
            ))}

        </tbody>
        </table>
    </div>
  );
};

export default MaturityChart;
