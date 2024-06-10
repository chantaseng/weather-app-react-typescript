import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

function App() {
  const {
    input,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    resetForecast,
  } = useForecast();

  return (
    <>
      <main className="flex h-[100vh] w-full items-center justify-center bg-sunset bg-auto bg-center">
        {forecast ? (
          <Forecast data={forecast} onReset={resetForecast} />
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
