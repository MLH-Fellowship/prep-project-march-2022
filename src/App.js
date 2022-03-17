import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Result from "./Components/Result";
import logo from "./mlh-prep.png";
const { REACT_APP_APIKEY } = process.env;

// function App() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [city, setCity] = useState("New York City");
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     fetch(
//       "https://api.openweathermap.org/data/2.5/weather?q=" +
//         city +
//         "&units=metric" +
//         "&appid=" +
//         process.env.REACT_APP_APIKEY
//     )
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           if (result["cod"] !== 200) {
//             setIsLoaded(false);
//           } else {
//             setIsLoaded(true);
//             setResults(result);
//           }
//         },
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, [city]);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else {
//     return (
//       <>
//         <img className="logo" src={logo} alt="MLH Prep Logo"></img>
//         <div>
//           <h2>Enter a city below 👇</h2>
//           <input
//             type="text"
//             value={city}
//             onChange={(event) => setCity(event.target.value)}
//           />
//           <div className="Results">
//             {!isLoaded && <h2>Loading...</h2>}
//             {console.log(results)}
//             {isLoaded && results && (
//               <>
//                 <h3>{results.weather[0].main}</h3>
//                 <p>Feels like {results.main.feels_like}°C</p>
//                 <i>
//                   <p>
//                     {results.name}, {results.sys.country}
//                   </p>
//                 </i>
//               </>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }
// }
function App() {

  const [error, setError] = useState(null);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
 

  const fetchWeatherData = () => {
    axios
      // .get(`${url}` + "tokyo" + "&units=metric" + `&appid=${REACT_APP_APIKEY}`)
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${REACT_APP_APIKEY}`
      )
      .then((res) => {
        const allData = res.data;
        setResults(allData);
        // console.log(allData);
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };

  useEffect(async () => {
    try {

      // set loading to true before calling API
      setLoading(true);
      const results = await fetchWeatherData();
      setResults(results);
      // switch loading to false after fetch is complete
      setLoading(false);
    } catch (error) {
      // add error handling here
      setLoading(false);
      console.log(error);
    }
  }, [city]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } 

  if(loading) return (
    <span>Loading</span>
  );

  // data will be null when fetch call fails
  if (!results) return (
    <span>Data not available</span>
  );
  return (
    <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
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
    

      <Result results={results} />;
    </>
  );
}
export default App;
