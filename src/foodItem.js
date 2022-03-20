import react, { useEffect, useState } from "react";

export default function FoodItem(props) {
  return (
    <div className="food-item-container">
      <h3>{props.name}</h3>

      <img
        className="food-item-img"
        src={props.image}
        alt="food item image"
      ></img>

      <a href={props.url}>
        <h3>Check out the recipe here</h3>
      </a>
    </div>
  );
}
