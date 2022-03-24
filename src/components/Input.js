import React from "react"
// import SearchBox from ".components/SearchBox/SearchBox"
// Uncomment to implement Autocorrect feature and replace <input> with <SearchBox /> below

export default function Input({city, setCity, setLatLng, results, clickedLast, setClickedLast}) {
    
    //clickedLast sets the value of the input to the results.name returned from weather API  
    //clickedLast is set to true on click in the Map component
    
    //useEffect updates state only when the dependency is defined

    React.useEffect(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_APIKEY}`)
            .then(res => res.json())
            .then(result => {
                if (city[0] !== undefined) {
                setLatLng([result[0].lat, result[0].lon])
                setClickedLast(false)
            }
            })  
        }, [city]) 
        
        
        return (
            <div className="input">
            <h2>Enter a city below 👇</h2>
            {/*<SearchBox setCity= {setCity}/> */}
            <input
                id="city"
                type="search"
                value={clickedLast ? results.name : city}
                onChange={event => {
                    setCity(event.target.value)  
                    }} 
            />
            </div>
    )
                  
   }