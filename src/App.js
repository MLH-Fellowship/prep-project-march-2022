import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import FoodItem from "./foodItem";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  

  const [fooditems, setFooditems] = useState(null);

  const change = (response) => {
    let endpoint =
      "https://api.spoonacular.com/recipes/complexSearch/?apiKey=" +process.env.REACT_APP_FOODAPIKEY;
    if (response.weather[0].main === "Rain") {
      endpoint = endpoint + "&query=noodle,soup";
    } else if (
      response.weather[0].main === "Snow" ||
      response.main.feels_like < 10
    ) {
      endpoint = endpoint + "&type=soup";
    } else {
      endpoint = endpoint + "&type=beverage&number=5";
    }

    fetch(endpoint+"&addRecipeInformation=true")
      .then((res) => res.json())
      .then(
        (food) => {
          if (food != null && food["totalResults"] > 0) {
            setFooditems(food["results"]);
            console.log(food["results"]);
            console.log(endpoint+"&addRecipeinformation=true");
          } else {
            console.log("No results found");
          }
        },
        (error) => {
          console.log("Error");
        }
      );
  };


  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
      
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
            setFooditems(null);
          } else {
            setIsLoaded(true);
            setResults(result);
            change(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city]);

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
        <div className="food-recommendations">
        {fooditems && (fooditems.map((item) => {
            return (
              <FoodItem key={item.id} name={item.title} image={item.image} url={item.sourceUrl} />
            );
          }))}
          
        </div>
      </>
    );
  }
  
  
}

export default App;
