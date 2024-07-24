import { ScreenTime } from "@/components/screen-time";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Stopwatch = () => {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const start = () => {
    const id = window.setInterval(() => {
      // finish at 99:59:59
      const limit = 99 * 60 * 60 + 59 * 60 + 59;
      if (seconds >= limit) {
        reset();
        return;
      }

      setSeconds((prev) => prev + 1);
    }, 1000);

    setIntervalId(id);
    setPaused(false);
  };

  const stop = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
      setPaused(true);
    }
  };

  const reset = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
    setSeconds(0);
    setPaused(false);
  };

  return (
    <div>
      <ScreenTime seconds={seconds} />
      <div className="flex gap-x-4 justify-center mt-5">
        {(() => {
          if (paused) {
            return (
              <>
                <Button size="sm" onClick={start}>
                  Resume
                </Button>
                <Button size="sm" variant="destructive" onClick={reset}>
                  Reset
                </Button>
              </>
            );
          }

          if (intervalId === null) {
            return (
              <Button size="sm" onClick={start}>
                Start
              </Button>
            );
          }

          return (
            <>
              <Button size="sm" variant="secondary" onClick={stop}>
                Pause
              </Button>
              <Button size="sm" variant="destructive" onClick={reset}>
                Reset
              </Button>
            </>
          );
        })()}
      </div>
    </div>
  );
};
