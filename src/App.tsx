import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

function App() {
  const { input, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();

  return (
    <>
      <main className="bg-sunset flex h-[100vh] w-full items-center justify-center bg-auto bg-center">
        {forecast ? (
          <Forecast data={forecast} />
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
