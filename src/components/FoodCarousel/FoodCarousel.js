import { useEffect, useState, useRef } from 'react';
import FoodItem from './foodItem';

const delay = 2500;

export default function FoodCarousel(props) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === props.items.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, props.items.length]);

  return (
    <div className='slideshow'>
      <div
        className='slideshowSlider'
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {props.items.map((fooditem, index) => {
          return (
            <div className='slide' key={index}>
              <FoodItem
                key={fooditem.id}
                name={fooditem.title}
                image={fooditem.image}
                url={fooditem.sourceUrl}
              />
            </div>
          );
        })}
      </div>

      <div className='slideshowDots'>
        {props.items.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? ' active' : ''}`}
              onClick={() => {
                setIndex(idx);
              }}></div>
          );
        })}
      </div>
    </div>
  );
}
