import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch(){
    const[city, setCity]=useState(null);
    const[loaded, setLoaded]=useState(false)
    const[weather,setWeather]=useState(null)
    function displayWeather(response){
        setLoaded(true);
        console.log(response.data)
        setWeather(
            {
            temperature:response.data.main.temp,
            wind:response.data.wind.speed,
            humidity:response.data.main.humidity,
            feelslike:response.data.main.feels_like,
            description:response.data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,

            }
        );
        console.log(weather.icon);
        
    }

    function handleSubmit(event){
        event.preventDefault()
        let apiKey="095a687812370a6969462f7d5666c2f5";
        let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        axios.get(apiUrl).then(displayWeather)
    }
function updateCity(event){
    setCity(event.target.value)
}
const form=            <form onSubmit={handleSubmit}>
<input type="search" placeholder="Enter a city" onChange={updateCity} />
<button type="submit">Search</button>
</form>
if(loaded){
    return(
        <div className="WeatherSearch">
            {form}
            <ul>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
          <li>Description:{weather.description}</li>
          <li>Temperature:{Math.round(weather.temperature)}°C</li>
          <li>Humidity:{weather.humidity}%</li>
          <li>Wind:{Math.round(weather.wind)}</li>
        </ul>
        </div>
    )
}else{
    return form;
}
}