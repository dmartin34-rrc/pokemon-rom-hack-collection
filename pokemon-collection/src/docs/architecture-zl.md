# Architecture Notes (Hook-Service-Repository)

## Hook: `useItemList`

### What does this hook do?

`useItemList` manages a list of items (_ie. ROMs_) for a given page (_ie. RomDirectoryPage_). It handles the current `items` along with functions to either add, remove, clear, and handle drag/drop interactions for those items.

### How is separation of concerns addressed to decide what logic to include?

- The hook owns the state (via `useState`) to be used as an interface for components: `items`, `addItem`, `removeItem`, `clearItems`, and drag/drop handlers.

- Instead of deciding what is valid to add directly in the hook, it is handled by `itemListService` to check for the validity of ROMs based on their title, preventing any duplicate ROMs from being added.

- The in-memory storage and retrieval of items is handled by `itemListRepo`, which the hook is not responsible for handling.

This layering enforces UI logic in the hook, business logic in the service, and data access in the repository.

### Where is this implementation made use of in the project and how?

**`src/pages/RomDirectoryPage.tsx`**: The page calls `useItemList({ page: 'readLater' })` to get `items` and their respective functions.

It passes `items` into display components (_ie. `CardList`_), allowing `addItem`, `removeItem`, and drag handlers into the UI controls so the page can manage a list (_ie. read later ROMs_) without re‑implementing the item logic.

## Service: `itemListService`

### What does this service do?

`itemListService` handles the business logic for working with item lists (_ie. read later ROMs_). The service provides functions like `getItems`, `addItem`, `removeItem`, and `clearItems` that enforce rules such as:

- Only allowing valid ROMs given their title.
- Preventing duplicate ROMs from appearing in the same list.
- Updating and returning the new list.

### How is separation of concerns addressed to decide what logic to include?

- The hook (`useItemList`) uses the functions from the service layer and pushes the array into the state.

- The service layer does not render UI or manage state. It takes arguments in the form of `page` and `title`, where page is the current page handling the items (_ie. RomDirectory_) and title being the item (_ie. a ROM_) and returns data as a `string[]` of items (_ie. ROMs_).

- Furthermore, the service invokes `itemListRepo` to:
  - Read items for a page.
  - Persist updated lists for a given page.
  - Read all ROMs to derive valid titles.

### Where is this implementation made use of in the project and how?

**`src/hooks/useItemList.ts`**: `getItems(page)` is used to initialize the hook's state. `addItem(page, title)`, `removeItem(page, title)`, and `clearItems(page)` are invoked whenever the hook wans to mutate the list on the page that is using it. The hook simply replaces its local `items` state with whatever array the service layer returns.

## Repository: `itemListRepo`

### What does this repository do?

`itemListRepo` handles data access for item lists and ROM data by:

- Invoking `getRoms()` to return the full list of items (_ie. ROMs from `cardData.json`_).
- Keeping an in‑memory storage using `Map<string, string[]>` where item lists are keyed by page.
- Provides `getItems(page)` to a list (to read all existing items - _ie. ROMs_), `saveItems(list)` to persist data, and `clearItems(page)` to remove a list from a given page (_like RomDirectory_).

### How is separation of concerns addressed to decide what logic to include?

- The repository does not decide whether a title is allowed, it just stores and retrieves data.

- `itemListService` builds rules on top of these read/write operations, keeping rules separate from storage details.

This means that should this repo change how it's storing data (ie. from in-memory -> localStorage or backend), all the logic can still be solely handled by the repository layer, keeping it separate from the hook or service.

### Where is this implementation made use of in the project and how?

**`src/services/itemListService.ts`**: Uses `getRoms()` to retrieve only valid ROM titles. `getItems(page)` is used to retrieve the current list of items for a page (_ie. ROMs from a read later list in RomDirectory_). `saveItems({ page, items })` persists updates to the item list, while `clearItems(page)` resets the entire list for a given page. This shows that no components or hooks talk directly to the repository later, but rather instead, go through the service layer.

<br><br>

## Hook: `useSearchFilter`

### What does this hook do?

`useSearchFilter` is a custom generic hook that manages a search query and returns a filtered list of items (_ie. ROMs_). A `searchText` function is used to tell the hook what string (_ie. a ROM title_) to search for in each item.

### How is separation of concerns addressed to decide what logic to include?

- Since the hook works with any type due to being a generic, it's not necessarily tied to being used specifically for ROMs. It could be modular and scalable to be used for any other type of items (_ie. Game Guides, Player Search, Leaderboard Ranks, etc_) implemented at a later time.

- The hook holds the `searchQuery` state and computes the filtered items by running the text being searched against the query. Because the hook is modular, it can meet the needs for specific use cases in instances where a search can be achieved through a title, author, etc via `searchText`.

### Where is this implementation made use of in the project and how?

**`src/pages/RomDirectoryPage.tsx`**: Passes a list of ROMs and a function that returns `rom.title` so the user can search them by title.

**`src/pages/Favorites.tsx`**: Provides a `searchText` function to search solely for ROMs that are filtered by favorites in this respective page.

Both of these pages render input elements bound to `searchQuery` and display the filtered items from the hook.
