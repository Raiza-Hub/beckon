"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import "react-day-picker/style.css";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  captionLayout?: "label" | "dropdown";
  startMonth?: Date;
  endMonth?: Date;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  captionLayout = "label",
  startMonth,
  endMonth,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn("relative border border-input rounded-lg pl-10 pr-3 py-2.5 text-sm text-left min-w-[160px] bg-white transition-colors hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none", className)}
      >
        <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
        {value ? format(value, "MMM d, yyyy") : <span className="text-neutral-400">{placeholder}</span>}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 z-50 bg-white border border-neutral-200 rounded-xl shadow-lg p-3"
          style={
            {
              "--rdp-accent-color": "#093fb4",
              "--rdp-accent-background-color": "#e8eefb",
            } as React.CSSProperties
          }
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            defaultMonth={value ?? new Date()}
            captionLayout={captionLayout}
            startMonth={startMonth}
            endMonth={endMonth}
            reverseYears={captionLayout === "dropdown"}
          />
        </div>
      )}
    </div>
  );
}
