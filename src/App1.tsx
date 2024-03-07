import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";
import { Route, Routes } from "react-router-dom";

function App1() {
  const { input, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();

  return (
    <>
      <main className="bg-sunset flex h-[100vh] w-full items-center justify-center bg-auto bg-center">
        <Routes>
          {forecast ? (
            // <Forecast data={forecast} />
            <Route path="/forecast" element={<Forecast data={forecast} />} />
          ) : (
            <Route
              path="/"
              element={
                <Search
                  input={input}
                  options={options}
                  onInputChange={onInputChange}
                  onOptionSelect={onOptionSelect}
                  onSubmit={onSubmit}
                />
              }
            />
            // <Search
            //   input={input}
            //   options={options}
            //   onInputChange={onInputChange}
            //   onOptionSelect={onOptionSelect}
            //   onSubmit={onSubmit}
            // />
          )}
        </Routes>
      </main>
    </>
  );
}

export default App1;
