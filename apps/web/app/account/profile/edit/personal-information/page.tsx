"use client";

import { useState } from "react";
import { DatePicker } from "~/app/components/DatePicker";
import { ProfilePhoto } from "~/app/components/ProfilePhoto";
import { GenderField } from "~/app/components/GenderField";
import type { Gender } from "~/schema/AuthSchema";
import { cn } from "~/lib/utils";

const inputClass =
  "w-full border border-input rounded-lg px-3 py-2.5 bg-white text-sm placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none";

const fieldLabelClass = "text-sm font-medium text-neutral-800";

export default function EditPersonalInformationPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [gender, setGender] = useState<Gender | "">("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="mx-auto max-w-xl px-6 py-20 w-full">
      <a
        href="/account/profile"
        className="mb-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to profile
      </a>

      <h1 className="text-3xl tracking-tight font-bold mb-2">
        Personal information
      </h1>
      <p className="text-muted-foreground mb-10">Update your personal details.</p>

      <ProfilePhoto />

      <form onSubmit={handleSubmit}>
        <div className="divide-y divide-neutral-100 border-t border-neutral-100">
          <div className="py-5">
            <label htmlFor="full-name" className={fieldLabelClass}>
              Full name
            </label>
            <div className="mt-2">
              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Add your full name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="py-5">
            <label htmlFor="email" className={fieldLabelClass}>
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Add your email"
                className={inputClass}
              />
            </div>
          </div>

          <div className="py-5">
            <label htmlFor="phone" className={fieldLabelClass}>
              Phone number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 803 123 4567"
                maxLength={17}
                className={inputClass}
              />
            </div>
          </div>

          <div className="py-5">
            <span className={fieldLabelClass}>Date of birth</span>
            <div className="mt-2">
              <DatePicker
                value={dateOfBirth}
                onChange={setDateOfBirth}
                placeholder="Select date of birth"
                className="w-full"
                captionLayout="dropdown"
                startMonth={new Date(1930, 0, 1)}
                endMonth={new Date()}
              />
            </div>
          </div>

          <div className="py-5">
            <GenderField value={gender} onChange={setGender} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p
            role="status"
            aria-live="polite"
            className={cn(
              "text-sm font-medium text-primary transition-opacity",
              saved ? "opacity-100" : "opacity-0",
            )}
          >
            Profile updated
          </p>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            Save changes
          </button>
        </div>
      </form>
    </main>
  );
}