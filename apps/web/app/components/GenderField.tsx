"use client";

import { GENDERS, type Gender } from "~/schema/AuthSchema";
import { cn } from "~/lib/utils";

interface GenderFieldProps {
  value: Gender | "";
  onChange: (gender: Gender) => void;
  error?: string;
}

export function GenderField({ value, onChange, error }: GenderFieldProps) {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm font-medium">Gender</span>
      <div role="radiogroup" aria-label="Gender" className="grid grid-cols-2 gap-3">
        {GENDERS.map((gender) => {
          const selected = value === gender;
          return (
            <button
              key={gender}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(gender)}
              className={cn(
                "h-10 cursor-pointer rounded-lg border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                selected
                  ? "border-ring bg-primary/10 text-neutral-900"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400",
              )}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}