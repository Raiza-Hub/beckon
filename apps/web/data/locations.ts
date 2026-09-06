export interface University {
  university_title: string;
  university_label: string;
}

export interface TrainStation {
  train_station_title: string;
  train_station_label: string;
}

export const universities: University[] = [
  {
    university_title: "FUNAAB",
    university_label: "Federal University of Agriculture, Alabata, Ogun State",
  },
  {
    university_title: "Babcock",
    university_label: "Babcock University, Ilishan-Remo, Ogun State",
  },
  {
    university_title: "Ilaro",
    university_label: "Federal Polytechnic, Ilaro, Ogun State",
  },
];

export const trainStations: TrainStation[] = [
  {
    train_station_title: "Aremo Olusegun Osoba Station",
    train_station_label:
      "Aremo Olusegun Osoba Railway Station, Olodo, Abeokuta-Ibadan Road, Ogun State",
  },
  {
    train_station_title: "Ladoke Akintola Station",
    train_station_label:
      "Ladoke Akintola Railway Station, Omi-Adio, Ibadan, Oyo State",
  },
  {
    train_station_title: "Professor Wole Soyinka Station",
    train_station_label:
      "Professor Wole Soyinka Railway Station, Laderin, Abeokuta, Ogun State",
  },
];