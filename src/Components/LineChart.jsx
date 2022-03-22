import { useEffect, useState } from "react";
import "./LineChart.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = (results) => {
  const tempertureDataPoints = results.results.list.map((index) => {
    return index.main.temp - 273.15;
  });
  const timeLabels = results.results.list.map((index) => {
    let date = new Date(index.dt * 1000);
    let day = date.toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return day;
  });
  return (
    <div class="line-container">
      <Line
        class="line-chart"
        datasetIdKey="id"
        data={{
          labels: timeLabels,
          datasets: [
            {
              label: "Temperature in Celcius",
              data: tempertureDataPoints,
              fill: true,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
