# Dean's Architecture Notes (Hook-Service-Repository)

## Hook: `useFavorites`

### What does this hook do?

`useFavorites` manages a list of favorite ROMs for the application. It handles the current `favorites` state along with functions to retrieve them or toggle their status via `toggleFavorite`, and provides a mapped array of `favoriteTitles` for easy UI rendering.

### How is separation of concerns addressed to decide what logic to include?

- The hook owns the state (via `useState`) to be used as an interface for components: `favorites`, `favoriteTitles`, and `toggleFavorite`.

- Instead of deciding how a favorite is validated or formatted directly in the hook, it is handled by `favoritesService` to check for duplicates and generate metadata (unique IDs and ISO timestamps).

- The in-memory storage and retrieval of items is handled by `favoritesRepo`, which the hook is not responsible for handling.

I ensured that only Presentation logic is in the hook, keeping business logic in the service, and data access in the repository.

### Where is this implementation made use of in the project and how?

**`src/App.tsx`**: The top-level component calls `useFavorites()` to get `favoriteTitles` and `toggleFavorite`. It passes these down as props to child routes (CardList, Favorites) so the application can manage a synchronized list without re-implementing the favorite logic on every page.

**`src/pages/Favorites.tsx`**: Uses the `favorites` data provided by the hook (passed via props from App) to filter the full list of ROMs down to just the items the user has favorited.

<br><br>

## Service: `favoritesService`

### What does this service do?

`favoritesService` handles the business logic for the favorites list. The service provides functions like `getAllFavorites` and `toggleFavorite` that enforce rules such as:

- Checking if a favorite already exists given its title and user ID.
- Removing the favorite if it's already in the repository.
- Creating a new `Favorite` object with a unique `id` and ISO `timeAdded` timestamp if it's new.

### How is separation of concerns addressed to decide what logic to include?

- The hook (`useFavorites`) calls the service functions and saves the resulting array into state.

- I ensured this service layer doesn't render any UI or manage state. It takes the `title` and `userId` and gives back a `Favorite[]`.

- The service is also the only thing allowed to talk to `favoritesRepo` to read, add, or delete favorites.

### Where is this implementation made use of in the project and how?

**`src/hooks/useFavorites.ts`**: `getAllFavorites()` is used to initialize the hook's state. `toggleFavorite(title)` is called whenever the user clicks a star. The hook simply replaces its local `favorites` state with a new array the service layer returns.

<br><br>

## Repository: `favoritesRepo`

### What does this repository do?

`favoritesRepo` handles data access for the favorites list by:

- Keeping an in-memory storage using an array of `Favorite` objects (`mockFavoritesDB`).
- Providing `getFavorites()` to read all existing favorites.
- Providing `addFavorite(newFav)` to save new data.
- Providing `removeFavorite(id)` to delete a favorite from the list.

### How is separation of concerns addressed to decide what logic to include?

- The repository is made only for data access (storing and retrieving data).

- `favoritesService` handles business rules, keeping rules separate from how the data is stored.

When we change to using localStorage or a database, all changes will only happen in the repository layer, keeping it separate from the hook or service.

### Where is this implementation made use of in the project and how?

**`src/services/favoritesService.ts`**: Uses `getFavorites()` to retrieve the current list to check for duplicates. `addFavorite(newFav)` saves new favorites to the array, while `removeFavorite(id)` deletes an existing favorite. This shows that no components or hooks talk directly to the repository layer, they always go through the service layer.

<br><br>

## Service: `romService`

### What does this service do?

`romService` handles the business logic for working with ROM data. The service provides functions like `filterRoms`, `getPage`, `checkIsDuplicate`, and `addRom` that enforce rules such as:

- Filtering ROMs by tags, multiplayer status, or year ranges.
- Calculating pagination logic based on total items.
- Preventing duplicate ROMs from being added to a user's tracker.

### How is separation of concerns addressed to decide what logic to include?

- The service layer takes arrays of `Rom` objects and criteria (like `Filter` or page numbers) and returns calculated data.

- By keeping this logic in the service, the UI components don't have to handle mathematical and logical rules, keeping them strictly focused on presentation.

### Where is this implementation made use of in the project and how?

**`src/pages/RomDirectoryPage.tsx`**: Uses `filterRoms(roms, filter)` and `getPage(searchedRoms, page, PER_PAGE)` to handle the search, category filtering, and pagination of the main directory list.

**`src/components/tracker/AddTrackedRomForm.tsx`**: Uses `checkIsDuplicate(trackedRoms, cleanedTitle)` to validate user input and `addRom(trackedRoms, cleanedTitle)` to create a new tracked ROM object.
