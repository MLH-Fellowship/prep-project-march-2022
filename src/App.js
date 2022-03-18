import { useEffect, useState, useRef } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import FoodItem from "./foodItem";
import FoodCarousel from "./FoodCarousel";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);

  const [fooditems, setFooditems] = useState(null);

  const change = (response) => {
    let endpoint1 =
      "https://api.spoonacular.com/recipes/complexSearch/?apiKey=" +
      process.env.REACT_APP_FOODAPIKEY;
    let endpoint2 = endpoint1;
    let endpoint3 = endpoint1;
    if (response.weather[0].main === "Rain") {
      endpoint1 = endpoint1 + "&query=noodle,soup&number=5&sort=random";
      endpoint2 = endpoint2 + "&query=pot&number=5&sort=random";
      endpoint3 = endpoint3 + "&type=fingerfood&number=5&sort=random";
    } else if (
      response.weather[0].main === "Snow" ||
      response.main.feels_like < 10
    ) {
      endpoint1 = endpoint1 + "&type=soup&number=5&sort=random";
      endpoint2 = endpoint2 + "&query=mug&number=5&sort=random";
      endpoint3 = endpoint3 + "&query=stroganoff&number=5&sort=random";
    } else {
      endpoint1 = endpoint1 + "&type=beverage&number=5&sort=random";
      endpoint2 = endpoint2 + "&query=summer,salad&number=5&sort=random";
      endpoint3 = endpoint3 + "&query=sorbet&number=5&sort=random";
    }

    Promise.all([
      fetch(endpoint1 + "&addRecipeInformation=true").then((res) => res.json()),
      fetch(endpoint2 + "&addRecipeInformation=true").then((res) => res.json()),
      fetch(endpoint3 + "&addRecipeInformation=true").then((res) => res.json()),
    ]).then(
      (food) => {
        if (food != null) {
          let arr = food[0]["results"]
            .concat(food[1]["results"])
            .concat(food[2]["results"]);
          setFooditems(arr);
          console.log(fooditems);
        } else {
          console.log("No results found");
        }
      },
      (error) => {
        console.log(error);
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
          <h2 className="food-recommendations-title">
            Hungry? Here's some food you may like 😋
          </h2>

          {fooditems && <FoodCarousel items={fooditems} />}
        </div>
      </>
    );
  }
}

export default App;
