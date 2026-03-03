export type TrackedRomStatus =
  | "planned"
  | "playing"
  | "completed"
  | "on-hold"
  | "dropped";

export type TrackedRom = {
  id: string;
  userId: string;
  title: string;
  hoursPlayed: number;
  status: TrackedRomStatus;
  dateAdded: string;
  lastUpdated: string; 
};

export type CreateTrackedRomInput = Omit<
  TrackedRom,
  "id" | "dateAdded" | "lastUpdated"
>;

export type UpdateTrackedRomInput = Partial<
  Omit<TrackedRom, "id" | "userId" | "dateAdded">
>;