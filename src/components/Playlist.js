import React from 'react'
import { useEffect, useState } from "react";
import { USER_ACCESS_TOKEN, WEATHER_CONDITIONS } from '../constants';
import CardListing from './CardListing';

function Playlist({ city, weatherCondition }) {
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${WEATHER_CONDITIONS[weatherCondition]}`, {
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
    }, [city, weatherCondition])

    return (
        <>
            <CardListing playlists={playlists} />
        </>
    )
}

export default Playlist