import { Timer } from "@/app/timer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stopwatch } from "@/app/stopwatch";
import { useMoveApp } from "@/hooks/use-move-app";
import { useSwitchApp } from "@/hooks/use-switch-app";

export const App = () => {
  const { ref, handleMove } = useMoveApp();
  const { selectedApp, switchApp, options } = useSwitchApp();

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className="fixed cursor-grab z-[999999999] border border-gray-200 text-slate-900 shadow-lg rounded-lg p-4 bg-white/70 backdrop-blur-sm w-[216px] pointer-events-auto"
    >
      <div className="mb-4">
        <Select value={selectedApp} onValueChange={switchApp}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedApp === "timer" ? <Timer /> : <Stopwatch />}
    </div>
  );
};
