import { forecastType } from "../types";
import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { PiDrop, PiEyeBold, PiWindBold } from "react-icons/pi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import Tile from "./Tile";

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

  const getWindDirection = (deg: number): string => {
    if (deg > 15 && deg <= 75) return "NE";

    if (deg > 76 && deg <= 105) return "E";
    if (deg > 105 && deg <= 165) return "SE";

    if (deg > 166 && deg <= 195) return "S";
    if (deg > 195 && deg <= 255) return "SW";

    if (deg > 255 && deg <= 285) return "W";
    if (deg > 285 && deg <= 345) return "NW";

    return "N";
  };

  const getHumidityValue = (level: number): string => {
    if (level <= 55) return "Dry and comfortable";
    if (level > 55 && level <= 65) return "A bit uncomfortable, sticky feeling";

    return "Lots of moisture, uncomfortable air";
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

        <section className="flex flex-wrap justify-between text-zinc-700">
          <div className="mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-sm font-bold drop-shadow-lg backdrop-blur-lg">
            <BsSunriseFill className="text-xl" />
            <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div className="mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-sm font-bold drop-shadow-lg backdrop-blur-lg">
            <BsSunsetFill className="text-xl" />
            <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>

          {/* wind <PiWindBold /> */}
          <Tile
            icon={<PiWindBold />}
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(today.wind.deg)}, gust ${today.wind.gust.toFixed(1)} km/h`}
          />
          {/* feels like <LiaTemperatureHighSolid /> */}
          <Tile
            icon={<LiaTemperatureHighSolid />}
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp) ? "colder" : "warmer"}`}
          />

          {/* humidity <WiHumidity /> */}

          <Tile
            icon={<WiHumidity />}
            title="Humidity"
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />
          {/* precipitation <PiDrop /> */}
          {/* pressure <WiBarometer /> */}
          {/* visibility <PiEyeBold /> */}
        </section>
      </div>
    </div>
  );
}

export default Forecast;

// initial div i remove lg:h-auto
