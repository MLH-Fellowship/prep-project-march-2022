import { Howl } from 'howler';
import {BsFillVolumeMuteFill, BsFillVolumeUpFill} from 'react-icons/bs';
import './weatherSounds.css';
import rain from '../../assets/sounds/LightRain.mp3';
import snow from '../../assets/sounds/Snow.mp3';
import drizzle from '../../assets/sounds/RainBackVerandah.mp3';
import thunderstorm from '../../assets/sounds/RollingThunder.mp3';
import wind from '../../assets/sounds/Wind.mp3';
import { useEffect, useState } from 'react';

const soundMap = {
  Thunderstorm: thunderstorm,
  Drizzle: drizzle,
  Rain: rain,
  Snow: snow,
  Wind: wind
};

function WeatherSounds({ weatherName }) {
  let isSoundOn = false;
  const weatherSound = soundMap[weatherName] ?? rain;
 
  const sound = weatherSound
    ? new Howl({
        src: [weatherSound],
        loop: true,
      })
    : null;

  const toggleSound = () => {
    isSoundOn = !isSoundOn;
    if (sound !== null) {
      if (isSoundOn) {
        sound.play(undefined, false);
      } else {
        sound.stop(undefined, false);
      }
    }
    
  };

  return (
    <div className="soundButton">
    <div className = "button" onClick={toggleSound}>
      {
        !isSoundOn? <BsFillVolumeMuteFill></BsFillVolumeMuteFill> : <BsFillVolumeUpFill></BsFillVolumeUpFill>
      }
    </div>
      
      <label className="switch" htmlFor="soundCheckbox">
        <input type="checkbox" id="soundCheckbox" onChange={toggleSound} />
        <span className="soundslider round" />
      </label>
    </div>
  );
}

export default WeatherSounds;