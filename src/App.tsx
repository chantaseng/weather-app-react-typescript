import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

function App() {
  const { input, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();

  return (
    <>
      <main className="bg-sunset flex h-[100vh] w-full items-center justify-center bg-auto bg-center">
        {forecast ? (
          forecast.sunrise
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
