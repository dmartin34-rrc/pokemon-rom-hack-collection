import type {
  TrackedRom,
  CreateTrackedRomInput,
  UpdateTrackedRomInput,
} from '../types/Tracked';

import trackedData from '../../../../../../shared/data/trackedData.json';

// Type the JSON once (cleaner than repeating `as TrackedRom[]`)
const seedData = trackedData as TrackedRom[];

let trackedRoms: TrackedRom[] = [...seedData];

const nowISO = () => new Date().toISOString();
const newId = () => `track-${crypto.randomUUID()}`;

export const trackedRomRepo = {
  async listByUser(userId: string): Promise<TrackedRom[]> {
    return trackedRoms.filter((r) => r.userId === userId);
  },

  async getById(id: string): Promise<TrackedRom | null> {
    return trackedRoms.find((r) => r.id === id) ?? null;
  },

  async create(input: CreateTrackedRomInput): Promise<TrackedRom> {
    const created: TrackedRom = {
      ...input,
      id: newId(),
      dateAdded: nowISO(),
      lastUpdated: nowISO(),
    };

    trackedRoms = [created, ...trackedRoms];
    return created;
  },

  async update(
    id: string,
    patch: UpdateTrackedRomInput,
  ): Promise<TrackedRom | null> {
    const index = trackedRoms.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const updated: TrackedRom = {
      ...trackedRoms[index],
      ...patch,
      lastUpdated: nowISO(),
    };

    trackedRoms[index] = updated;
    return updated;
  },

  async remove(id: string): Promise<boolean> {
    const before = trackedRoms.length;
    trackedRoms = trackedRoms.filter((r) => r.id !== id);
    return trackedRoms.length !== before;
  },

  async reset(): Promise<void> {
    trackedRoms = [...seedData];
  },
};
