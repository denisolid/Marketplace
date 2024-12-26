import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" {...props} />
        <div
          className={cn(
            "w-4 h-4 border rounded transition-colors",
            props.checked ? "bg-black border-black" : "border-gray-300",
            className
          )}
        >
          {props.checked && (
            <Check className="h-3 w-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </div>
      <span className="text-sm">{label}</span>
    </label>
  );
}
