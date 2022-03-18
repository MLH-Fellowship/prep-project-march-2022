import { useEffect, useState } from "react";
import './App.css';
import Playlist from "./components/Playlist";
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const WEATHER_API_KEY = '3055aee78f153c35e0fa1c8d0afdaf90'
  const [weather_condition, set_weather_condtion] = useState('')

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
            set_weather_condtion(results?.weather[0]?.main)
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
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
        {/* <a href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>login</a> */}

        {weather_condition && <Playlist city={city} weather_condition={weather_condition} />}
      </div>
    </>
  }
}

export default App;
