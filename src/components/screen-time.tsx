type Props = {
  seconds: number;
};

export const ScreenTime = ({ seconds }: Props) => {
  const screenHours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const screenMinutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const screenSeconds = (seconds % 60).toString().padStart(2, "0");

  return (
    <p className="flex gap-x-2 justify-center items-center">
      <span className="text-4xl tabular-nums">{screenHours}</span>
      <span className="text-4xl relative -top-[0.1em]">:</span>
      <span className="text-4xl tabular-nums">{screenMinutes}</span>
      <span className="text-4xl relative -top-[0.1em]">:</span>
      <span className="text-4xl tabular-nums">{screenSeconds}</span>
    </p>
  );
};
