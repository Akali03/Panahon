import { Cloud, Droplets, MapPin, Search, Thermometer, Wind } from 'lucide-react'
import { useState, useEffect } from "react";
import { fetchWeatherData } from "../api/weather.api";
import { ThemeToggle } from "./ThemeToggle";
import WeatherCard from './WeatherCard';
import WeatherSkeleton from './WeatherSkeleton';

interface WeatherType {
    city: string;
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
}

function Weather() {
    const [weather, setWeather] = useState<WeatherType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherData()
                setWeather(data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch weather data')
                console.error(err)
                setError('Failed to fetch weather data')
            } finally {
                setLoading(false)
            }
        }
        getWeatherData()
    }, [])


    return (
        <div className="max-w-xl mx-auto mt-10 p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{weather?.city}</span>
                </div>
                <ThemeToggle />
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors duration-300" />
                <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full bg-input-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-300"
                />
            </div>

            {/* Weather Info */}
            {weather && (
                <>
                    <div className="flex items-end gap-6 mt-1">
                        <div className="flex items-end gap-1">
                            <Thermometer className="w-5 h-5 text-muted-foreground mb-1" />
                            <span className="text-5xl font-bold text-foreground">{Math.round(weather.temp)}</span>
                            <span className="text-xl text-muted-foreground mb-2">°C</span>
                        </div>
                    </div>
                    {loading ? (
                        <WeatherSkeleton />
                    ) : (
                        <div className="flex gap-4 overflow-x-auto">
                            <WeatherCard
                                title="Condition"
                                value={weather?.description ?? ""}
                            />

                            <WeatherCard
                                title="Humidity"
                                value={`${weather?.humidity}%`}
                            />

                            <WeatherCard
                                title="Wind Speed"
                                value={`${weather?.windSpeed} m/s`}
                            />

                            <WeatherCard
                                title="Icon"
                                value={weather?.icon ?? ""}
                            />
                        </div>
                    )
                    }


                </>
            )}

        </div>
    )

}

export default Weather;