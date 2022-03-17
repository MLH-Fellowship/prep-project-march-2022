import React from 'react';
import Slider from 'react-slick';
import SuggestionCard from './suggestionCard.js';

import './suggestions.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { useState } from 'react/cjs/react.production.min';


function Suggestions(props){
    // const [weat, setWeat] = useState('');
    const suggest = {
        "thunderstorm": ["raincoat" ],
        "drizzle": ["raincoat"],
        "rain": ["umbrella"],
        "snow": ["snowboots"],
        "mist": ["umbrella"],
        "clear": ["sunglasses"],
        "clouds": ["umbrella"]
    }
    const weat = props.weather.toLowerCase();
    console.log(suggest[weat]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        swipeToSlide: true,
      };

    return(
        <div className="suggestions">
            <h2>What to bring ?</h2>
            <div className="slider-wrapper">
                <Slider {...settings}>
                    <SuggestionCard/>
                    <SuggestionCard/>
                </Slider>
            </div>
        </div>
    )
}

export default Suggestions;