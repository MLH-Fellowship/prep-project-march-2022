import { useEffect, useState, createContext } from "react";
import './App.css';
import logo from './mlh-prep.png'
import Mymap from './components/Mymap'
import Results from './components/Results'
import Input from './components/Input'
//import { Wrapper, Status } from "@googlemaps/react-wrapper";

//import Marker from './components/Marker'


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York")
  const [results, setResults] = useState(null);
  const [latLng, setLatLng] = useState([40.71427, -74.00597])
  const [clickedLast, setClickedLast] = useState(false)

  //console.log(city)

  

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
          clickedLast={clickedLast}
          setClickedLast={setClickedLast}

          
        />
        <Results 
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
               clickedLast={clickedLast}
               setClickedLast={setClickedLast}
          />
          <>
        
          <div id="map">
        <Mymap 
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
               clickedLast={clickedLast}
               setClickedLast={setClickedLast}
         />  
          </div>
          
            

                
              
          </>
        
      </div>
    </>
  )
}
export default App;
