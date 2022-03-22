import React from "react"

export default function Results({results, error, isLoaded}){


      if (error) {
        return <div>Error: {error.message}</div>;
      } else {
        return (
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3 className="weather">{results.weather[0].main}</h3>
            <p className="feels">Feels like {Math.floor(results.main.feels_like)-272}°C</p>
            <i><p className="address">{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
        )}

}