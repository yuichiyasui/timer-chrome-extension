import { TimeSelector } from "@/components/time-selector";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export const Timer = () => {
  const intervalId = useRef<number | null>(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [lastSeconds, setLastSeconds] = useState(0);

  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const cur = intervalId.current;

    return () => {
      if (cur) {
        window.clearInterval(cur);
      }
    };
  }, []);

  const countCallback = () => {
    setLastSeconds((prev) => {
      if (prev === 0 && intervalId.current) {
        window.clearInterval(intervalId.current);

        return 0;
      }
      const next = prev - 1;
      if (next === 0) {
        setFinished(true);
      }

      return prev - 1;
    });
  };

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setLastSeconds(totalSeconds);

    const id = window.setInterval(countCallback, 1000);
    intervalId.current = id;
  };

  const stopTimer = () => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
      setPaused(true);
    }
  };

  const resumeTimer = () => {
    const id = window.setInterval(countCallback, 1000);

    intervalId.current = id;
    setPaused(false);
  };

  const resetTimer = () => {
    setLastSeconds(0);
    setPaused(false);

    if (intervalId.current) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const canStart = hours > 0 || minutes > 0 || seconds > 0;
  const counting = lastSeconds > 0;

  const screenHours = Math.floor(lastSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const screenMinutes = Math.floor((lastSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const screenSeconds = (lastSeconds % 60).toString().padStart(2, "0");

  if (!counting && finished) {
    return (
      <>
        <p className="text-4xl font-bold text-center text-red-500">
          Time's up!
        </p>
        <div className="flex justify-center mt-5">
          <Button
            size="sm"
            onClick={() => {
              setFinished(false);
              resetTimer();
            }}
          >
            Reset
          </Button>
        </div>
      </>
    );
  }

  if (counting) {
    return (
      <>
        <p className="flex gap-x-2 justify-center items-center">
          <span className="text-4xl tabular-nums">{screenHours}</span>
          <span className="text-4xl relative -top-[0.1em]">:</span>
          <span className="text-4xl tabular-nums">{screenMinutes}</span>
          <span className="text-4xl relative -top-[0.1em]">:</span>
          <span className="text-4xl tabular-nums">{screenSeconds}</span>
        </p>
        <div className="flex gap-x-4 justify-center mt-5">
          {paused ? (
            <Button size="sm" onClick={resumeTimer}>
              Resume
            </Button>
          ) : (
            <Button size="sm" variant="secondary" onClick={stopTimer}>
              Pause
            </Button>
          )}
          <Button size="sm" variant="destructive" onClick={resetTimer}>
            Reset
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <TimeSelector
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onChangeHours={(e) => setHours(e.target.valueAsNumber)}
        onChangeMinutes={(e) => setMinutes(e.target.valueAsNumber)}
        onChangeSeconds={(e) => setSeconds(e.target.valueAsNumber)}
      />
      <div className="flex justify-center mt-5">
        <Button size="sm" disabled={!canStart} onClick={startTimer}>
          Start
        </Button>
      </div>
    </>
  );
};
