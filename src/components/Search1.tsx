import { ChangeEvent } from "react";
import { optionType } from "../types";

type Props = {
  input: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

function Search1({
  input,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props) {
  return (
    <>
      <div className="mx-12 md:mx-36 xl:mx-72">
        <div className="flex h-[100vh] flex-col justify-around text-white">
          <div className="">
            <h1 className="max-w-1 text-7xl font-bold lg:text-[100px]">
              Weather Forecast
            </h1>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Enter a city"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid white",
                outline: "none",
              }}
              value={input}
              onChange={onInputChange}
            />

            <ul className="absolute left-[-4px] top-7 m-1 rounded-b-md bg-white text-zinc-700">
              {options.map((option: optionType, index: number) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="w-full cursor-pointer px-2 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="absolute top-[-11px] rounded-e-md border-2 border-white px-2 py-1 hover:border-zinc-700 hover:text-zinc-700"
              onClick={onSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search1;
