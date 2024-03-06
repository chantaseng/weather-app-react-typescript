type Props = {
  icon: React.ReactNode;
  title: string;
  info: string | JSX.Element;
  description: string;
};

// const icons = {
//   wind: <PiWindBold />,
//   feels: <LiaTemperatureHighSolid />,
//   humidity: <WiHumidity />,
//   precipitation: <PiDrop />,
//   pressure: <WiBarometer />,
//   visibility: <PiEyeBold />,
// };

function Tile({ icon, title, info, description }: Props): JSX.Element {
  // const Icon = icons[icon];
  return (
    <div className="mb-5 flex h-[130px] w-[140px] flex-col justify-between rounded bg-white/20 p-2 text-zinc-700 drop-shadow-lg backdrop-blur-lg">
      <div className="flex items-center text-sm font-bold">
        <h4>{icon}</h4>
        <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>
      <p className="text-sm font-bold">{description}</p>
    </div>
  );
}

export default Tile;
