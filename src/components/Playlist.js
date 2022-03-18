import React from 'react'
import { useEffect, useState } from "react";
import CardListing from './CardListing';

function Playlist({ city, weather_condition }) {

    const USER_ACCESS_TOKEN = process.env.REACT_APP_USER_ACCESS_TOKEN

    const SPOTIFY_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
    const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT
    const RESPONSE_TYPE = "token"
    const SPOTIFY_PLAYLIST = 'playlist'

    const WEATHER_CONDITIONS = {
        '': "0CO1cuUdd1OTPr3omZCS2Q",
        "Clouds": "0CO1cuUdd1OTPr3omZCS2Q",
        "Clear": "37i9dQZF1EIXQQqpuqvfjC",
        "Thunderstorm": "1fHksOPhdwzw10DVs3Bpvk",
        "Drizzle": "37i9dQZF1DX2mFmJUZg4Mp",
        "Rain": "37i9dQZF1DXbvABJXBIyiY",
        "Snow": "4sEKPcBYLcW3woDviiaigj",

        "Mist": '4cUyI9lhiql7o0O0imzROL',
        "Smoke": "4cUyI9lhiql7o0O0imzROL",
        "Haze": "4cUyI9lhiql7o0O0imzROL",
        "Dust": "4cUyI9lhiql7o0O0imzROL",
        "Fog": "4cUyI9lhiql7o0O0imzROL",
        "Sand": "4cUyI9lhiql7o0O0imzROL",
        "Ash": "4cUyI9lhiql7o0O0imzROL",
        "Squall": "4cUyI9lhiql7o0O0imzROL",
        "Tornado": "4cUyI9lhiql7o0O0imzROL"
    }

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${WEATHER_CONDITIONS[weather_condition]}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${USER_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((result) => {
                setPlaylists(result.tracks.items)
            })
    }, [city, weather_condition])

    return (
        <>
            {/* <a href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>login</a> */}
            <CardListing playlists={playlists} />
        </>
    )
}

export default Playlist