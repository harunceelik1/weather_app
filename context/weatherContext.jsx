"use client";
import { createContext, useContext, useState } from "react";

export const WeatherContext = createContext();

export function WeatherContextProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
}
