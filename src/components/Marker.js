import {useEffect, useState} from 'react'

export default function Marker(options) {
    const [marker, setMarker] = useState();
  
    useEffect(() => {
      if (!marker) {
        setMarker(new window.google.maps.Marker())
      }
      return () => {
        if (marker) {
          marker.setMap(null)
        }
      }
    }, [marker])
    useEffect(() => {
      if (marker) {
        marker.setOptions(options)
      }
    }, [marker, options])
    return null;
} 
