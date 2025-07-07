import { useState, useEffect } from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';

const APIKEY = 'c9a0ca46550648b29ce125849232709';

function App() {
  const [city, setCity] = useState('Hanoi');
  const [current, setCurrent] = useState<any>(null);
  const [hourly, setHourly] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no&lang=vi`)
      .then(res => res.json())
      .then(data => setCurrent(data.current));
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=1&aqi=no&alerts=no&lang=vi`)
      .then(res => res.json())
      .then(data => setHourly(data.forecast.forecastday[0].hour));
  }, [city]);

  const hourlyData = hourly.slice(0, 5).map((h, idx) => ({
    time: idx === 0 ? 'Now' : h.time.split(' ')[1].slice(0, 5),
    temp: h.temp_c,
    icon: h.condition.icon,
    now: idx === 0
  }));

  return (
    <div className="container">
      <SearchBar value={city} onChange={setCity} />
      {current && (
        <CurrentWeather
          temp={current.temp_c}
          condition={current.condition.text}
          icon={current.condition.icon}
          humidity={current.humidity}
          wind={current.wind_kph}
        />
      )}
      <HourlyForecast hours={hourlyData} />
    </div>
  );
}

export default App;