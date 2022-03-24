import React from 'react'
import mapboxgl from "mapbox-gl";



function MyMap({latLng, setLatLng, setCity, results, setResults, setClickedLast}) {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);
  const marker=React.useRef(null);
  
  mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOXGL}`
    
    React.useEffect(() => {
       
      map.current = new mapboxgl.Map({
          container: mapContainer.current, // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [latLng[1], latLng[0]], // starting position [lng, lat] <--
          zoom: 9 // starting zoom
          })
          .on('click', (e) => {
            setLatLng([{...e.lngLat}.lat, {...e.lngLat}.lng])
            setClickedLast(true)
          })
        
          marker.current = new mapboxgl.Marker()
            .setLngLat([latLng[1], latLng[0]])//this is a mapbox method- it doesn't change a declared state variable
            .addTo(map.current)

        }, [latLng]);

    return (
        <div>
          <div className='map-container' ref={mapContainer} />
        </div>  
      )
}


export default MyMap 
