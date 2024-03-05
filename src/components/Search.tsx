import { ChangeEvent } from "react";
import { optionType } from "../types";

type Props = {
  input: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

function Search({
  input,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props) {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-100 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 lg:h-[500px] lg:p-24">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>

        <p className="mt-2 text-sm">
          Enter below a place you want to now the weather of and select an
          option from the dropdown
        </p>

        <div className="relative mt-10 flex md:mt-4">
          <input
            type="text"
            value={input}
            className="rounded-s-md border-2 border-zinc-100 px-2 py-1 text-zinc-700"
            onChange={onInputChange}
          />

          <ul className="absolute top-7 m-1 rounded-b-md bg-white text-zinc-700">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="w-full cursor-pointer px-2 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="rounded-e-md border-2 border-zinc-100 px-2 py-1 hover:border-zinc-700 hover:text-zinc-700"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
