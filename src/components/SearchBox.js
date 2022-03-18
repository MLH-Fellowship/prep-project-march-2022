import Autocomplete from "react-google-autocomplete";

const SearchBox = (props) => {

    return(
        <>
            <Autocomplete 
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_PLACES_APIKEY}
            onPlaceSelected={(place) => props.setCity(place.formatted_address)}
            />
        </>
    );
}

export default SearchBox;