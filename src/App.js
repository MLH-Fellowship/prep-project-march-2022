import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import Map from './components/Map'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  console.log(city)

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
            
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])

  const getCity = (place) => {
    if (place!==null) {
      console.log(place)
      setCity(place)
      document.getElementById('city').value=place
    }  
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div className='container'>
        <div className="input">
          <h2>Enter a city below 👇</h2>
          <input
            id="city"
            type="text"
            value={city}
            onChange={event => setCity(event.target.value)} />
        </div>
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3 className="weather">{results.weather[0].main}</h3>
            <p className="feels">Feels like {results.main.feels_like}°C</p>
            <i><p className="address">{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
        <div id='map'>
          {isLoaded && results && <>
            <Map 
            city={city}
            getCity={getCity}
            lat = {results.coord.lat}
            lon = {results.coord.lon}
            googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEAPIKEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px`}} />}
            mapElement={<div className={`map-google`} style={{ height: `100%`}} />}/>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;
