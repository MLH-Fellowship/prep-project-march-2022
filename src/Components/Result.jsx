import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Result = (results) => {

  const tempertureDataPoints = results.results.list.map(function(index) {
    return index.main.temp-273.15
    
  })

  const timeLabels = results.results.list.map(function(index) {
    var date = new Date(index.dt*1000);
    var day = date.toLocaleDateString("en-US") 
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = day + " " + hours + ':' + minutes.substr(-2)
    return formattedTime
  })

  return <div>
      <Line
        style={{backgroundColor: "white", margin: "2%"}}
        datasetIdKey='id'
        data={{
          labels: timeLabels,
          datasets:[{
            label: "Temperature in Celcius",
            data: tempertureDataPoints
          }]
        }}
      />
    </div>
  }

export default Result;
