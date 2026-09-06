"use client";

import { useState } from "react";
import { trainStations, universities } from "~/data/locations";
import { DatePicker } from "./DatePicker";
import { LocationField } from "./LocationField";

const locationGroups = [
  {
    groupLabel: "Universities",
    options: universities.map((u) => ({
      title: u.university_title,
      label: u.university_label,
    })),
  },
  {
    groupLabel: "Train stations",
    options: trainStations.map((s) => ({
      title: s.train_station_title,
      label: s.train_station_label,
    })),
  },
];

const findGroup = (title: string) =>
  locationGroups.find((group) =>
    group.options.some((option) => option.title === title),
  )?.groupLabel;

export function SearchBar() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState<Date | undefined>();

  return (
    <form
      className="flex flex-wrap items-center gap-3 justify-center w-full max-w-3xl"
      onSubmit={(e) => e.preventDefault()}
    >
      <LocationField
        value={pickup}
        onChange={setPickup}
        placeholder="Pickup location"
        options={locationGroups}
        disabledGroup={dropoff ? findGroup(dropoff) : undefined}
        ariaLabel="Pickup location"
        className="flex-1 min-w-[180px]"
      />
      <LocationField
        value={dropoff}
        onChange={setDropoff}
        placeholder="Drop-off location"
        options={locationGroups}
        disabledGroup={pickup ? findGroup(pickup) : undefined}
        ariaLabel="Drop-off location"
        className="flex-1 min-w-[180px]"
      />
      <DatePicker value={date} onChange={setDate} />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Search
      </button>
    </form>
  );
}