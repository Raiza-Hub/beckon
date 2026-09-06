"use client";

import { SearchBar } from "../components/SearchBar";
import HowItWorks from "../components/HowItWorks";
import FaqSection from "../components/FaqSection";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center text-center py-28">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Your ride, at your beck and call.
        </h1>
        <p className="text-neutral-500 text-lg max-w-xl mb-8">
          Book your next ride in seconds. Fast, reliable, and always at your command.
        </p>
        <SearchBar />
      </section>

      <div className="bg-background w-full">
        <section className="py-28 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How Beckōn Works
          </h2>

          <HowItWorks className="py-0 -mx-6" />
        </section>
      </div>

      <FaqSection className="py-28" />
    </>
  );
}
