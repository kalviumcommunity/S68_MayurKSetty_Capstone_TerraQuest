require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.OPENWEATHER_API_KEY;

const getWeather = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    // console.log(response);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Weather data fetch failed' });
  }
};

module.exports = { getWeather };
