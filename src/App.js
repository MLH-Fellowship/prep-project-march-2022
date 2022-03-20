import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import SearchBox from './components/SearchBox'
import SongRecommendation from "./components/SongRecommendation/SongRecommendation";
import Suggestions from './components/suggestions/suggestions'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("Globe")
  const [results, setResults] = useState(null);

useEffect(() => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
      window.alert("Geolocation is not supported by this browser.");
    }

function showPosition(position){
  var lat=position.coords.latitude;
  var lon=position.coords.longitude;
  currentweather(lat,lon);
}
function showError(error){
    switch(error.code){
      case error.PERMISSION_DENIED:
                window.alert("User denied the request for Geolocation.")
              break;
              case error.POSITION_UNAVAILABLE:
                window.alert("Location information is unavailable.")
              break;
              case error.TIMEOUT:
                window.alert(" The request to get user location timed out.")
              break;
              case error.UNKNOWN_ERROR:
                window.alert("An unknown error occurred.")
              break;
    }
}

function currentweather(lat, lon){
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&appid=" + process.env.REACT_APP_APIKEY + "&units=metric") 
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
            setCity(result.name);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
}
},[])
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
    .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>

          <SearchBox 
            setCity={setCity}
          />

        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
        {isLoaded && results &&
        <Suggestions
          weather={results.weather[0].main}
        />
        }
      </div>
      <div>
            {isLoaded && results && <>
            <SongRecommendation options={results} />
            </>}
        </div>
    </>
  }
}

export default App;
