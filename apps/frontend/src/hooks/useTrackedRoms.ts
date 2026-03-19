import { useEffect, useState } from "react";
import type { TrackedRom, UpdateTrackedRomInput } from "../types/Tracked";
import { trackedRomService } from "../services/trackedRomService";

/**
 * Return value of the {@link useTrackedRoms} hook.
 *
 * @type {UseTrackedRomsReturn}
 *
 * @property {TrackedRom[]} items - The array of tracked ROMs for the current user.
 * @property {boolean} isLoading - True while tracked ROMs are being loaded.
 * @property {string[]} errorMessages - Any validation or load errors to display in the UI.
 * @property {() => Promise<void>} refresh - Reloads tracked ROMs from the service/repo.
 * @property {(title: string) => Promise<any>} add - Adds a new tracked ROM (defaults to planned, 0 hours).
 * @property {(id: string, patch: UpdateTrackedRomInput) => Promise<any>} update - Updates a tracked ROM by id.
 * @property {(id: string) => Promise<any>} remove - Removes a tracked ROM by id.
 *
 * @example
 * const { items, add, update, remove } = useTrackedRoms("demo-user");
 */
type UseTrackedRomsReturn = {
  items: TrackedRom[];
  isLoading: boolean;
  errorMessages: string[];
  refresh: () => Promise<void>;
  add: (title: string) => Promise<any>;
  update: (id: string, patch: UpdateTrackedRomInput) => Promise<any>;
  remove: (id: string) => Promise<any>;
};

/**
 * Handles tracked ROM state for a specific user and delegates all
 * persistence and validation to the service layer.
 *
 * Automatically loads the user's tracked ROMs on mount (and when userId changes),
 * and keeps local React state synchronized with the service/repository layer.
 *
 * @param {string} userId - The user whose tracked ROMs should be loaded.
 * @returns {UseTrackedRomsReturn} The current tracked ROMs and available actions.
 *
 * @example
 * const { items, add } = useTrackedRoms("demo-user");
 * return (
 *   <>
 *     <p>Tracked: {items.length}</p>
 *     <button onClick={() => void add("Pokemon Unbound")}>Add</button>
 *   </>
 * );
 */
export const useTrackedRoms = (userId: string): UseTrackedRomsReturn => {
  const [items, setItems] = useState<TrackedRom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const data = await trackedRomService.listByUser(userId);

      const sorted = [...data].sort((a, b) =>
        b.lastUpdated.localeCompare(a.lastUpdated)
      );

      setItems(sorted);
      setErrorMessages([]);
    } catch {
      setErrorMessages(["Failed to load tracked ROMs."]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, [userId]);

  const add = async (title: string) => {
    const result = await trackedRomService.add({
      userId,
      title,
      hoursPlayed: 0,
      status: "planned",
    });

    if (!result.isValid) {
      setErrorMessages(result.errorMessages);
      return result;
    }

    setItems((prev) => [result.data, ...prev]);
    setErrorMessages([]);
    return result;
  };

  const update = async (id: string, patch: UpdateTrackedRomInput) => {
    const result = await trackedRomService.update(id, patch);

    if (!result.isValid) {
      setErrorMessages(result.errorMessages);
      return result;
    }

    setItems((prev) => prev.map((r) => (r.id === id ? result.data : r)));
    setErrorMessages([]);
    return result;
  };

  const remove = async (id: string) => {
    const result = await trackedRomService.remove(id);

    if (!result.isValid) {
      setErrorMessages(result.errorMessages);
      return result;
    }

    setItems((prev) => prev.filter((r) => r.id !== id));
    setErrorMessages([]);
    return result;
  };

  return { items, isLoading, errorMessages, refresh, add, update, remove };
};