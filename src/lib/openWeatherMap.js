import {WEATHER_API_KEY} from "../../.secrets/keys";

const API_STEM = 'https://api.openweathermap.org/data/2.5/weather?';

function postCodeUrl(location) {
    return `${API_STEM}q=${location},uk&units=metric&appid=${WEATHER_API_KEY}`;
}

function fetchForecast(location) {
    return fetch(postCodeUrl(location))
        .then(response => response.json())
        .then(responseJSON => {
            if (responseJSON.cod === 200) {
                return {
                    cod: responseJSON.cod,
                    main: responseJSON.weather[0].main,
                    description: responseJSON.weather[0].description,
                    temp: responseJSON.main.temp,
                    name: responseJSON.name
                };
            }
            else {
                return responseJSON
            }

        })
        .catch(error => {
            console.error(error)
        })
}

export default {fetchForecast: fetchForecast};