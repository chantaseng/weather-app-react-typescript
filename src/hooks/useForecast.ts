import { ChangeEvent, useEffect, useState } from "react";
import { optionType, forecastType } from "../types";

const useForecast = () => {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const key = import.meta.env.VITE_REACT_APP_API_KEY;

  const getSearchOptions = (location: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${key}`,
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setInput(location);

    getSearchOptions(location);
  };

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${key}
      `,
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const resetForecast = () => {
    setForecast(null);
    setInput("");
    setOptions([]);
    setCity(null);
  };

  useEffect(() => {
    if (city) {
      setInput(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    input,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    resetForecast,
  };

  // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key} --- SPECIFIC LOCATION

  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} --- TYPING FOR OPTIONS OF LOCATION
};

export default useForecast;
