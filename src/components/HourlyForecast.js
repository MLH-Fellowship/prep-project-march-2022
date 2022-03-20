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


const HourlyForecast = ({results, lat, lon, city ,key}) => {

console.log(results)
console.log(lat)
console.log(lon)
console.log(city)
  const [data, setData] = useState(results);
  console.log(data)
  // let lat = 0
  // let lon = 0
  // console.log(lat+ " " + lon)

  // console.log(results);
  // console.log(results.lat)
  // setLat(results.lat);
  // setLon(results.lon)
  console.log("-----------------------")
  // console.log(lat);
  // console.log("😎=  " + lon)
  // console.log("-------------")
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=daily&appid="+process.env.REACT_APP_APIKEY)
        .then((res) => res.json())
        .then(
            (result) => {
                if (result.cod !== "200") {
                  //  console.log(result);
                   setData(result.hourly[8].feels_like);
                  //  console.log(data);
                  console.log("😴😴")
                   console.log("😍 = " + result.hourly[0].feels_like);
                  //  console.log("😍 = " + result.hourly[0].weather[0].icon);
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
        .catch(err => console.log(err));

},[city],[]);

const days = { 0 : 'Sun', 1 : 'Mon', 2 : 'Tue', 3 : 'Wed', 4 : 'Thu', 5 : 'Fri', 6 : 'Sat' };
const keys = Object.values(days);

console.log(data);
  return (
    <div>
      <div className="component">
        <Carousel responsive={responsive}>

        {
          keys.map((item, index) => (
            <CardContent>
            <Typography variant="h5" component="div">
            9 : 00 Am
            </Typography>
            <Typography color="text.secondary">{keys[index]}</Typography>
            <Typography variant="h4">{data}</Typography>
            </CardContent>
        ))
        }

        </Carousel>
      </div>
    </div>
  );
};

export default HourlyForecast;
