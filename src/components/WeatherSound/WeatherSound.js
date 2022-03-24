import React, { useState } from 'react';
import { Howl } from 'howler';
import ReactHowler from 'react-howler';
import './weatherSounds.css';
import rain from '../../assets/sounds/LightRain.mp3';
import snow from '../../assets/sounds/Snow.mp3';
import drizzle from '../../assets/sounds/RainBackVerandah.mp3';
import thunderstorm from '../../assets/sounds/RollingThunder.mp3';
import wind from '../../assets/sounds/Wind.mp3';
import {BsFillVolumeMuteFill, BsFillVolumeUpFill} from 'react-icons/bs';

const soundMap = {
  Thunderstorm: thunderstorm,
  Drizzle: drizzle,
  Rain: rain,
  Snow: snow,
  Wind: wind
};

class WeatherSounds extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      playing: false
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  handlePlay () {
    this.setState({
      playing: true
    })
  }

  handlePause () {
    this.setState({
      playing: false
    })
  }

  render () {
   
      return (
        <div>
          <ReactHowler
            src={soundMap[this.props.weatherName] ?? rain}
            playing={this.state.playing}
          />
          {
            this.state.playing ? 
            <BsFillVolumeUpFill  onClick={this.handlePause} size = {32}></BsFillVolumeUpFill>:
            <BsFillVolumeMuteFill onClick={this.handlePlay} size = {32}></BsFillVolumeMuteFill>
          }
        </div>
      )
  }
}

export default WeatherSounds;