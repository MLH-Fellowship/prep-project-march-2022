import React from 'react';
import Slider from 'react-slick';
import SuggestionCard from './suggestionCard.js';
import data from './data';

import './suggestions.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Suggestions(props){
    // fetching the items related to the weather condition
    let items = data[props.weather.toLowerCase()];

    // error handling if data doesn't exist
    if(!items){
        items = [];
    }

    // carousel settings
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
                    {items.map((item, idx)=>
                        <SuggestionCard key = {idx} item = {item}/>
                    )}
                </Slider>
            </div>
        </div>
    )
}

export default Suggestions;