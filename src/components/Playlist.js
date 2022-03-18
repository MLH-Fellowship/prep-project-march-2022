import React from 'react'
import { useEffect, useState } from "react";
import { WEATHER_CONDITIONS } from '../constants';
import CardListing from './CardListing';

function Playlist({ city, weatherCondition, token }) {
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${WEATHER_CONDITIONS[weatherCondition]}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
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