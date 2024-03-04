import { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "./types";

function App() {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);

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
      .then((data) => console.log({ data }));
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
        <div className="flex h-full w-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-100 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 lg:h-[500px] lg:p-24">
          <h1 className="text-4xl font-thin">
            Weather <span className="font-black">Forecast</span>
          </h1>

          <p className="mt-2 text-sm">
            Enter below a place you want to now the weather of and select an
            option from the dropdown
          </p>

          <div className="relative mt-10 flex md:mt-4">
            <input
              type="text"
              value={input}
              className="rounded-s-md border-2 border-zinc-100 px-2 py-1 text-zinc-700"
              onChange={onInputChange}
            />

            <ul className="absolute top-7 m-1 rounded-b-md bg-white text-zinc-700">
              {options.map((option: optionType, index: number) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="w-full cursor-pointer px-2 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="rounded-e-md border-2 border-zinc-100 px-2 py-1 hover:border-zinc-700 hover:text-zinc-700"
              onClick={onSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
