import type {
  CreateTrackedRomInput,
  TrackedRom,
  UpdateTrackedRomInput,
} from '../../../../shared/types/Tracked';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/tracked-roms`;

export const trackedRomRepo = {
  async listByUser(userId: string): Promise<TrackedRom[]> {
    const response = await fetch(`${API_URL}?userId=${encodeURIComponent(userId)}`);
    const result = await response.json();

    if (!result.isValid) {
      throw new Error(
        result.errorMessages?.join(' ') || 'Failed to load tracked ROMs.',
      );
    }

    return result.data;
  },

  async create(input: CreateTrackedRomInput): Promise<TrackedRom> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const result = await response.json();

    if (!result.isValid) {
      throw new Error(
        result.errorMessages?.join(' ') || 'Failed to create tracked ROM.',
      );
    }

    return result.data;
  },

  async update(
    id: string,
    patch: UpdateTrackedRomInput,
  ): Promise<TrackedRom | null> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
    });

    const result = await response.json();

    if (!result.isValid) {
      throw new Error(
        result.errorMessages?.join(' ') || 'Failed to update tracked ROM.',
      );
    }

    return result.data;
  },

  async remove(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!result.isValid) {
      throw new Error(
        result.errorMessages?.join(' ') || 'Failed to remove tracked ROM.',
      );
    }

    return result?.data?.removed === true;
  },
};