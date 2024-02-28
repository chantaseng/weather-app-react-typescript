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

          <div className="mt-10 flex md:mt-4">
            <input
              type="text"
              value={""}
              className="rounded-s-md border-2 border-zinc-100 px-2 py-1 text-zinc-700"
            />

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
