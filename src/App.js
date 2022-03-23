// import { useEffect, useState } from "react";
// import './App.css';
// import Playlist from "./components/playlists/Playlist";
// import { ACCESS_TOKEN_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./constants";
// import logo from './mlh-prep.png'
import { useEffect, useState, useRef } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import FoodItem from "./foodItem";
import FoodCarousel from "./FoodCarousel";
import SearchBox from './components/SearchBox'
import HourlyForecast from './components/HourlyForecast.js'
import Suggestions from './components/suggestions/suggestions'
import SongRecommendation from "./components/SongRecommendation/SongRecommendation";
import NewsUpdate from "./components/newsUpdate/NewsUpdate";


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [city, setCity] = useState("Globe")
  const [results, setResults] = useState(null);
  // const [weatherCondition, setWeatherCondtion] = useState('')
  // const [token, setToken] = useState('')
  const [lat, setLat] = useState(0.00);
  const [lon, setLon] = useState(0.00);

  const [fooditems, setFooditems] = useState(null);

  // const change = (response) => {
  //   let endpoint1 =
  //     "https://api.spoonacular.com/recipes/complexSearch/?apiKey=" +
  //     process.env.REACT_APP_FOODAPIKEY;
  //   let endpoint2 = endpoint1;
  //   let endpoint3 = endpoint1;
  //   if (response.weather[0].main === "Rain") {
  //     endpoint1 = endpoint1 + "&query=noodle,soup&number=5&sort=random";
  //     endpoint2 = endpoint2 + "&query=pot&number=5&sort=random";
  //     endpoint3 = endpoint3 + "&type=fingerfood&number=5&sort=random";
  //   } else if (
  //     response.weather[0].main === "Snow" ||
  //     response.main.feels_like < 10
  //   ) {
  //     endpoint1 = endpoint1 + "&type=soup&number=5&sort=random";
  //     endpoint2 = endpoint2 + "&query=mug&number=5&sort=random";
  //     endpoint3 = endpoint3 + "&query=stroganoff&number=5&sort=random";
  //   } else {
  //     endpoint1 = endpoint1 + "&type=beverage&number=5&sort=random";
  //     endpoint2 = endpoint2 + "&query=summer,salad&number=5&sort=random";
  //     endpoint3 = endpoint3 + "&query=sorbet&number=5&sort=random";
  //   }

  //   Promise.all([
  //     fetch(endpoint1 + "&addRecipeInformation=true").then((res) => res.json()),
  //     fetch(endpoint2 + "&addRecipeInformation=true").then((res) => res.json()),
  //     fetch(endpoint3 + "&addRecipeInformation=true").then((res) => res.json()),
  //   ]).then(
  //     (food) => {
  //       if (food != null) {
  //         let arr = food[0]["results"]
  //           .concat(food[1]["results"])
  //           .concat(food[2]["results"]);
  //         setFooditems(arr);
  //         console.log(fooditems);
  //       } else {
  //         console.log("No results found");
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };


  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition, showError);
  //   }
  //   else {
  //     window.alert("Geolocation is not supported by this browser.");
  //   }

  //   function showPosition(position) {
  //     let lat = position.coords.latitude;
  //     let lon = position.coords.longitude;
  //     currentweather(lat, lon);
  //   }
  //   function showError(error) {
  //     switch (error.code) {
  //       case error.PERMISSION_DENIED:
  //         window.alert("User denied the request for Geolocation.")
  //         break;
  //       case error.POSITION_UNAVAILABLE:
  //         window.alert("Location information is unavailable.")
  //         break;
  //       case error.TIMEOUT:
  //         window.alert(" The request to get user location timed out.")
  //         break;
  //       case error.UNKNOWN_ERROR:
  //         window.alert("An unknown error occurred.")
  //         break;
  //       default:
  //         window.alert('')
  //     }
  //   }

  //   function currentweather(lat, lon) {
  //     fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.REACT_APP_APIKEY + "&units=metric")
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           if (result['cod'] !== 200) {
  //             setIsLoaded(false)
  //           } else {
  //             setIsLoaded(true);
  //             setResults(result);
  //             setCity(result.name);
  //           }
  //         },
  //         (error) => {
  //           setIsLoaded(true);
  //           setError(error);
  //         }
  //       )
  //   }
  // }, [])

  // useEffect(() => {
  //   const getToken = async () => {
  //     let response = await fetch(ACCESS_TOKEN_ENDPOINT, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET, 'utf8').toString('base64')
  //       },
  //       body: 'grant_type=client_credentials'
  //     })
  //     const data = await response.json()

  //     setToken(data.access_token)
  //   }
  //   getToken()
  // }, []);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
            setFooditems(null);
          } else {
            setIsLoaded(true);
            setResults(result);
            // setWeatherCondtion(results?.weather[0]?.main)
            setLat(result.coord.lat);
            setLon(result.coord.lon)
            // change(result);
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
          {city && <NewsUpdate city={city} />}
          {/* {weatherCondition && <Playlist city={city} weatherCondition={weatherCondition} token={token}/>} */}
          {/* {isLoaded && results &&
            <Suggestions
              weather={results.weather[0].main}
            />
          }
        </div>
        <div>
          <HourlyForecast results={results} lat={lat} lon={lon} city={city} key={1} />
        </div> */}
        {/* <div>
            {isLoaded && results && <>
            <SongRecommendation options={results} />
            </>}
        </div> */}
        {/* <div className="food-recommendations">
          <h2 className="food-recommendations-title">
            Hungry? Here's some food you may like 😋
          </h2>

          {fooditems && <FoodCarousel items={fooditems} />}*/}
        </div> 
      </>
    );
  }
}

export default App;