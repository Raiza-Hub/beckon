"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterSchema, type Gender } from "~/schema/AuthSchema";
import { DatePicker } from "../DatePicker";
import { GenderField } from "../GenderField";

interface FieldErrors {
  phoneNumber?: string[];
  dateOfBirth?: string[];
  gender?: string[];
}

const formatNigerianPhone = (raw: string) => {
  let digits = raw.replace(/\D/g, "").replace(/^0/, "").slice(0, 13);
  if (!digits) return "";
  if (!digits.startsWith("234")) digits = `234${digits}`.slice(0, 13);

  if (digits.length <= 3) return `+${digits}`;
  if (digits.length <= 6) return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 9) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 13)}`;
};

const normalizePhone = (value: string) => value.replace(/\s/g, "");

const OnboardingForm = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<Gender | "">("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = RegisterSchema.safeParse({
      phoneNumber: normalizePhone(phoneNumber),
      dateOfBirth,
      gender,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  const revalidate = (
    nextPhone = phoneNumber,
    nextDob = dateOfBirth,
    nextGender = gender,
  ) => {
    const result = RegisterSchema.safeParse({
      phoneNumber: normalizePhone(nextPhone),
      dateOfBirth: nextDob,
      gender: nextGender,
    });
    setErrors(result.success ? {} : (result.error.flatten().fieldErrors as FieldErrors));
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatNigerianPhone(value);
    setPhoneNumber(formatted);
    if (errors.phoneNumber) revalidate(formatted);
  };

  const handleDobChange = (date: Date | undefined) => {
    setDateOfBirth(date);
    if (errors.dateOfBirth) revalidate(phoneNumber, date);
  };

  const handleGenderChange = (value: Gender) => {
    setGender(value);
    if (errors.gender) revalidate(phoneNumber, dateOfBirth, value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="phoneNumber" className="text-sm font-medium">
          Phone number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="+234 803 123 4567"
          maxLength={17}
          value={phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
          aria-invalid={!!errors.phoneNumber}
          aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
        />
        {errors.phoneNumber && (
          <p id="phoneNumber-error" className="text-xs text-destructive">
            {errors.phoneNumber[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium">Date of birth</span>
        <DatePicker
          value={dateOfBirth}
          onChange={handleDobChange}
          placeholder="Select date"
          className="w-full"
          captionLayout="dropdown"
          startMonth={new Date(1930, 0, 1)}
          endMonth={new Date()}
        />
        {errors.dateOfBirth && (
          <p className="text-xs text-destructive">{errors.dateOfBirth[0]}</p>
        )}
      </div>

      <GenderField
        value={gender}
        onChange={handleGenderChange}
        error={errors.gender?.[0]}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60"
      >
        {isSubmitting ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            aria-hidden="true"
          />
        ) : null}
        {isSubmitting ? "Completing…" : "Continue"}
      </button>
    </form>
  );
};

export default OnboardingForm;