import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./HourlyForecast.css";

import { useEffect, useState } from "react";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const HourlyForecast = (results) => {
  console.log(results)
  
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=daily&appid="+process.env.REACT_APP_APIKEY)
        .then((res) => res.json())
        .then(
            (result) => {
                if (result.cod !== "200") {
                   console.log(result);
                   console.log("😍 = " + result.hourly[0].feels_like);
                   console.log("😍 = " + result.hourly[0].weather[0].icon);
                   const dt = result.hourly[0].dt;
                   var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                   var day = new Date(dt*1000);
                   console.log(day.getUTCHours() + " UTC")
                   console.log(days[day.getDay()])
                } else {
                   console.log("Something is worng Error");
              
                }
            }
        )
        .catch(err => console.log(err.message));

}, []);

  return (
    <div>
      <div className="component">
        <Carousel responsive={responsive}>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
        </Carousel>
      </div>
    </div>
  );
};

export default HourlyForecast;
