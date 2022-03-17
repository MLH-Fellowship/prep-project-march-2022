import React from 'react'

function Suggestion(props) {
    const suggest = {
        "clear": ["sunglasses" ],
        "few clouds": ["sunglasses" ],
        "scattered clouds": ["sunglasses" ],
        "broken clouds": ["sunglasses" ],
        "shower rain": ["sunglasses" ],
        "rain": ["sunglasses" ],
        "thunderstorm": ["sunglasses" ],
        "snow": ["raincoat" ],
        "mist": ["sweater"]
    }
    const weat = props.weather.toLowerCase();
    console.log(suggest[weat]);
    return(
        <h1>
            Suggestion
        </h1>
    )
}

export default Suggestion;