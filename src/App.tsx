import { useEffect, useState } from 'react'
import './App.css'

interface WeatherData {
  city: string,
  temp: number,
  description: string,
  humidity: number,
  windSpeed: number,
  icon: string
}

function App() {
  const [data, setData] = useState<WeatherData | null>(null)

useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather') 
        const weatherData: WeatherData = await res.json()
        console.log(weatherData)
        setData(weatherData)
      } catch (error) {
        console.error('Failed to fetch weather:', error)
      }
    }

    fetchWeather();
  }, [])

  const iconUrl = data?.icon
    ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
    : null

  return (
    <div className="max-w-md mx-auto mt-6 shadow-md p-5 text-center">
      <h2 className="text-xl font-bold mb-4">
        Weather in {data?.city}
      </h2>

      {iconUrl && (
        <img src={iconUrl} alt={data?.description} />
      )}

      {data && (
        <div className="mt-2">
          <p className="text-lg font-semibold">
            {data.temp}°C
          </p>
          <p className="text-gray-600 capitalize">
            {data.description}
          </p>
          <p className="text-sm text-gray-500">
            Humidity: {data.humidity}%
          </p>
          <p className="text-sm text-gray-500">
            Wind: {data.windSpeed} m/s
          </p>
        </div>
      )}
    </div>
  )
}

export default App
