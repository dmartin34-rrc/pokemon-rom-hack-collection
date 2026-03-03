import { useSyncExternalStore } from "react";
import type Rom from "../../types/Rom";
import { sharedPageStateRepository } from "./sharedPageState.repository";
import { sharedPageStateService } from "../../services/sharedPageState.service";

export function useSharedPageState() {
  const state = useSyncExternalStore(
    (listener) => sharedPageStateRepository.subscribe(listener),
    () => sharedPageStateRepository.getState()
  );

  return {
    state,
    actions: {
      setSharedMessage: (message: string) =>
        sharedPageStateService.setSharedMessage(message),

      setTrackedRoms: (nextTrackedRoms: Rom[]) =>
        sharedPageStateService.setTrackedRoms(nextTrackedRoms),

      addTrackedRom: (title: string) =>
        sharedPageStateService.addTrackedRom(title),

      removeTrackedRom: (title: string) =>
        sharedPageStateService.removeTrackedRom(title),

      updateProgress: (title: string, percent: number) =>
        sharedPageStateService.updateProgress(title, percent),
    },
  };
}