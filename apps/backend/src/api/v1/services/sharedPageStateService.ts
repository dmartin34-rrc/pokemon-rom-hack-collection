import type Rom from '../../../../../../shared/types/Rom';
import type { SharedPageState } from '../repositories/sharedPageStateRepo';

const normalize = (t: string) => t.trim();

export const sharedPageStateService = {
  setSharedMessage(state: SharedPageState, message: string): SharedPageState {
    return {
      ...state,
      sharedMessage: message,
    };
  },

  setTrackedRoms(state: SharedPageState, roms: Rom[]): SharedPageState {
    return {
      ...state,
      trackedRoms: roms,
    };
  },

  addTrackedRom(state: SharedPageState, title: string): SharedPageState {
    const cleaned = normalize(title);
    if (!cleaned) return state;

    const exists = state.trackedRoms.some(
      (r) => normalize(r.title ?? '') === cleaned,
    );
    if (exists) return state;

    const newRom: Rom = {
      title: cleaned,
      percentComplete: 0,
    };

    return {
      ...state,
      trackedRoms: [...state.trackedRoms, newRom],
    };
  },

  removeTrackedRom(state: SharedPageState, title: string): SharedPageState {
    const cleaned = normalize(title);

    return {
      ...state,
      trackedRoms: state.trackedRoms.filter(
        (r) => normalize(r.title ?? '') !== cleaned,
      ),
    };
  },

  updateProgress(
    state: SharedPageState,
    title: string,
    percent: number,
  ): SharedPageState {
    const cleaned = normalize(title);
    const clamped = Math.max(0, Math.min(100, percent));

    return {
      ...state,
      trackedRoms: state.trackedRoms.map((r) =>
        normalize(r.title ?? '') === cleaned
          ? { ...r, percentComplete: clamped }
          : r,
      ),
    };
  },
};
