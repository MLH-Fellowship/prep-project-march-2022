import { useEffect, useState } from "react";
import './App.css';
import Playlist from "./components/Playlist";
import { ACCESS_TOKEN_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./constants";
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [weatherCondition, setWeatherCondtion] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const getToken = async () => {
      let response = await fetch(ACCESS_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET, 'utf8').toString('base64')
        },
        body: 'grant_type=client_credentials'
      })
      const data = await response.json()

      setToken(data.access_token)
    }
    getToken()
  }, []);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
            setWeatherCondtion(results?.weather[0]?.main)
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
    return (
      <>
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
          {weatherCondition && <Playlist city={city} weatherCondition={weatherCondition} token={token} />}
        </div>
      </>
    )
  }
}

export default App;
