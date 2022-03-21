import { useEffect, useState, useMemo } from "react";
import "./App.css";
import axios from "axios";
import Result from "./Components/Result";
import logo from "./mlh-prep.png";
import { DebounceInput } from "react-debounce-input";
const { REACT_APP_APIKEY } = process.env;


function App() {
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Tokyo");
  const [latitude, setLatitude] = useState("35");
  const [longitude, setLongitude] = useState("139");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const url = "https://api.openweathermap.org/data/2.5/weather?q=";

  let forceNotifyByEnter = true

  const fetchLocation = async (location) => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${REACT_APP_APIKEY}`
      )
      .then((res) => {
        setLatitude(res.data[0].lat);
        setLongitude(res.data[0].lon);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  };
  const fetchWeatherData = async () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_APIKEY}`
      )
      .then((res) => {
        const allData = res.data;
        setResults(allData);
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };

  
  useEffect(async () => {
    try {
      setLoading(true);
      try {
        fetchLocation(city);
      } catch (error) {
        console.log(error);
      }
      const results = await fetchWeatherData();
      setResults(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
    }
  }, [city]);
  

  if (error) return <div>Error: {error.message}</div>;

  if (loading) return <span>Loading</span>;

  if (!results) return <span>Data not available</span>;
  return (
    <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <DebounceInput
            minLength={5}
            debounceTimeout={2000}
            value={city}
            forceNotifyByEnter={forceNotifyByEnter}
            onChange={event => setCity(event.target.value)} /> 
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && (
            <>
              <h3>{results.weather[0].main}</h3>
              <p>Feels like {results.main.feels_like}°C</p>
              <i>
                <p>
                  {results.name}, {results.sys.country}
                </p>
              </i>
            </>
          )}
        </div>
      </div>
      <Result results={results} />
    </>
  );
}
export default App;
