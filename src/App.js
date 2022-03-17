import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import FoodItem from "./foodItem";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [foodResult, setFoodResult] = useState(null);
  const [isFoodLoaded, setIsFoodLoaded] = useState(false);

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
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  const getFoods = async () => {
    const response = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=5f77f93cb8fc4173ace74f8a012bfed3&cuisine=African"
    );
    const data = await response.json();
    setFoodResult(data.results);
    console.log(data.results);
  };
  useEffect(() => {
    getFoods();
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
          {foodResult.map((item) => {
            return (
              <FoodItem key={item.id} name={item.title} image={item.image} />
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
