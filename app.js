import 'dotenv/config';

import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/weather', async (req, res) => {
  console.log(process.env.WEATHER_API_KEY)
  const geo = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${req.body.zipCode},${req.body.countryCode}&appid=${process.env.WEATHER_API_KEY}`)
  .then((response) => response.json())
  
  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${process.env.WEATHER_API_KEY}`)
  .then((response) => response.json())

  res.json(weather)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})