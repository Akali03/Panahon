
export default async function handler(req, res) {
  try {
    const { city, lat, lon } = req.query;
    const PANAHON_KEY = process.env.PANAHON_KEY;

    let url: string = "";

    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${PANAHON_KEY}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${PANAHON_KEY}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${PANAHON_KEY}&units=metric`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.message || "Weather API error",
      });
    }

    const {
      name,
      sys: { country },
      main: { temp, feels_like, humidity, pressure },
      wind: { speed: windSpeed },
      weather,
      visibility,
    } = data;

    const { description, icon } = weather[0];

    return res.status(200).json({
      success: true,
      city: name,
      country,
      temp,
      feels_like,
      description,
      humidity,
      windSpeed,
      pressure,
      visibility,
      icon,
    });

  } catch (error) {
    console.error("Weather API Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }

}