// types
import type Rom from '../../../../../../shared/types/Rom';

export type SharedPageState = {
  sharedMessage: string;
  trackedRoms: Rom[];
};

type Listener = () => void;

class SharedPageStateRepository {
  private state: SharedPageState = {
    sharedMessage: '',
    trackedRoms: [],
  };

  private listeners = new Set<Listener>();

  getState(): SharedPageState {
    return this.state;
  }

  setState(next: SharedPageState) {
    this.state = next;
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const sharedPageStateRepository = new SharedPageStateRepository();
