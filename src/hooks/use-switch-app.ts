import { useState } from "react";

const appOption = {
  timer: "timer",
  stopwatch: "stopwatch",
} as const;

const options = Object.values(appOption);

const isValidApp = (value: string): value is keyof typeof appOption => {
  return Object.keys(appOption).includes(value);
};

export const useSwitchApp = () => {
  const [selectedApp, setSelectedApp] = useState<
    (typeof appOption)[keyof typeof appOption]
  >(appOption.timer);

  const switchApp = (value: string) => {
    if (!isValidApp(value)) return;

    setSelectedApp(value);
  };

  return { selectedApp, switchApp, options };
};
