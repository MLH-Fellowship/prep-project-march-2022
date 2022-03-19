import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps"



const Map = withScriptjs(withGoogleMap((props) => {
  const [latLng, setLatLng] = React.useState([props.lat, props.lon])
  const [place, setPlace] = React.useState(props.city)
  const handleClick = (e) => setLatLng([e.latLng.lat(), e.latLng.lng()])
    
React.useEffect(() =>{
  fetch(`http://api.positionstack.com/v1/reverse?access_key=4ffa39995acf5061ae3a8003c25fecc9&query=${latLng[0]},${latLng[1]}`)
    .then(res => res.json())
    .then(data => 
      setPlace(data.data[0].administrative_area))
}, [latLng])

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