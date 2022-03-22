import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import Map from './components/Map'
import Results from './components/Results'
import Input from './components/Input'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York")
  const [results, setResults] = useState(null);
  const [latLng, setLatLng] = useState([40.71427, -74.00597])
  console.log(city)

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLng[0]}&lon=${latLng[1]}&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);  
            setResults(result);
            //setCity(result.name)
        }
    },
    (error) => {
        setIsLoaded(true);
        setError(error);
    } 
    )

  }, [latLng])

  return(
    <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div className='container'>
        <Input 
          setCity={setCity}
          city={city}
          setError={setError}
          setIsLoaded={setIsLoaded}
          setResults={setResults}
          setLatLng={setLatLng}
          latLng={latLng}
          isLoaded={isLoaded}
          results={results}
          error={error}
          
        />
        <Results 
          setError={setError}
          setIsLoaded={setIsLoaded}
          setResults={setResults}
          latLng={latLng}
          isLoaded={isLoaded}
          results={results}
          error={error}
        />
        <div id='map'>
          {isLoaded && results && <>
            <Map 
            setLatLng={setLatLng}
            latLng={latLng}
            googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEAPIKEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px`}} />}
            mapElement={<div className={`map-google`} style={{ height: `100%`}} />}/>
          </>}
        </div>
      </div>
    </>
  )
}
export default App;
