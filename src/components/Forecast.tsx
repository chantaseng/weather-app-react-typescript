import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { forecastType } from "../types";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
);

function Forecast({ data }: Props) {
  const today = data.list[0];

  const getSunTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (hours.length <= 1) hours = `0${hours}`;
    if (minutes.length <= 1) minutes = `0${minutes}`;

    return `${hours}:${minutes}`;
  };

  return (
    // <div className="flex h-full w-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-100 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 lg:h-[500px] lg:p-24">
    // </div>
    <div className="h-full w-full rounded bg-white bg-opacity-20 py-4 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 md:py-4 lg:px-24">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin">, {data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{" "}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="mb-5 mt-4 flex overflow-x-scroll pb-2">
          {data.list.map((item, i) => (
            <div
              className="inline-block w-[50px] flex-shrink-0 text-center"
              key={i}
            >
              <p className="text-sm">
                {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={`weather-icon-${item.weather[0].description}`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="flex justify-between text-zinc-700">
          <div className="bacdrop-blur-lg mb-5 flex w-[120px] flex-col items-center rounded bg-white/20 py-4 text-sm font-bold drop-shadow-lg">
            <BsSunriseFill className="text-xl" />
            <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div className="bacdrop-blur-lg mb-5 flex w-[120px] flex-col items-center rounded bg-white/20 py-4 text-sm font-bold drop-shadow-lg">
            <BsSunsetFill className="text-xl" />
            <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Forecast;

// initial div i remove lg:h-auto
