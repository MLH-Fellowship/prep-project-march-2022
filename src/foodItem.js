import react, { useEffect, useState } from "react";

export default function FoodItem(props) {
  return (
    <div className="food-item-container">
      <h2>{props.name}</h2>
      <img
        className="food-item-img"
        src={props.image}
        alt="food item image"
      ></img>
      
      <a href={props.url}><h2>Check out the recipe here</h2></a>
    </div>
  );
}
