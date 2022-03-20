import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps"



const Map = withScriptjs(withGoogleMap((props) => {
  const [latLng, setLatLng] = React.useState([props.lat, props.lon])
  const [place, setPlace] = React.useState(props.city)
  const handleClick = (e) => setLatLng([e.latLng.lat(), e.latLng.lng()])

  
    
React.useEffect(() =>{
  fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latLng[0]}&lon=${latLng[1]}&limit=1&appid=${process.env.REACT_APP_APIKEY}`)
    .then(res => res.json())
    .then(data => 
      setPlace(data[0].name))
}, [latLng])
console.log(place)
props.getCity(place)



  return (
    <GoogleMap
      onClick={handleClick}
      defaultZoom={8}
      defaultCenter={{ lat: latLng[0], lng: latLng[1]}}
      >
      <Marker  position={{ lat: latLng[0], lng: latLng[1]}} />
    
    </GoogleMap>
  )
}
  ))



export default Map