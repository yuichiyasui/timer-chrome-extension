import { useEffect, useRef } from "react";
import { Timer } from "@/components/timer";

function App() {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={ref}
      onPointerMove={handleMoveTimer}
      className="fixed cursor-grab z-[999999999] border border-gray-200 text-slate-900 shadow-lg rounded-lg p-4 bg-white/70 backdrop-blur-sm w-[216px]"
    >
      <h1 className="text-xl font-bold text-center mb-4">Timer</h1>

      <Timer />
    </div>
  );
}

export default App;
