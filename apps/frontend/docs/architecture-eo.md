# Architecture Notes (Hook–Service–Repository)

---

## Hook: `useSharedPageState`

### What does this hook do?

`useSharedPageState` provides access to shared cross-page state (ie. shared message and tracked ROMs).

It allows multiple pages (ie. Layout, Progress Tracker) to read and update shared application state without prop drilling.

The hook exposes:

- `state`
- `actions`

`state` contains the full shared application state.

`actions` provides controlled mutation methods for updating that state.

Currently, tracked ROMs are stored directly in shared state and include:

- `title`
- `percentComplete`

---

### How is separation of concerns addressed?

- The hook subscribes to repository updates using `useSyncExternalStore`.
- It does not implement business rules.
- It delegates all mutation logic to `sharedPageStateService`.
- It does not store or validate data directly.

This ensures:

- UI logic remains in components.
- Business logic remains in the service.
- Storage logic remains in the repository.

---

### Where is this implementation used in the project?

**`src/components/sharedPageState/SharedMessageBarContainer.tsx`**  
Reads and updates the shared message.

**`src/pages/ProgressTrackerPage.tsx`**  
Reads tracked ROMs and invokes:

- `addTrackedRom`
- `removeTrackedRom`
- `updateProgress`

The Progress Tracker page renders directly from the tracked ROM data stored in shared state.

---

## Service: `sharedPageStateService`

### What does this service do?

Handles all business logic for shared state mutations.

Responsibilities include:

- Preventing duplicate tracked ROMs
- Trimming and normalizing titles
- Clamping progress between 0–100
- Returning a new immutable `SharedPageState`

The service receives the current state and returns a new updated state.

---

### How is separation of concerns addressed?

The service:

- Does not render UI
- Does not manage subscriptions
- Does not directly modify repository state
- Does not store data

It acts as a pure business logic layer:


This makes the logic easier to test and maintain.

---

### Where is this implementation used?

Called exclusively by `useSharedPageState`.

The hook:

1. Reads current state from the repository
2. Calls the service to compute the updated state
3. Writes the new state back to the repository

---

## Repository: `sharedPageStateRepository`

### What does this repository do?

Handles in-memory storage of shared application state.

Responsibilities:

- Holds `SharedPageState`
- Provides `getState()`
- Provides `setState(nextState)`
- Provides `subscribe(listener)`

It acts as the single source of truth for shared state across pages.

---

### How is separation of concerns addressed?

The repository:

- Contains no business rules
- Performs no validation
- Does not render UI
- Only manages storage and subscriptions

This design ensures that future enhancements (ie. adding localStorage persistence or backend integration) would only require repository changes without modifying the hook or service layers.