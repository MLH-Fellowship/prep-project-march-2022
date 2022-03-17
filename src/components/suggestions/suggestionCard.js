import React from 'react';
import LottieControl from './Lottie';
import Sunglasses from '../../assets/lottiefiles/sunglasses.json';

function SuggestionCard(){
    return (
        <div className="card">
            <div className="card-img">
                <LottieControl animationData={Sunglasses} />
            </div>
            
            <h2 className="primary-text"> Sunglasses <br/></h2>
        </div>
    )
}
export default SuggestionCard;