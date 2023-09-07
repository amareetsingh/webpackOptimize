import React from 'react'
import Chart from 'react-google-charts'
import DOMPurify from "dompurify";

const GanttChart = (props) => {
    
    
    const { dictGoals, id, name, startDate, endDate } = props;
 
    let chartHeight = (dictGoals && Object.keys(dictGoals).length > 0) ? (dictGoals && Object.keys(dictGoals).length * 40) : 200;
    if(chartHeight < 200)
        chartHeight = 200;

    const tasks = [];

    dictGoals && Object.values(dictGoals).map(item => {
        
        let startDate = new Date(item.m_dtGoalStartDate);
        let endDate = new Date(item.m_dtGoalDueDate);
        const duration = Math.round((item.m_dtGoalDueDate - item.m_dtGoalStartDate) / (1000 * 60 * 60 * 24));
        
        let percentComplete = item.m_nGoalStatus === 2 ? 100 : 0;
        
        const regex = /(<([^>]+)>)/ig;
        let goaldesc = DOMPurify.sanitize(item.m_szGoalDesc.replace(regex, ''));
        
        tasks.push([
            item.m_lGoalId,
            //item.m_szGoalDesc,
            goaldesc,
            // <span dangerouslySetInnerHTML={{ __html: item.m_szGoalDesc }} />,
            // {__html: item.m_szGoalDesc},
            startDate,
            endDate,
            duration,
            percentComplete,
            null,
            // "Start:" + startDate +" End:"  + endDate, 
        ])
    });


    const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        // { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
        // { type: "string", label: "Tooltip" }
    ];


    // console.log('task', tasks)

    const data = [columns, ...tasks];

    const options = {
        height: chartHeight,
        gantt: {
            trackHeight: 30,
        },
        // tooltip: {
        //     textStyle: {
        //         fontName: 'Arial',
        //         fontSize: 12,
        //         color: '#000'
        //     },
        //     isHtml: true,
        //     showColorCode: true,
        //     trigger: 'focus',
        //     formatter: (data) => {
        //         return `Start: ${data.start}<br>End: ${data.end}`;
        //     }
        // }
    };
    
    return (
        
        (dictGoals && Object.keys(dictGoals).length > 0 ? 
        <div className="container mt-5" styles={"height:500px; overflow:scroll;"}>
            {/* <h2>Goals Dashboard</h2> */}
            <Chart
                chartType="Gantt"
                width="100%"
                height="100%"
                data={data}
                options={options}
            />
        </div>
        : <div>No Goals Yet</div>
        )
    )
}

export default GanttChart
