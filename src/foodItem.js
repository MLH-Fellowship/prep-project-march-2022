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
    </div>
  );
}
