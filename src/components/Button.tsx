import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"button">, "className">;

export const Button = ({ children, type = "button", ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      className="bg-gray-200 border disabled:opacity-50 disabled:cursor-not-allowed border-gray-400 py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};
