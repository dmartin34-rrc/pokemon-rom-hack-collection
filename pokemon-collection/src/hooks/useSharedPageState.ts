import { useSyncExternalStore } from "react";
import { sharedPageStateRepository } from "../repositories/sharedPageState.repository";
import { sharedPageStateService } from "../services/sharedPageState.service";
import type Rom from "../types/Rom";

/**
 * Return value of the {@link useSharedPageState} hook.
 *
 * @type {UseSharedPageStateReturn}
 *
 * @property {SharedPageState} state - The full shared application state.
 * @property {object} actions - State mutation methods exposed by the service layer.
 * @property {(message: string) => void} actions.setSharedMessage - Updates the shared message.
 * @property {(roms: Rom[]) => void} actions.setTrackedRoms - Replaces the tracked ROMs array.
 * @property {(title: string) => void} actions.addTrackedRom - Adds a new ROM to tracking.
 * @property {(title: string) => void} actions.removeTrackedRom - Removes a tracked ROM.
 * @property {(title: string, percent: number) => void} actions.updateProgress - Updates percentComplete for a tracked ROM (0-100).
 *
 * @example
 * const { state, actions } = useSharedPageState();
 * actions.setSharedMessage("Excited");
 */
type UseSharedPageStateReturn = {
  state: ReturnType<typeof sharedPageStateRepository.getState>;
  actions: {
    setSharedMessage: (message: string) => void;
    setTrackedRoms: (roms: Rom[]) => void;
    addTrackedRom: (title: string) => void;
    removeTrackedRom: (title: string) => void;
    updateProgress: (title: string, percent: number) => void;
  };
};

/**
 * Provides access to shared cross-page state using a
 * hook => service => repository architecture.
 *
 * This hook subscribes to the sharedPageStateRepository using
 * React's useSyncExternalStore to ensure consistent updates
 * across all components that consume shared state.
 *
 * State mutations are delegated to the service layer,
 * preventing components from directly modifying repository state.
 *
 * This eliminates prop drilling between pages and centralizes
 * business logic related to shared application state.
 *
 * @returns {UseSharedPageStateReturn} The current shared state and available actions.
 *
 * @example
 * const { state, actions } = useSharedPageState();
 *
 * return (
 *   <>
 *     <p>{state.sharedMessage}</p>
 *     <button onClick={() => actions.setSharedMessage("Focused")}>
 *       Update
 *     </button>
 *   </>
 * );
 */
export function useSharedPageState(): UseSharedPageStateReturn {
  const state = useSyncExternalStore(
    (listener) => sharedPageStateRepository.subscribe(listener),
    () => sharedPageStateRepository.getState()
  );

  return {
    state,
    actions: {
      setSharedMessage:
        sharedPageStateService.setSharedMessage.bind(sharedPageStateService),
      setTrackedRoms:
        sharedPageStateService.setTrackedRoms.bind(sharedPageStateService),
      addTrackedRom:
        sharedPageStateService.addTrackedRom.bind(sharedPageStateService),
      removeTrackedRom:
        sharedPageStateService.removeTrackedRom.bind(sharedPageStateService),
      updateProgress:
        sharedPageStateService.updateProgress.bind(sharedPageStateService),
    },
  };
}