import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TimeSelector } from "@/components/time-selector";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [lastSeconds, setLastSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = "0px";
      ref.current.style.top = "0px";
    }
  }, []);

  const handleMoveTimer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons < 1 || !ref.current) {
      return;
    }

    ref.current.style.left = `${ref.current.offsetLeft + e.movementX}px`;
    ref.current.style.top = `${ref.current.offsetTop + e.movementY}px`;
    ref.current.setPointerCapture(e.pointerId);
  };

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setLastSeconds(totalSeconds);

    const intervalId = window.setInterval(() => {
      setLastSeconds((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    setIntervalId(intervalId);
  };

  const stopTimer = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const resumeTimer = () => {
    const intervalId = window.setInterval(() => {
      setLastSeconds((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    setIntervalId(intervalId);
  };

  const resetTimer = () => {
    setLastSeconds(0);

    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const canStart = hours > 0 || minutes > 0 || seconds > 0;
  const counting = lastSeconds > 0;
  const paused = intervalId === null && lastSeconds > 0;

  const screenHours = Math.floor(lastSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const screenMinutes = Math.floor((lastSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const screenSeconds = (lastSeconds % 60).toString().padStart(2, "0");

  return (
    <div
      ref={ref}
      onPointerMove={handleMoveTimer}
      className="fixed cursor-grab z-[999999999] border border-gray-200 shadow-lg rounded-lg p-4 bg-white/70 backdrop-blur-sm"
    >
      <h1 className="text-xl font-bold text-center mb-4">Timer</h1>
      {counting ? (
        <p className="flex gap-x-2 justify-center items-center">
          <span className="text-4xl tabular-nums">{screenHours}</span>
          <span className="text-4xl relative -top-[0.1em]">:</span>
          <span className="text-4xl tabular-nums">{screenMinutes}</span>
          <span className="text-4xl relative -top-[0.1em]">:</span>
          <span className="text-4xl tabular-nums">{screenSeconds}</span>
        </p>
      ) : (
        <TimeSelector
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          onChangeHours={(e) => setHours(e.target.valueAsNumber)}
          onChangeMinutes={(e) => setMinutes(e.target.valueAsNumber)}
          onChangeSeconds={(e) => setSeconds(e.target.valueAsNumber)}
        />
      )}

      <div className="flex gap-x-4 justify-center mt-5">
        <Button size="sm" disabled={!canStart || counting} onClick={startTimer}>
          Start
        </Button>
        {paused ? (
          <Button size="sm" onClick={resumeTimer}>
            Resume
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            disabled={!counting}
            onClick={stopTimer}
          >
            Pause
          </Button>
        )}

        <Button
          size="sm"
          variant="destructive"
          disabled={!counting}
          onClick={resetTimer}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default App;
