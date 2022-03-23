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

const HourlyForecast = ({ results, lat, lon, city }) => {
  const [data, setData] = useState(results);
  const [time, setTime] = useState(0);
  useEffect(
    () => {
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=daily&appid=" +
          process.env.REACT_APP_APIKEY
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.cod !== "200") {
            setData(result);
            const dt = result.hourly[0].dt;
            var days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            var day = new Date(dt * 1000);
            setTime(day.getUTCHours() + " UTC");
          } else {
            console.log("Something is worng Error");
          }
        })
        .catch((err) => console.log(err));
    },
    [city],
    []
  );

  const days = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  const keys = Object.values(days);
  const no = "10d";
  return (
    <div>
      <div className="component">
        <Carousel responsive={responsive}>
          {keys.map((item, index) => (
            <CardContent key={index}>
              <Typography variant="h5" component="div">
                {new Date(
                  data == null ? 0 : data.hourly[index].dt * 1000
                ).getUTCHours() + " UTC"}
              </Typography>
              <Typography color="secondary">
                {
                  keys[
                    new Date(
                      data == null ? 0 : data.hourly[index].dt * 1000
                    ).getDay()
                  ]
                }
              </Typography>
              <Typography variant="h4">
                {data == null ? 0 : data.hourly[index].feels_like.toFixed(2)}° K
              </Typography>
              <img
                src={`http://openweathermap.org/img/wn/${
                  data == null ? 0 : data.hourly[index].weather[0].icon
                }@2x.png`}
              />
            </CardContent>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HourlyForecast;
