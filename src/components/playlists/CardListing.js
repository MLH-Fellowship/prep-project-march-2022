import React from 'react'
import CardComp from './CardComp'
import "../styles/CardListing.css";


const CardListing = ({ playlists }) => {
    return (
        <div className="CardListing">
            <h3>Let The Music Flow In You 🎼🎧</h3>
            <div className="CardListing_wrapper">
                {
                    playlists.map(playlist => (
                        <CardComp key={playlist.track.id} playlist={playlist} />
                    ))
                }
            </div>
        </div>
    )
}
export default CardListing
