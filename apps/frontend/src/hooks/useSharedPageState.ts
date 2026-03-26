import { useSyncExternalStore } from 'react';
import { sharedPageStateRepository } from '../../../backend/src/api/v1/repositories/sharedPageStateRepo';
import { sharedPageStateService } from '../../../backend/src/api/v1/services/sharedPageStateService';
import type Rom from '../../../../shared/types/Rom';

/**
 * Return value of the {@link useSharedPageState} hook.
 *
 * @type {UseSharedPageStateReturn}
 *
 * @property {ReturnType<typeof sharedPageStateRepository.getState>} state
 * The full shared application state.
 *
 * @property {object} actions
 * Collection of functions used to update shared state.
 *
 * @property {(message: string) => void} actions.setSharedMessage
 * Updates the shared message.
 *
 * @property {(roms: Rom[]) => void} actions.setTrackedRoms
 * Replaces the tracked ROM list.
 *
 * @property {(title: string) => void} actions.addTrackedRom
 * Adds a ROM to tracking.
 *
 * @property {(title: string) => void} actions.removeTrackedRom
 * Removes a tracked ROM.
 *
 * @property {(title: string, percent: number) => void} actions.updateProgress
 * Updates a ROM’s percentComplete (0–100).
 *
 * @example
 * const { state, actions } = useSharedPageState();
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
 * Handles shared cross-page state and delegates all updates
 * to the service layer.
 *
 * Subscribes to the repository using useSyncExternalStore
 * so that all components stay in sync when shared state changes.
 *
 * @returns {UseSharedPageStateReturn}
 *
 * @example
 * const { state, actions } = useSharedPageState();
 * actions.setSharedMessage("Ready");
 */
export function useSharedPageState(): UseSharedPageStateReturn {
  const state = useSyncExternalStore(
    (listener) => sharedPageStateRepository.subscribe(listener),
    () => sharedPageStateRepository.getState(),
  );

  // Wrap service calls so the hook exposes UI-friendly signatures
  // while the service can stay "pure" (accepting state in, returning new state out).
  const setSharedMessage = (message: string) => {
    sharedPageStateRepository.setState(
      sharedPageStateService.setSharedMessage(state, message),
    );
  };

  const setTrackedRoms = (roms: Rom[]) => {
    sharedPageStateRepository.setState(
      sharedPageStateService.setTrackedRoms(state, roms),
    );
  };

  const addTrackedRom = (title: string) => {
    sharedPageStateRepository.setState(
      sharedPageStateService.addTrackedRom(state, title),
    );
  };

  const removeTrackedRom = (title: string) => {
    sharedPageStateRepository.setState(
      sharedPageStateService.removeTrackedRom(state, title),
    );
  };

  const updateProgress = (title: string, percent: number) => {
    sharedPageStateRepository.setState(
      sharedPageStateService.updateProgress(state, title, percent),
    );
  };

  return {
    state,
    actions: {
      setSharedMessage,
      setTrackedRoms,
      addTrackedRom,
      removeTrackedRom,
      updateProgress,
    },
  };
}
