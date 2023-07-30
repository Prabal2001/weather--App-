const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

// Set the view engine to use EJS (Embedded JavaScript)
app.set('view engine', 'ejs');

// Static folder for CSS
app.use(express.static('public'));

// API key for OpenWeatherMap
const apiKey = 'bae7a0dae82dbab91fe95ad4bc05ec86';

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.get('/weather', (req, res) => {
  const city = req.query.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, (err, response, body) => {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      const weatherData = JSON.parse(body);
      if (weatherData.main) {
        const weatherText = `It's currently ${weatherData.main.temp}°C in ${weatherData.name}.`;
        res.render('index', { weather: weatherText, error: null });
      } else {
        res.render('index', { weather: null, error: 'City not found' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
