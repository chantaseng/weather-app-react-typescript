import Search1 from "./components/Search1";
import Forecast1 from "./components/Forecast1";
import useForecast from "./hooks/useForecast";
import ForecastMobile from "./components/ForecastMobile";
import ForecastMD from "./components/ForecastMD";

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
          <>
            <div className="md:hidden">
              <ForecastMobile data={forecast} onReset={resetForecast} />
            </div>
            <div className="hidden md:block xl:hidden">
              <ForecastMD data={forecast} onReset={resetForecast} />
            </div>
            <div className="hidden xl:block">
              <Forecast1 data={forecast} onReset={resetForecast} />
            </div>
          </>
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
