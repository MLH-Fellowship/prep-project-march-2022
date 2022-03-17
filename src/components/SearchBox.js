import { useState } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

const SearchBox = (props) => {

    const [address, setAddress] = useState("New York City");
    
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        setAddress(value);
        props.setCity(results[0].address_components[0].long_name);
    };    
    
    return(
        <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        >
          {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
          <input {...getInputProps({placeholder: ""})}/>
          
          <div>
            {loading ? <div> Loading </div> : null}
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active? "#41b6e6" : "#fff"
              };
              return <div>
                <div className="suggestionContainer" {...getSuggestionItemProps(suggestion, {style})}> 
              <span>{suggestion.description} </span>
              </div>
              </div>
            })}
          </div>

          </div>
          )}
        </PlacesAutocomplete>        
    );
}

export default SearchBox;