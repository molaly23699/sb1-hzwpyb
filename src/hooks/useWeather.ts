import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  temperature: number;
  description: string;
  loading: boolean;
  error: string | null;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    description: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Cairo,EG&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );
        
        setWeather({
          temperature: Math.round(response.data.main.temp),
          description: response.data.weather[0].description,
          loading: false,
          error: null
        });
      } catch (error) {
        setWeather(prev => ({
          ...prev,
          loading: false,
          error: 'خطأ في تحميل بيانات الطقس'
        }));
      }
    };

    fetchWeather();
  }, []);

  return weather;
}