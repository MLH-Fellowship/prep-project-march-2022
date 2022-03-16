import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [address, setAddress] = useState("New York City");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    setAddress(value);
    setCity(results[0].address_components[0].long_name);
  };
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
        {/* <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} /> */}

          <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
          >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div>
            <input {...getInputProps({placeholder: ""})}/>
            
            <div>
              {loading ? <div> Loading </div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active? "#41b6e6" : "#fff"
                };
                return <div>
                  <div className="suggestionContainer" {...getSuggestionItemProps(suggestion, {style})}> 
                <span>{suggestion.description} </span>
                </div>
                </div>
              })}
            </div>

            </div>
            )}
          </PlacesAutocomplete>



        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;
