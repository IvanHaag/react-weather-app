import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather"
  const apiKey = import.meta.env.VITE_API_KEY
  const diffKelvin = 273.15

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null)

  const fetchWeatherData = async() => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${apiKey}&lang=es`)
      const data = await response.json();
      setWeatherData(data);
    } catch(error) {
      console.error('There was an error', error)
    }
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData()
  }

  return (
    <div className='container'>
      <h1>Aplicación de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Ingresar ciudad' value={city} onChange={handleCityChange}/>
        <button>Buscar</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>La temperatura actual es {Math.floor(weatherData.main.temp - diffKelvin)}°C</p>
          <p>La codición meteorológica actual es: {weatherData.weather[0].description}</p>
          <div className='img-container'>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
          </div>
        </div>
      )}
    </div>
  )
}