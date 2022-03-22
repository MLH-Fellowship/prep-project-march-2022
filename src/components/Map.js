import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps"


const Map = withScriptjs(withGoogleMap((props) => {
  
  const MapContext = React.createContext({lat: props.latLng[0], lng: props.latLng[1]})
  

  return (

    
    <MapContext.Consumer>
      {value => (
      <GoogleMap
      onClick={props.handleClick}
      defaultZoom={7}
      defaultCenter={{ ...value }}
      >
      <Marker  position={{...value}} />
      
      </GoogleMap>

)}

    </MapContext.Consumer>
       
  )
}
  ))



export default Map