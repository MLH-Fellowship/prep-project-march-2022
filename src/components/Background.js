import clouds from "../assets/backgrounds/clouds.mp4";
import clearsky from "../assets/backgrounds/clearsky.mp4";
import rainlightning from "../assets/backgrounds/rain-lightning.mp4";
import sunny from "../assets/backgrounds/sunny.mp4";
import thunderstorm from "../assets/backgrounds/thunderstorm.mp4";
import snow from "../assets/backgrounds/snow.mp4";
import drizzle from "../assets/backgrounds/drizzle.mov";
import dust from "../assets/backgrounds/dust.mp4";
import haze from "../assets/backgrounds/haze.mp4";

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
    weather === "Tornado" ||
    weather === "Haze" ||
    weather === "Fog"
  ) {
    return (
      <video autoPlay loop muted id="video">
        <source src={haze} />
      </video>
    );
  } else if (
    weather === "Dust" ||
    weather === "Sand" ||
    weather === "Ash" ||
    weather === "Squall" ||
    weather === "Smoke"
  ) {
    return (
      <video autoPlay loop muted id="video">
        <source src={dust} />
      </video>
    );
  } else {
    console.log("inside else");
    return (
      <video autoPlay loop muted id="video">
        <source src="" type="video/mp4" />
      </video>
    );
  }
};

export default Background;
