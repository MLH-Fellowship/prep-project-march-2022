import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./SongRecommendation.css";

const SongRecommendation = (props) => {
    // current track and a function that updates it
    const [tracksData, setTracksData] = useState(null);
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/";
    const ACCESS_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
    let accessToken = '';
    let playlistId = '';

    //using the options object to identify different weather conditions
    // setting the playlistId to playlists according to weather conditions
    playlistId = {
        Clear: "6rItp4lFXGnZaNHH0MJ5Lv",
        Clouds: "6UrqFNXNVgz9WQkXmBGmgc",
        Smoke: "7LqjQuTFvBj2TFq5kq9mCp",
        Rain: "58zK1oDxwkhRiDwKhYqHd2",
        Haze: "37i9dQZF1DWSEHf1f0boX3",
        Drizzle: "6nqK56jVkohLUhlAcxkrnV",
    }[props.options.weather[0].main] || '7LqjQuTFvBj2TFq5kq9mCp';
    //checking the weather array returned by openweather api for the main weather condition and setting a default playlist just incase

    const handleGetPlaylists = async () => {
// using access token to fetch the playlists with it in the header 

        await fetch(PLAYLISTS_ENDPOINT + playlistId + '/tracks?limit=12', // getting the music using the id according to the weather and getting some tracks from that playlist to display
            { method: 'GET', headers: { "Authorization": `Bearer ${accessToken}` }, } //acesstoken from _getToken
        )
            .then((result) => result.json())
            .then((response) => {

                let items = response.items; //response to the request
                setTracks(items); // the spotify api returns a playList which is an array
            }
            )
            .catch(console.error);
    };

    //using map method to create a new array with relevant information
    function setTracks(items) {
        const tracks = items.map(({ track }) => ({
            song: track.name,
            artist: track.artists[0].name,
            imageUrl: track.album.images[0].url,
            spotifyUrl: track.external_urls.spotify
        }))
        organizeInRows(tracks);// function to organise the tracks in rows

    }

    function organizeInRows(tracks) {
        const tracksRows = [];
        for (let i = 0; i < tracks.length; i += 6) {
            tracksRows.push(tracks.slice(i, i + 6)); // new array returned with slice with only 6 tracks from i to i+6 and pushed into tracksRows 
        }
        setTracksData(tracksRows);// tracksRow is set to setTracksData function
    }


     // your application requests for authorization token to be used to fetch the playlist
    useEffect(() => {
        const _getToken = async () => {
           // using fetch to make an http request to the spotify api for the access token 
            await fetch(ACCESS_TOKEN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET, 'utf8').toString('base64')
                },
                body: 'grant_type=client_credentials'
            })
            .then((result) => result.json())
            .then((data) => {
                accessToken = data.access_token;
                handleGetPlaylists();
            }
            ).catch((error) => { console.error(error); });

        }
        //calling the function
        _getToken()
    }, [props]); // our useEffect hook is dependent on the props

    return (
        <div className="Recommended Songs">
            <h2 className="Catchy Header">Mood Setters</h2>

            <div className="songs-container">
                {tracksData &&
                    tracksData.map((singleRow, i) => (
                        <Container className="songs-row" key={i}>
                            {singleRow.map((singleTrack, j) => (
                                <Container fluid="true" className="song-card" key={j}>
                                    <div className="card">
                                        <div className="overlayer">
                                        </div>
                                        <a target="_blank" href={singleTrack.spotifyUrl}>
                                            <img className="song-image" src={singleTrack.imageUrl} alt='Cover Page of Song' />
                                        </a>
                                        <div>
                                            <h6 className="song-title">{singleTrack.song}</h6>
                                            <h6 className="song-artist">{singleTrack.artist}</h6>
                                        </div>
                                    </div>
                                </Container>
                            ))}
                        </Container>
                    ))}
            </div>
        </div>
    );
};

export default SongRecommendation;
