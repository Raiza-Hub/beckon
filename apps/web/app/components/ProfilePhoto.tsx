"use client";

import { useEffect, useRef, useState } from "react";
import { CameraIcon, UserIcon } from "@heroicons/react/24/outline";
import { cn } from "~/lib/utils";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

interface ProfilePhotoProps {
  src?: string | null;
  onChange?: (url: string | null) => void;
}

export function ProfilePhoto({ src = null, onChange }: ProfilePhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(src);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_SIZE_MB} MB.`);
      return;
    }

    setError(null);
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(url);
  };

  const handleRemove = () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(null);
    setError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="mb-10 flex flex-col items-center">
      <button
        type="button"
        role="button"
        aria-label={preview ? "Change profile photo" : "Add a profile photo"}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        className="group relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Profile preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <UserIcon className="size-9 text-muted-foreground" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <CameraIcon className="size-5 text-white" />
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
      </button>

      {preview ? (
        <button
          type="button"
          onClick={handleRemove}
          className="mt-3 cursor-pointer text-sm font-medium text-destructive"
        >
          Remove photo
        </button>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Add a profile photo</p>
      )}

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2 text-sm text-destructive transition-opacity",
          error ? "opacity-100" : "opacity-0",
        )}
      >
        {error}
      </p>
    </div>
  );
}