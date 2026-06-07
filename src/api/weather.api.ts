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

export const fetchWeatherData = async (): Promise<WeatherData> =>{
  
        const res = await fetch('/api/weather')
        if(!res.ok){
          throw new Error('Failed to fetch weather data')
        }
        return await res.json()

    };



