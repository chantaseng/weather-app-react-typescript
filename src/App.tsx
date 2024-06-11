import Search from "./components/Search";
import Search1 from "./components/Search1";
import Forecast from "./components/Forecast";
import Forecast1 from "./components/Forecast1";
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
      <main className="h-[100vh] w-full bg-sunset bg-cover bg-top">
        {forecast ? (
          <Forecast1 data={forecast} onReset={resetForecast} />
        ) : (
          <Search1
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

{
  /* <main className="flex h-[100vh] w-full items-center justify-center bg-sunset bg-auto bg-center">
        {forecast ? (
          <Forecast data={forecast} onReset={resetForecast} />
        ) : (
          <Search1
            input={input}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </main> */
}
