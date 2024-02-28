function App() {
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
        </div>
      </main>
    </>
  );
}

export default App;
