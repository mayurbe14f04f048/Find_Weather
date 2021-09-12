import React, { useState } from 'react'
import './Search.css'
import axios from 'axios'


function Search() {
    const [search, setSearch] = useState()
    const [weather, setWeather] = useState({
        city: "",
        country: "",
        humidity: "",
        temperature: "",
        minTemp: "",
        weatherIcons: "",
        describe : ""

    })

    const api_key = "e6edc9f89b81a0410794a3173e3882c8"

    const getWeather = async (city) => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)

            await setWeather({
                city: res.data.name,
                country: res.data.sys.country,
                humidity: res.data.main.humidity,
                temperature: Math.round(res.data.main.temp - 273),
                minTemp: Math.round(res.data.main.temp_min-273),
                weatherIcons: res.data.weather[0].icon,
                describe : res.data.weather[0].description,

            })
        }
        catch { }

    }
    const handleSubmit = (event) => {
        console.log(search)
        getWeather(search)
        event.preventDefault()
    };




    return (

        <div>
            <input type="text" placeholder="Enter City Name" className="input" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="button" onClick={handleSubmit}>Search</button>

            <section>
                <div className="header-div">
                    <div>
                        <div className="data">
                            <img src={`https://openweathermap.org/img/wn/${weather.weatherIcons}@2x.png`} height="100px" width="100px" alt=""/>
                            <h1 className="title">
                                {weather.city}
                            </h1>
                            <h2 className="location">
                                {weather.country}
                            </h2>

                            <div className="weather-description">
                                <div className="first-child">
                                    <h3>HUMIDITY</h3>
                                    <p>
                                        {weather.humidity}%
                                    </p>
                                </div>

                                <div>
                                    <h3>TEMPERATURE</h3>
                                    <p>
                                        {(weather.temperature)}°C
                                    </p>
                                </div>
                                <div>
                                    <h3>DESCRIPTION</h3>
                                    <p>
                                        {weather.describe} 
                                    </p>
                                </div>

                                <div className="last-child">
                                    <h3>MIN TEMPERATURE</h3>
                                    <p>
                                        {weather.minTemp}°C
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )

}



export default Search
