import React, { useState } from 'react';
import './Chart.css'

// Chart selection form component
function ChartSelectionForm({ onSubmit }) {
    const [chartType, setChartType] = useState('');

    const handleChange = (event) => {
        setChartType(event.target.value);
        console.log(chartType)
    };

    return (
        <form onSubmit={(event) => onSubmit(event, chartType)}>
            <label>
                Chart type:
                <select value={chartType} onChange={handleChange}>
                    <option value="bar">Bar chart</option>
                    <option value="pie">Pie chart</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default ChartSelectionForm;

