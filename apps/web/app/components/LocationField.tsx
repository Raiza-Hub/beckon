"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { cn } from "~/lib/utils";

export interface LocationOption {
  title: string;
  label: string;
}

export interface LocationOptionGroup {
  groupLabel: string;
  options: LocationOption[];
}

interface LocationFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: LocationOptionGroup[];
  disabledGroup?: string;
  ariaLabel: string;
  className?: string;
}

export function LocationField({
  value,
  onChange,
  placeholder,
  options,
  disabledGroup,
  ariaLabel,
  className,
}: LocationFieldProps) {
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      const containingGroup = options.find((group) =>
        group.options.some((option) => option.title === value),
      );
      setExpandedGroup(containingGroup ? containingGroup.groupLabel : null);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="relative flex w-full items-center gap-2 border border-neutral-300 rounded-lg pl-10 pr-3 py-2.5 text-sm text-left bg-white transition-colors hover:border-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
      >
        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
        <span className={cn("flex-1 truncate", !value && "text-neutral-400")}>
          {value ? value : placeholder}
        </span>
        <ChevronDownIcon
          className={cn("size-4 text-neutral-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <LazyMotion features={domAnimation}>
          <div
            role="listbox"
            aria-labelledby={`${ariaLabel}-listbox`}
            className="absolute top-full left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto border border-neutral-200 bg-white rounded-xl shadow-lg p-2"
          >
            {options.map((group) => {
              const isExpanded = expandedGroup === group.groupLabel;
              return (
                <div key={group.groupLabel}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpandedGroup(isExpanded ? null : group.groupLabel)
                    }
                    className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:bg-secondary/60 transition-colors"
                  >
                    {group.groupLabel}
                    <ChevronDownIcon
                      className={cn(
                        "size-3.5 shrink-0 text-muted-foreground transition-transform",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        {group.options.map((option) => {
                          const selected = value === option.title;
                          const disabled = group.groupLabel === disabledGroup;
                          return (
                            <button
                              key={`${group.groupLabel}-${option.title}`}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              disabled={disabled}
                              onClick={() => {
                                onChange?.(option.title);
                                setOpen(false);
                              }}
                              className={cn(
                                "flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition-colors",
                                disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : selected
                                    ? "bg-primary/10"
                                    : "hover:bg-secondary/60",
                              )}
                            >
                              <span className="text-sm font-medium">
                                {option.title}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {option.label}
                              </span>
                            </button>
                          );
                        })}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </LazyMotion>
      )}
    </div>
  );
}