# Architecture Notes (Hook-Service-Repository)

## Hook: `useSharedPageState`

### What does this hook do?

`useSharedPageState` provides access to shared cross-page state (ie. shared message, tracked ROMs, favorites). It allows multiple pages (ie. Favorites, Progress Tracker, Layout) to read and update shared application state without prop drilling.

The hook exposes:

- `state`
- `actions`

State contains the full shared application state, while actions provide controlled mutation methods.

---

### How is separation of concerns addressed to decide what logic to include?

- The hook subscribes to state changes using `useSyncExternalStore`.
- It does not implement business rules.
- It delegates all mutation logic to `sharedPageStateService`.
- It does not store data directly.

This ensures UI logic remains separate from business logic and storage.

---

### Where is this implementation made use of in the project and how?

**`src/components/sharedPageState/SharedMessageBarContainer.tsx`**  
Reads and updates the shared message.

**`src/pages/ProgressTrackerPage.tsx`**  
Reads tracked ROMs and invokes:

- `addTrackedRom`
- `removeTrackedRom`
- `updateProgress`

---

## Service: `sharedPageStateService`

### What does this service do?

Handles business logic for shared state mutations:

- Prevents duplicate ROMs.
- Trims invalid titles.
- Clamps progress between 0–100.
- Updates shared message safely.

---

### How is separation of concerns addressed?

- Does not render UI.
- Does not manage subscriptions.
- Does not store state directly.

It reads current state from the repository and writes updated state back.

---

### Where is this implementation used?

Called exclusively by `useSharedPageState` hook.

---

## Repository: `sharedPageStateRepository`

### What does this repository do?

Handles data storage for shared state:

- Holds in-memory `SharedPageState`
- Provides `getState`
- Provides `setState`
- Provides `subscribe`

---

### How is separation of concerns addressed?

- No validation logic.
- No business rules.
- Only storage and retrieval.

This ensures future changes (localStorage or backend) would only require repository modification.