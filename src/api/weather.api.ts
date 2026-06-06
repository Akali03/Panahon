interface WeatherData {
  city: string,
  temp: number,
  description: string,
  humidity: number,
  windSpeed: number,
  icon: string
}

//   const iconUrl = data?.icon
//     ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
//     : null

export const fetchWeatherDate = async () =>{
      try {
        const res = await fetch('/api/weather') 
        const weatherData: WeatherData = await res.json()
        console.log(weatherData)

      } catch (error) {
        console.error('Failed to fetch weather:', error)
      }

    }



