import Autocomplete from "react-google-autocomplete";

const SearchBox = (props) => {

    return(
        <>
            <Autocomplete 
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_PLACES_APIKEY}
            defaultValue={'New York City'}
            onPlaceSelected={(place) => {
                console.log(place.address_components[0].long_name);
                props.setCity(place.address_components[0].long_name);
            }}
            />
        </>
    );
}

export default SearchBox;