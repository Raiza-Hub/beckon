"use client";

import { UserIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl tracking-tight font-bold mb-10">Your profile</h1>

      <div className="mb-10 flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <UserIcon className="size-9 text-muted-foreground" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Add a profile photo</p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Personal information</h2>
        <a
          href="/account/profile/edit/personal-information"
          className="cursor-pointer text-sm font-medium text-primary transition-colors hover:underline"
        >
          Edit
        </a>
      </div>

      <div className="mt-4 divide-y divide-neutral-100 border-t border-neutral-100">
        <div className="flex items-center justify-between py-5">
          <span className="text-sm font-medium">Full name</span>
          <span className="text-sm text-muted-foreground">Add your full name</span>
        </div>
        <div className="flex items-center justify-between py-5">
          <span className="text-sm font-medium">Email address</span>
          <span className="text-sm text-muted-foreground">Add your email</span>
        </div>
        <div className="flex items-center justify-between py-5">
          <span className="text-sm font-medium">Phone number</span>
          <span className="text-sm text-muted-foreground">
            Add your phone number (+234)
          </span>
        </div>
        <div className="flex items-center justify-between py-5">
          <span className="text-sm font-medium">Date of birth</span>
          <span className="text-sm text-muted-foreground">
            Add your date of birth
          </span>
        </div>
        <div className="flex items-center justify-between py-5">
          <span className="text-sm font-medium">Gender</span>
          <span className="text-sm text-muted-foreground">
            Add your gender
          </span>
        </div>
      </div>
    </main>
  );
}