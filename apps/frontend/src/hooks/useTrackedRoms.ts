import { useEffect, useState } from 'react';
import type {
  CreateTrackedRomInput,
  TrackedRom,
  UpdateTrackedRomInput,
} from '../../../../shared/types/Tracked';
import { trackedRomRepo } from '../apis/trackedRomRepo';

/**
 * Return value of the useTrackedRoms hook.
 */
type UseTrackedRomsReturn = {
  items: TrackedRom[];
  isLoading: boolean;
  errorMessages: string[];
  refresh: () => Promise<void>;
  add: (
    input: CreateTrackedRomInput
  ) => Promise<{ isValid: boolean; errorMessages?: string[]; data?: TrackedRom }>;
  update: (
    id: string,
    patch: UpdateTrackedRomInput
  ) => Promise<{ isValid: boolean; errorMessages?: string[]; data?: TrackedRom }>;
  remove: (
    id: string
  ) => Promise<{ isValid: boolean; errorMessages?: string[]; data?: { removed: true } }>;
};

/**
 * Handles tracked ROM state for a specific user.
 *
 * This hook:
 * - loads tracked ROMs from the frontend API repository
 * - stores the current tracked ROM list in local React state
 * - provides add, update, and remove actions for the UI
 *
 * @param userId - The current user's ID
 * @returns Current tracked ROM state and actions
 */
export const useTrackedRoms = (userId: string): UseTrackedRomsReturn => {
  const [items, setItems] = useState<TrackedRom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  /**
   * Reloads tracked ROMs for the current user.
   */
  const refresh = async () => {
    setIsLoading(true);

    try {
      const data = await trackedRomRepo.listByUser(userId);

      const sorted = [...data].sort((a, b) =>
        b.lastUpdated.localeCompare(a.lastUpdated),
      );

      setItems(sorted);
      setErrorMessages([]);
    } catch {
      setErrorMessages(['Failed to load tracked ROMs.']);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load tracked ROMs when the component mounts
   * and whenever the userId changes.
   */
  useEffect(() => {
    void refresh();
  }, [userId]);

  /**
   * Adds a new tracked ROM for the current user.
   *
   * @param input - Full tracked ROM input
   * @returns Result from the API repository
   */
  const add = async (input: CreateTrackedRomInput) => {
    try {
      const created = await trackedRomRepo.create({
        ...input,
        userId,
        hoursPlayed: input.hoursPlayed ?? 0,
        status: input.status ?? 'planned',
      });

      setItems((prev) => [created, ...prev]);
      setErrorMessages([]);

      return { isValid: true, data: created };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to add tracked ROM.';

      setErrorMessages([message]);
      return { isValid: false, errorMessages: [message] };
    }
  };

  /**
   * Updates an existing tracked ROM.
   *
   * @param id - Tracked ROM ID
   * @param patch - Partial update fields
   * @returns Result from the API repository
   */
  const update = async (id: string, patch: UpdateTrackedRomInput) => {
    try {
      const updated = await trackedRomRepo.update(id, patch);

      if (!updated) {
        const errorMessages = ['Tracked ROM not found.'];
        setErrorMessages(errorMessages);
        return { isValid: false, errorMessages };
      }

      setItems((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setErrorMessages([]);

      return { isValid: true, data: updated };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update tracked ROM.';

      setErrorMessages([message]);
      return { isValid: false, errorMessages: [message] };
    }
  };

  /**
   * Removes a tracked ROM by ID.
   *
   * @param id - Tracked ROM ID
   * @returns Result indicating whether removal succeeded
   */
  const remove: UseTrackedRomsReturn["remove"] = async (id) => {
    try {
      const ok = await trackedRomRepo.remove(id);

      if (!ok) {
        const errorMessages = ['Tracked ROM not found.'];
        setErrorMessages(errorMessages);
        return { isValid: false, errorMessages };
      }

      setItems((prev) => prev.filter((r) => r.id !== id));
      setErrorMessages([]);

      return { isValid: true, data: { removed: true as const } };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to remove tracked ROM.';

      setErrorMessages([message]);
      return { isValid: false, errorMessages: [message] };
    }
  };

  return { items, isLoading, errorMessages, refresh, add, update, remove };
};