import React from 'react'


function Mymap({center, zoom, onClick, children}) {
    const style = { height : "400px" };
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
   
    //const MapContext = React.createContext(latLng)    

    
    
    React.useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {
          center,
          zoom,
          onClick
        }));
      }
    }, [ref, map]);
      

    return React.createElement(
      React.Fragment,
      null,
      React.createElement("div", { ref: ref, style: style }),
      React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })
    );
    

}


export default Mymap 
