import {
    MapPin,
    Search,
    Thermometer,
    Cloud,
    Droplet,
    Wind,
} from "lucide-react";
import { useState, useEffect } from "react";
import { fetchWeatherData } from "../api/weather.api";
import { ThemeToggle } from "./ThemeToggle";
import WeatherCard from "./WeatherCard";
import WeatherSkeleton from "./WeatherSkeleton";

interface WeatherType {
    city: string;
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
}


function Weather() {
    const [weather, setWeather] = useState<WeatherType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherData();
                setWeather(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch weather data");
            } finally {
                setLoading(false);
            }
        };

        getWeatherData();
    }, []);

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />

                    {loading ? (
                        <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    ) : (
                        <span className="text-sm font-medium">{weather?.city}</span>
                    )}
                </div>
                {loading ? (
                    // Skeleton placeholder for input
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse pl-10" />
                ) : (
                    <ThemeToggle />
                )}

            </div>

            {/* Error */}
            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                {loading ? (
                    <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse pl-10" />
                ) : (
                    <input
                        type="text"
                        placeholder="Search location..."
                        className="w-full bg-input-background border border-border rounded-lg truncate pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-300"
                    />
                )}
            </div>

            {/* skeleton state */}
            {loading ? (
                <WeatherSkeleton />
            ) : (
                weather && (
                    <>
                        {/* Temperature */}
                        <div className="flex items-end gap-6 mt-1">
                            <div className="flex items-end gap-1">
                                <Thermometer className="w-5 h-5 text-muted-foreground mb-1" />

                                <span className="text-5xl font-bold text-foreground">
                                    {Math.round(weather.temp)}
                                </span>

                                <span className="text-xl text-muted-foreground mb-2">
                                    °C
                                </span>
                            </div>
                        </div>

                        {/* Weather Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <WeatherCard
                                title="Condition"
                                value={weather.description}
                                icon={Cloud}
                            />

                            <WeatherCard
                                title="Humidity"
                                value={`${weather.humidity}%`}
                                icon={Droplet}
                            />

                            <WeatherCard
                                title="Wind Speed"
                                value={`${weather.windSpeed} m/s`}
                                icon={Wind}
                            />

                            <WeatherCard
                                title="Icon"
                                value={weather.icon}
                            />
                        </div>
                    </>
                )
            )}
        </div>
    );
}

export default Weather;