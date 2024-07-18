import { TimeField } from "./time-field";

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  onChangeHours: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMinutes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSeconds: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TimeSelector = ({
  hours,
  minutes,
  seconds,
  onChangeHours,
  onChangeMinutes,
  onChangeSeconds,
}: Props) => {
  return (
    <fieldset>
      <legend className="sr-only">Time</legend>
      <div className="flex gap-x-2 justify-center items-center">
        <TimeField type="hours" value={hours} onChange={onChangeHours} />
        <span className="text-4xl relative -top-[0.1em]">:</span>
        <TimeField type="minutes" value={minutes} onChange={onChangeMinutes} />
        <span className="text-4xl relative -top-[0.1em]">:</span>
        <TimeField type="seconds" value={seconds} onChange={onChangeSeconds} />
      </div>
    </fieldset>
  );
};
