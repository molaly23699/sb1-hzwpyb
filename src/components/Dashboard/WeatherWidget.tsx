import React from 'react';
import { Cloud, Loader } from 'lucide-react';
import { useWeather } from '../../hooks/useWeather';

export default function WeatherWidget() {
  const { temperature, description, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg">
        <Loader className="h-5 w-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-sm">الطقس في القاهرة</h3>
        <p className="text-white font-bold text-xl">{temperature}°C</p>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
      <Cloud className="h-8 w-8 text-blue-400" />
    </div>
  );
}