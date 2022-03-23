import {useEffect,useState, useRef} from 'react'

function Mymap({center, zoom}) {
    const style = { height : "800px" };
    const ref = useRef(null);
    const [map, setMap] = useState();
    
    useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {
            center,
            zoom
        }));
      }
    }, [ref, map]);

    return <div ref={ref} style={style}/>
}

export default Mymap