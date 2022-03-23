import React from "react"

export default function Input({city, setCity, setLatLng, results, clickedLast, setClickedLast, setIsLoaded, error}) {

    React.useEffect(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_APIKEY}`)
            .then(res => res.json())
            .then(result =>{
                setLatLng([result[0].lat, result[0].lon])
                setClickedLast(false)
            })  
            }, [city]) 
            
            
    return (
        <div className="input">
            <h2>Enter a city below 👇</h2>
            <input
                id="city"
                type="text"
                value={clickedLast ? results.name : city}
                onChange={event => setCity(event.target.value)} />   
            </div>
    )
                  
   }