type Props = {
  icon: React.ReactNode;
  title: string;
  info: string | JSX.Element;
  description: string;
};

function Tile({ icon, title, info, description }: Props): JSX.Element {
  return (
    <div className="flex h-[180px] w-[150px] flex-col justify-between rounded bg-white/20 p-2 text-white drop-shadow-lg backdrop-blur-lg md:mb-4">
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
