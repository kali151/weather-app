import { connect } from 'react-redux'
import { setCurrentLocation, getWeatherData, setFetchingTrue, clearLocation } from '../redux/actions.js'

const CurrentLocation = ({ setLocation, getWeatherData, setFetching }) => {

    const clickHandler = () => {
        setFetching()
        getCurrentLocation();
    }


    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;

                console.log(`${latitude} ${longitude}`)
                setCurrentLocation({ pos: { latitude, longitude } });
                getWeatherData(latitude, longitude, 'coordinates')
            })
        }
    }

    return (
        <div>
            <button className="location-button" onClick={clickHandler}>Get Current Location</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setFetching: () => dispatch(setFetchingTrue()),
        setCurrentLocation: location => dispatch(setCurrentLocation(location)),
        getWeatherData: (latitude, longitude, type) => dispatch(getWeatherData(latitude, longitude, type)),
        clearLocation: () => dispatch(clearLocation())
    }
}

export default connect(null, mapDispatchToProps)(CurrentLocation)