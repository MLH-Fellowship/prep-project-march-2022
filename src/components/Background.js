import react from "react";
import clouds from "./assets/clouds.mp4";
import clearsky from "./assets/clearsky.mp4";
import rainlightning from "./assets/rain-lightning.mp4";
import sunny from "./assets/sunny.mov";
import thunderstorm from "./assets/thunderstorm.mp4";
import snow from "./assets/snow.mov";
import drizzle from "./assets/drizzle.mov";
import fog from "./assets/fog.mp4";

const Background = (props) => {
  const weather = props.currweather;
  if (weather === "Clouds") {
    return (
      <video autoPlay loop muted id="video">
        <source src={clouds} type="video/mp4" />
      </video>
    );
  } else if (weather === "Clear") {
    return (
      <video autoPlay loop muted id="video">
        <source src={clearsky} type="video/mp4" />
      </video>
    );
  } else if (weather === "Sunny") {
    return (
      <video autoPlay loop muted id="video">
        <source src={sunny} type="video/mp4" />
      </video>
    );
  } else if (weather === "Snow") {
    return (
      <video autoPlay loop muted id="video">
        <source src={snow} />
      </video>
    );
  } else if (weather === "Thunderstorm") {
    return (
      <video autoPlay loop muted id="video">
        <source src={thunderstorm} type="video/mp4" />
      </video>
    );
  } else if (weather === "Rain") {
    return (
      <video autoPlay loop muted id="video">
        <source src={rainlightning} type="video/mp4" />
      </video>
    );
  } else if (weather === "Drizzle") {
    return (
      <video autoPlay loop muted id="video">
        <source src={drizzle} />
      </video>
    );
  } else if (
    weather === "Mist" ||
    weather === "Smoke" ||
    weather === "Haze" ||
    weather === "Fog"
  ) {
    console.log("haze");
    return (
      <video autoPlay loop muted id="video">
        <source src={fog} />
      </video>
    );
  }
  //    else if (
  //     weather === "Dust" ||
  //     weather === "Sand" ||
  //     weather === "Ash" ||
  //     weather === "Squall" ||
  //     weather === "Tornado"
  //   ) {
  //     return <DustBg children={children} />;
  //   }
  else {
    console.log("inside else");
    return (
      <video autoPlay loop muted id="video">
        <source src="" type="video/mp4" />
      </video>
    );
  }
};

export default Background;
