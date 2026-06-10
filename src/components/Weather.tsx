import {
    MapPin,
    Search,
    Thermometer,
    Droplet,
    Wind,
    Eye,
    Gauge
} from "lucide-react";
import { useState, useEffect } from "react";
import { fetchWeatherData } from "../api/weather.api";
import { ThemeToggle } from "./ThemeToggle";
import WeatherCard from "./WeatherCard";
import WeatherSkeleton from "./WeatherSkeleton";

interface WeatherType {
    city: string;
    country: string;
    temp: number;
    feels_like: number;
    description: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    icon?: string;
}


function Weather() {
    const [weather, setWeather] = useState<WeatherType | null>(null);
    const [searchCity, setSearchCity] = useState("");
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
    const handleSearch = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchCity.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const data = await fetchWeatherData(searchCity);
            setWeather(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch weather data");
            setWeather(null);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const data = await fetchWeatherData(undefined, latitude, longitude);
                setWeather(data);
            },
            () => {
                // user denied or not yet granted -> do nothing
                setError("Location access denied. Please allow location permissions in your browser to see your current location.")
            }
        );
    }, []);
    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const data = await fetchWeatherData(undefined, latitude, longitude);
                    setWeather(data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to fetch weather data");
                    setWeather(null);
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                console.error(err);
                setError("Location permission denied or unavailable");
                setLoading(false);
            }
        );
    };
    return (
        <div className="max-w-xl mx-auto mt-10 p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />

                    {loading ? (
                        <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    ) : (
                        <span className="text-sm font-medium">{weather?.city}, {weather?.country}</span>
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
                {loading ? (
                    <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse pl-10" />
                ) : (
                    <form onSubmit={handleSearch}>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            placeholder="Search location..."
                            className="w-full bg-input-background border border-border rounded-lg truncate pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={handleCurrentLocation}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition"
                            title="Use current location"
                        >
                            <MapPin className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>

            {/* skeleton state */}
            {loading ? (
                <WeatherSkeleton />
            ) : (
                weather && (
                    <>
                        {/* Temperature */}
                        <div className="flex items-end gap-6 mt-3">
                            {weather?.icon && (
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                    alt={weather.description}
                                    className="w-20 h-20"
                                />
                            )}
                            <div className="flex flex-col">
                                {/* temperature row */}
                                <div className="flex items-end">
                                    <Thermometer className="w-5 h-5 text-muted-foreground mb-1" />
                                    <span className="text-5xl font-bold text-foreground">
                                        {Math.round(weather.temp)}
                                    </span>

                                    <span className="text-xl  ml-1 mb-2">
                                        °C
                                    </span>
                                </div>
                                <span className="text-xs dark:text-gray-500 opacity-55 capitalize text-center">
                                    {weather.description}
                                </span>

                            </div>
                            <span className="text-xs dark:text-gray-500 opacity-55 capitalize text-center">
                                Feels like: {weather.feels_like}°C
                            </span>
                        </div>

                        {/* Weather Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
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
                                title="Visibility"
                                value={`${weather.visibility} m/s`}
                                icon={Eye}
                            />

                            <WeatherCard
                                title="Pressure"
                                value={`${weather.pressure} m/s`}
                                icon={Gauge}
                            />
                        </div>
                    </>
                )
            )}
        </div>
    );
}

export default Weather;