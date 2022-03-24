import { useEffect, useState, createContext } from "react";
import './App.css';
import logo from './mlh-prep.png'
import MyMap from './components/MyMap'
import Results from './components/Results'
import Input from './components/Input'



function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York")
  const [results, setResults] = useState(null);
  const [latLng, setLatLng] = useState([40.71427, -74.00597])
  const [clickedLast, setClickedLast] = useState(false) // gives us conditional rendering of our Input value:
                                                              //to reflect the state of Results when the map is clicked 
                                                              //and 
                                                              //to setCity when user changes the input

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
        <MyMap 
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
