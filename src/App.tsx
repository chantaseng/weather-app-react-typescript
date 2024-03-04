import { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "./types";
import Search from "./components/Search";

function App() {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState<null>(null);

  const key = import.meta.env.VITE_REACT_APP_API_KEY;

  const getSearchOptions = (location: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${key}`,
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${key}
      `,
    )
      .then((res) => res.json())
      .then((data) => setForecast(data));
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setInput(city.name);
      setOptions([]);
    }
  }, [city]);

  // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key} --- SPECIFIC LOCATION

  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} --- TYPING FOR OPTIONS OF LOCATION

  return (
    <>
      <main className="bg-sunset flex h-[100vh] w-full items-center justify-center bg-auto bg-center">
        {forecast ? (
          "we have a forecast"
        ) : (
          <Search
            input={input}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </>
  );
}

export default App;
