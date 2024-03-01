import { ChangeEvent, useState } from "react";

function App() {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);

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

  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

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
              {options.map((option: { name: string }, index: number) => (
                <li key={option.name + "-" + index}>
                  <button className="w-full cursor-pointer px-2 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white">
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>

            <button className="rounded-e-md border-2 border-zinc-100 px-2 py-1 hover:border-zinc-700 hover:text-zinc-700">
              Search
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
