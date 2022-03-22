import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps"



const Map = withScriptjs(withGoogleMap((props) => {
  
  
  const handleClick = (e) => props.setLatLng([e.latLng.lat(), e.latLng.lng()])
  

  return (
    
      <GoogleMap
      onClick={handleClick}
      defaultZoom={6}
      defaultCenter={{ lat: props.latLng[0], lng: props.latLng[1]}}
      >
      <Marker  position={{ lat: props.latLng[0], lng: props.latLng[1]}} />
      
      </GoogleMap>

    
  )
}
  ))



export default Map