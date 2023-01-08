import React, {useState} from 'react';
import axios from 'axios';
import Chart from './Chart';
import ChartSelectionForm from "./ChartSelectionForm";
import Navbar from "../navbar/Navbar";

// Chart container component
function ChartContainer() {
    const username = localStorage.getItem('user');
    const [data, setData] = useState(null);
    const [chartType, setChartType] = useState('');

    const handleSubmit = (event, chartType) => {
        event.preventDefault();
        setChartType(chartType);
        // fetch data for selected chart type and render chart
        axios.get(`http://localhost:8080/data?username=${username}`)
            .then(response => {
                // render chart with data
                console.log("here3");
                console.log(response.data);
                setData(response.data);
            });
    };

    return (
        <>
            <Navbar />
            <div style={{display: "flex"}}>
                <ChartSelectionForm onSubmit={handleSubmit}/>
                {data ? <Chart data={data} chartType={chartType} log={null}/> : null}
            </div>
        </>
    );
}

export default ChartContainer;