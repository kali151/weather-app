export const apiKey = process.env.REACT_APP_API_KEY;

// param1 and param2 depend on whether the call was made with coordinates (in which case it will be latitude and longitude)
// or with city and country (in which case it will be city and country), it will be indicated by type ('coordinates' or 'location')

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

export const getWeatherData = (param1, param2, type) => {
    let apiUrl = type === 'coordinates'
        ?
        `${baseUrl}lat=${param1}&lon=${param2}&units=metric&appid=${apiKey}`
        :
        `${baseUrl}q=${param1},${param2}&appid=${apiKey}&units=metric`
    return dispatch => {
        fetch(apiUrl)
            .then(resp => resp.json())
            .then(data => dispatch(setWeatherData(data)))
            .then(dispatch(setFetchingFalse()))
    }
}

export const setCurrentLocation = location => {
    return { type: `SET_LOCATION`, payload: location }
}

export const selectLocation = location => {
    return { type: 'SELECT_LOCATION', payload: location }
}

export const clearLocation = () => {
    return { type: 'CLEAR_LOCATION' }
}

export const setWeatherData = data => {
    console.log(data)
    return { type: 'SET_WEATHER_DATA', payload: data }
}

export const clearWeatherData = () => {
    return { type: 'CLEAR_WEATHER_DATA' }
}

export const setFetchingTrue = () => {
    return { type: 'FETCHING', payload: true }
}

export const setFetchingFalse = () => {
    return { type: 'DONE_FETCHING', payload: false }
}