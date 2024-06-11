import { forecastType } from "../types";
import Tile from "./Tile";
import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { PiDrop, PiEyeBold, PiWindBold } from "react-icons/pi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import { FaArrowLeftLong } from "react-icons/fa6";

type Props = {
  data: forecastType;
  onReset: () => void;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
);

const ForecastXL = ({ data, onReset }: Props) => {
  const today = data.list[0];

  const getSunTime = (timestamp: number, timezoneOffset: number): string => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    // console.log(timestamp);
    // console.log(timezoneOffset);
    let hours = date.getUTCHours().toString();
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

  const getPrecipitation = (value: number): string => {
    if (value <= 0.33) return "Low probability";
    if (value > 0.33 && value <= 0.66) return "Moderate probability";

    return "High probability";
  };

  const getVisibilityValue = (number: number): string => {
    if (number <= 50) return "Dangerously foggy";
    if (number > 50 && number <= 500) return "Expect heavy fog";
    if (number > 500 && number <= 2000) return "Expect some fog";
    if (number > 2000 && number <= 9000) return "Expect some haze";

    return "Very clear day";
  };

  return (
    <div className="relative h-full lg:ml-36 lg:mr-36 2xl:ml-96 2xl:mr-96">
      <div className="flex flex-col">
        {/* first section */}
        <div className="flex items-center text-white lg:mt-8 2xl:mt-20">
          <div className="mr-4">
            <h2 className="flex lg:text-[200px] 2xl:text-[230px]">
              <Degree temp={Math.round(today.main.temp)} />C
            </h2>
          </div>
          <div className="ml-4 uppercase lg:text-8xl 2xl:text-8xl">
            <h2>{data.name},</h2>
            <span>{data.country}</span>
          </div>
        </div>

        {/* second section */}
        <div className="lg:mt- flex justify-between text-gray-300">
          <div>
            <p className="lg:text-2xl 2xl:text-3xl">
              {today.weather[0].main} {today.weather[0].description}
            </p>
            <p className="lg:text-2xl 2xl:text-3xl">
              H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{" "}
              <Degree temp={Math.floor(today.main.temp_min)} />
            </p>
          </div>

          <div>
            <section className="scrollbar-hide mb-5 mt-4 flex overflow-x-scroll pb-2 lg:w-[400px] 2xl:w-[500px]">
              {data.list.map((item, i) => (
                <div
                  className="inline-block flex-shrink-0 text-center lg:w-[100px] 2xl:w-[100px]"
                  key={i}
                >
                  <p className="border-b-2 border-gray-400 pb-2 text-sm">
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
          </div>
        </div>

        {/* third section */}
        <section className="flex justify-around text-white lg:mt-10">
          <div>
            <div className="mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-sm font-bold drop-shadow-lg backdrop-blur-lg">
              <BsSunriseFill className="text-xl" />
              <span className="mt-2">
                {getSunTime(data.sunrise, data.timezone)}
              </span>
            </div>
            <div className="mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-sm font-bold drop-shadow-lg backdrop-blur-lg">
              <BsSunsetFill className="text-xl" />
              <span className="mt-2">
                {getSunTime(data.sunset, data.timezone)}
              </span>
            </div>
          </div>

          <Tile
            icon={<PiWindBold />}
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(today.wind.deg)}, gust ${today.wind.gust.toFixed(1)} km/h`}
          />

          <Tile
            icon={<LiaTemperatureHighSolid />}
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp) ? "colder" : "warmer"}`}
          />

          <Tile
            icon={<WiHumidity />}
            title="Humidity"
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />

          <Tile
            icon={<PiDrop />}
            title="Precipitation"
            info={`${Math.round(today.pop)}%`}
            description={`${getPrecipitation(today.pop)}, clouds at ${today.clouds.all}%`}
          />

          <Tile
            icon={<WiBarometer />}
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={`${Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"} than standard`}
          />

          <Tile
            icon={<PiEyeBold />}
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
      <span
        onClick={onReset}
        className="absolute top-12 cursor-pointer text-white"
      >
        <FaArrowLeftLong size={24} />
      </span>
    </div>
  );
};

export default ForecastXL;
