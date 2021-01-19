import Chart from 'chart.js';
import React, { useEffect, useRef, useState } from "react";


const options = {
    scale: {
        angleLines: {
            display: false
        },
        ticks: {
            suggestedMin: 1,
            suggestedMax: 2
        }
    }
};

const RadarChart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const getData = () => {
            fetch('data/world-happiness-dataset/happiness_2019.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                const limitedData = {
                    'labels': data.labels,
                    'datasets': data.datasets.slice(0,6).concat(data.datasets.slice(150,255))
                }
                console.log(limitedData)
                setChartData(limitedData);
                if (chartContainer && chartContainer.current) {
                    const radarChart = new Chart(chartContainer.current, {
                        type: 'radar', 
                        data: limitedData,
                        options: options
                    });
                    setChartInstance(radarChart);
                }
            });
        };
        getData();
        
    }, [chartContainer]);

    return(
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default RadarChart;


