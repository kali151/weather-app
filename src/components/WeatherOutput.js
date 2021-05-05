import React from 'react'
import { connect } from 'react-redux'

const WeatherOutput = ({ weatherData }) => {

    console.log("weatherData", weatherData);
    const {
        temp,
        feels_like,
        pressure,
        humidity
    } = weatherData.main
    const { speed, deg } = weatherData.wind;

    const parseWindDegree = (d) => {
        const directions = ['Northerly', 'North Easterly', 'Easterly', 'South Easterly', 'Southerly', 'South Westerly', 'Westerly', 'North Westerly'];
        d = d < 0 ?
            d = 360 - Math.abs(d) % 360
            : d % 360;
        return `${directions[d / 45 | 0]}`;
    }

    let iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    return (
        <div className="location-box">
            <div className="location">
                <img src={iconUrl} alt="weather icon"></img>
                <p>{weatherData.name}, &nbsp;{weatherData.sys.country}
                </p>
                <br></br><br></br>
                <p>Conditions: {weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
                <p>Temperature: {`${Math.round(temp)} °C `} </p>
                <p>Feels like: {`${Math.round(feels_like)} °C `}</p>
                <p>Pressure: {pressure} hpa</p>
                <p>Humidity: {humidity} %</p>
                <p>Wind Speed: {speed} m/s {parseWindDegree(deg)}</p>
                <p></p>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        weatherData: state.weather
    }
}

export default connect(mapStateToProps)(WeatherOutput)