import type Rom from "../types/Rom";
import { sharedPageStateRepository } from "../components/sharedPageState/sharedPageState.repository";

class SharedPageStateService {
  setSharedMessage(message: string) {
    const state = sharedPageStateRepository.getState();
    sharedPageStateRepository.setState({ ...state, sharedMessage: message });
  }

  setTrackedRoms(nextTrackedRoms: Rom[]) {
    const state = sharedPageStateRepository.getState();
    sharedPageStateRepository.setState({ ...state, trackedRoms: nextTrackedRoms });
  }

  addTrackedRom(title: string) {
    const state = sharedPageStateRepository.getState();

    const cleanedTitle = title.trim();
    if (!cleanedTitle) return;

    const exists = state.trackedRoms.some((r) => (r.title ?? "").trim() === cleanedTitle);
    if (exists) return;

    const newRom: Rom = {
      // CardType fields: at minimum we know "title" exists because you use it everywhere
      title: cleanedTitle,
      percentComplete: 0,
    };

    sharedPageStateRepository.setState({
      ...state,
      trackedRoms: [...state.trackedRoms, newRom],
    });
  }

  removeTrackedRom(title: string) {
    const state = sharedPageStateRepository.getState();

    sharedPageStateRepository.setState({
      ...state,
      trackedRoms: state.trackedRoms.filter((r) => r.title !== title),
    });
  }

  updateProgress(title: string, percent: number) {
    const state = sharedPageStateRepository.getState();
    const clamped = Math.max(0, Math.min(100, percent));

    sharedPageStateRepository.setState({
      ...state,
      trackedRoms: state.trackedRoms.map((r) =>
        r.title === title ? { ...r, percentComplete: clamped } : r
      ),
    });
  }
}

export const sharedPageStateService = new SharedPageStateService();