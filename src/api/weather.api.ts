interface WeatherData {
  city: string,
  country: string,
  temp: number,
  feels_like: number,
  description: string,
  humidity: number,
  windSpeed: number,
  pressure: number,
  visibility: number,
  icon?: string
}

//   const iconUrl = data?.icon
//     ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
//     : null

export const fetchWeatherData = async (
   city?: string,
  lat?: number,
  lon?: number): Promise<WeatherData> =>{
     let url = "/api/weather";

      if (lat !== undefined && lon !== undefined) {
        url += `?lat=${lat}&lon=${lon}`;
      } else if (city) {
        url += `?city=${encodeURIComponent(city)}`;
      }
        const res = await fetch(url)
        if(!res.ok){
          throw new Error('Failed to fetch weather data')
        }
        return await res.json()

    };



