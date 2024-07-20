import clsx from "clsx";
import { useState } from "react";

type Props = {
  type: "hours" | "minutes" | "seconds";
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TimeField = ({ type, value, onChange }: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  const { min, max } =
    type === "hours" ? { min: 0, max: 99 } : { min: 0, max: 59 };
  const screenValue = value.toString().padStart(2, "0");

  return (
    <label title={type}>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          if (Number.isNaN(e.target.valueAsNumber)) {
            e.target.value = "0";
            onChange(e);
            return;
          }

          if (e.target.valueAsNumber < min || e.target.valueAsNumber > max) {
            e.preventDefault();
            return;
          }

          onChange(e);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className="sr-only"
      />
      <span
        className={clsx(
          "text-4xl",
          "tabular-nums",
          "cursor-pointer",
          isFocus && "ring",
        )}
      >
        {screenValue}
      </span>
    </label>
  );
};
