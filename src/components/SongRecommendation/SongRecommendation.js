import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./SongRecommendation.css";

const SongRecommendation = (props) => {

    const [tracksData, setTracksData] = useState(null);
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/";
    const ACCESS_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
    let accessToken = '';
    let playlistId = '';

    playlistId = {
        Clear: "6rItp4lFXGnZaNHH0MJ5Lv",
        Clouds: "6UrqFNXNVgz9WQkXmBGmgc",
        Smoke: "7LqjQuTFvBj2TFq5kq9mCp",
        Rain: "58zK1oDxwkhRiDwKhYqHd2",
        Haze: "37i9dQZF1DWSEHf1f0boX3",
        Drizzle: "6nqK56jVkohLUhlAcxkrnV",
    }[props.options.weather[0].main] || '7LqjQuTFvBj2TFq5kq9mCp';

    const handleGetPlaylists = async () => {

        fetch(PLAYLISTS_ENDPOINT + playlistId + '/tracks?limit=12',
            { method: 'GET', headers: { "Authorization": `Bearer ${accessToken}` }, }
        )
            .then((result) => result.json()).then((response) => {

                var items = response.items;
                setTracks(items);
            }
            )
            .catch(console.error);
    };

    function setTracks(items) {
        const tracks = items.map(({ track }) => ({
            song: track.name,
            artist: track.artists[0].name,
            imageUrl: track.album.images[0].url,
            spotifyUrl: track.external_urls.spotify
        }))
        organizeInRows(tracks);

    }

    function organizeInRows(tracks) {
        const tracksRows = [];
        for (let i = 0; i < tracks.length; i += 6) {
            tracksRows.push(tracks.slice(i, i + 6));
        }
        setTracksData(tracksRows);
    }



    useEffect(() => {
        const _getToken = async () => {

            await fetch(ACCESS_TOKEN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET, 'utf8').toString('base64')
                },
                body: 'grant_type=client_credentials'
            }).then((result) => result.json()).then((data) => {
                accessToken = data.access_token;
                handleGetPlaylists();
            }
            ).catch((error) => { console.error(error); });

        }
        _getToken()
    }, [props]);

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
