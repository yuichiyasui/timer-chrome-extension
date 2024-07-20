import { ScreenTime } from "@/components/screen-time";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export const Stopwatch = () => {
  const intervalId = useRef<number | null>(null);

  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const cur = intervalId.current;

    return () => {
      if (cur) {
        window.clearInterval(cur);
      }
    };
  }, []);

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

    intervalId.current = id;
    setPaused(false);
  };

  const stop = () => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
      setPaused(true);
    }
  };

  const reset = () => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setSeconds(0);
    setPaused(false);
  };

  return (
    <div>
      <ScreenTime seconds={seconds} />
      <div className="flex gap-x-4 justify-center mt-5">
        {(() => {
          if (seconds === 0) {
            return (
              <Button size="sm" onClick={start}>
                Start
              </Button>
            );
          }

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
