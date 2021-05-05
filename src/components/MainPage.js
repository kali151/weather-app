import { useState } from 'react';
//import CityCountryForm from './CityCountryForm'
import CurrentLocation from './CurrentLocation.js'
import { connect } from 'react-redux'
import WeatherContainer from './WeatherContainer'

const MainPage = ({ currentLocation, weatherData }) => {
    const api = {
        key: process.env.REACT_APP_API_KEY,
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = e => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(result => result.json())
                .then(res => {
                    console.log(res);
                    setWeather(res);
                    setQuery('');
                });
        }
    }

    const dateBuilder = (currentDate) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[currentDate.getDay()];
        let date = currentDate.getDate();
        let month = months[currentDate.getMonth()];
        let year = currentDate.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm'
            : 'app')
            : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="search"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search} />
                </div>
                <div>
                    <CurrentLocation />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="temperature">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">
                                {weather.weather[0].description}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="unknown-location">
                    </div>
                )}
                <div>
                    <WeatherContainer />
                </div>
            </main>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentLocation: state.location,
        weatherData: state.weather
    }
}

export default connect(mapStateToProps)(MainPage)