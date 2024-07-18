import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [lastSeconds, setLastSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const [opacity, setOpacity] = useState(100);

  const handleMoveTimer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons < 1 || !ref.current) {
      return;
    }

    ref.current.style.left = `${ref.current.offsetLeft + e.movementX}px`;
    ref.current.style.top = `${ref.current.offsetTop + e.movementY}px`;
    ref.current.setPointerCapture(e.pointerId);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHours(e.target.valueAsNumber);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.valueAsNumber);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(e.target.valueAsNumber);
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

  const screenHours = Math.floor(lastSeconds / 3600);
  const screenMinutes = Math.floor((lastSeconds % 3600) / 60);
  const screenSeconds = lastSeconds % 60;

  return (
    <div
      ref={ref}
      onPointerMove={handleMoveTimer}
      style={{
        opacity: opacity / 100,
      }}
      className="fixed cursor-grab z-[999999999] border border-gray-200 shadow-lg rounded-lg p-4"
    >
      <h1 className="text-3xl font-bold text-center mb-4">Timer</h1>
      {counting ? (
        <p>
          {screenHours}:{screenMinutes}:{screenSeconds}
        </p>
      ) : (
        <div className="flex gap-x-2 justify-center items-center">
          <label className="flex flex-col items-center justify-center">
            <input
              type="number"
              value={hours}
              onChange={handleHoursChange}
              className="rounded px-2 py-1 w-12"
            />
            <span>h</span>
          </label>
          <span>:</span>
          <label className="flex flex-col items-center justify-center">
            <input
              type="number"
              value={minutes}
              onChange={handleMinutesChange}
              className="rounded px-2 py-1 w-12"
            />
            <span>m</span>
          </label>
          <span>:</span>
          <label className="flex flex-col items-center justify-center">
            <input
              type="number"
              value={seconds}
              onChange={handleSecondsChange}
              className="rounded px-2 py-1 w-12"
            />
            <span>s</span>
          </label>
        </div>
      )}

      <div className="flex gap-x-4 justify-center mt-5">
        <Button disabled={!canStart || counting} onClick={startTimer}>
          Start
        </Button>
        {paused ? (
          <Button onClick={resumeTimer}>Resume</Button>
        ) : (
          <Button variant="secondary" onClick={stopTimer}>
            Pause
          </Button>
        )}

        <Button variant="destructive" onClick={resetTimer}>
          Reset
        </Button>
      </div>
      <div>
        <label className="flex items-center">
          <span>Opacity</span>
          <input
            type="range"
            min={20}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(e.target.valueAsNumber)}
          />
          <span>{opacity}</span>
        </label>
      </div>
    </div>
  );
}

export default App;
