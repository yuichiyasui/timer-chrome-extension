import { useEffect, useRef } from "react";

export const useMoveApp = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = "0px";
      ref.current.style.top = "0px";
    }
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons < 1 || !ref.current) {
      return;
    }

    ref.current.style.left = `${ref.current.offsetLeft + e.movementX}px`;
    ref.current.style.top = `${ref.current.offsetTop + e.movementY}px`;
    ref.current.setPointerCapture(e.pointerId);
  };

  return { ref, handleMove };
};
