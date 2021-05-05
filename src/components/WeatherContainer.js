import React from 'react'
import { connect } from 'react-redux'
import WeatherOutput from './WeatherOutput'

const WeatherContainer = ({ fetching, weatherData }) => {

    if (weatherData !== null) {
        return <WeatherOutput />
    } else {
        return null
    }
}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
        weatherData: state.weather
    }
}

export default connect(mapStateToProps)(WeatherContainer)