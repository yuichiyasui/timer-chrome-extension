import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TimeSelector } from "@/components/time-selector";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const intervalId = useRef<number | null>(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [lastSeconds, setLastSeconds] = useState(0);

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const cur = intervalId.current;

    return () => {
      if (cur) {
        window.clearInterval(cur);
      }
    };
  }, []);

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

  const countCallback = () => {
    setLastSeconds((prev) => {
      if (prev === 0 && intervalId.current) {
        clearInterval(intervalId.current);

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
    }
  };

  const resumeTimer = () => {
    const id = window.setInterval(countCallback, 1000);

    intervalId.current = id;
  };

  const resetTimer = () => {
    setLastSeconds(0);

    if (intervalId.current) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
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
      className="fixed cursor-grab z-[999999999] border border-gray-200 text-slate-900 shadow-lg rounded-lg p-4 bg-white/70 backdrop-blur-sm w-[216px]"
    >
      <h1 className="text-xl font-bold text-center mb-4">Timer</h1>

      {(() => {
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
      })()}
    </div>
  );
}

export default App;
