import { useRef } from "react";
import bell from "/sounds/bell.mp3";

const src =
  import.meta.env.MODE === "development" ? bell : chrome.runtime.getURL(bell);

export const useSounds = () => {
  const audio = useRef(new Audio(src));

  const play = () => {
    audio.current.currentTime = 0;
    audio.current.play();
  };

  const stop = () => {
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  return { play, stop };
};
