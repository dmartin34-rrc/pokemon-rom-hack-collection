import type {
  CreateTrackedRomInput,
  TrackedRom,
  UpdateTrackedRomInput,
} from '../../../../shared/types/Tracked';

/**
 * Base API URL for tracked ROM endpoints.
 */
const API_URL = 'http://localhost:3000/api/tracked-roms';

/**
 * trackedRomRepo
 *
 * Handles all HTTP requests related to tracked ROMs.
 * Acts as the data access layer for the frontend.
 *
 * This repository is responsible for:
 * - sending requests to the back-end API
 * - unpacking API responses
 * - throwing errors when validation fails
 */
export const trackedRomRepo = {
  /**
   * Fetch all tracked ROMs for a specific user.
   *
   * @param userId - The ID of the user
   * @returns Array of tracked ROMs
   * @throws Error when the request fails or the API returns validation errors
   */
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

  /**
   * Create a new tracked ROM.
   *
   * @param input - New tracked ROM data
   * @returns The created tracked ROM
   * @throws Error when the request fails or the API returns validation errors
   */
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

  /**
   * Update an existing tracked ROM.
   *
   * @param id - ID of the tracked ROM
   * @param patch - Partial update data
   * @returns The updated tracked ROM
   * @throws Error when the request fails or the API returns validation errors
   */
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

  /**
   * Delete a tracked ROM.
   *
   * @param id - ID of the tracked ROM
   * @returns True if the tracked ROM was removed successfully
   * @throws Error when the request fails or the API returns validation errors
   */
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