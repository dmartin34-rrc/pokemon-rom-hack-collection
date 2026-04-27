# pokemon-rom-hack-collection

Full Stack Development Project

## Team Pokemon

- Efe Onota
- Zachary Lam
- Dean Martin

## Project General Description (user stories)

- As a user, I want to be able to download modded pokemon games, so that I can play them

- As a user, I want to be able to search through the website for specific pokemon games, so that I can easily select the game I want

- As a user, I want to be able to view a detailed description of selected pokemon games as well as guides & cheats, so that I can understand the game more and play more efficiently

## Kanban Progress

## Sprint 1

### Dean Martin

- T.1: Set up Project Git Repository
- T.6: Team Vercel Account/Management
- 1.1: High-Level Component (Header)
- 1.2: Styling (Header)

### Efe Onota

- T.3: Project Readme
- T.4: app integration
- 1.1: High-Level Component (Footer)
- 1.2: Styling (Footer)

### Zachary Lam

- T.2: Project Initialization
- T.5: App Stylesheet and Style Guide
- 1.1: High-Level Component (Card)
- 1.2: Styling (Card)

## Sprint 2

### Dean Martin

- T.4: Components that can be reused in the entire app
- O.1 : Set up CSS Framework
- O.2 : Set up Page Layout
- I.1 : Feature Page (Favourites)
- I.2 : Form Component (Search Bar)
- I.3 : Element Addition/Removal (Favorite Button)

### Efe Onota

- T.3: Shared state across pages
- I.1 : Feature Page (Progress Tracker)
- I.2 : Form Component
- I.3 : Element Addition/Removal

### Zachary Lam

- T.1 : Multi-page Navigation
- T.2: Navigation Interface(s)
- I.1 : Feature Page (Directory)
- I.2 : Form Component (Filtering)
- I.3 : Element Addition/Removal (Aside)

## Sprint 3

### Dean Martin

- T.2: Service Definitions (`romService.ts`, `favoritesService.ts`)
- I.1: Repository Definitions & Integration (`favoritesRepo.ts`)
- I.2: Test Data (`favoriteData.json`, `favoritesRepo.ts`)
- I.3: New / Refactored Components (`App.tsx` uses `useFavorites.ts`, `favoritesService.ts`, `favoritesRepo.ts` & `RomDirectoryPage.tsx` / `AddTrackedRomForm.tsx` uses `romService.ts`)
- I.4: Architectural Layout Document (`/docs/architecture-dm.md`)

### Efe Onota

- T.4: Shared-page-state Refactor (`useSharedPageState.ts`, `sharedPageStateService.ts`, `sharedPageStateRepo.ts`)
- I.1: Repository Definitions & Integration (`sharedPageStateRepo.ts`)
- I.2: Test Data (`trackedData.json`, `sharedPageStateRepo.ts`)
- I.3: New / Refactored Components (L`ayout.tsx` uses `SharedMessageBarContainer.tsx`, u`seSharedPageState.ts` & `ProgressTrackerPage.tsx` / `FavoritesPage.tsx` uses `useSharedPageState.ts`)
- I.4: Architectural Layout Document (`/docs/architecture-eo.md`)

### Zachary Lam

- T.1: Hook Definitions (`useSearchFilter`, `useItemList`)
- I.1: Repository Definitions & Integration (`itemListRepo.ts`)
- I.2: Test Data (`cardData.json`, `itemListRepo`)
- I.3: New / Refactored Components (`RomDirectoryPage.tsx` uses `useItemList.ts`, `itemListService.ts`, `itemListRepo.ts` & `Favorites.tsx` / `RomDirectoryPage.tsx` uses `useSearchFilter.ts`)
- I.4: Architectural Layout Document (`/docs/architecture-zl.md`)

## Sprint 4
### Dean Martin
- T.2: Development SQL Database
- T.4: Back-end CORS Configuration
- I.1: Back-end Resource Endpoint (favorites: `favoritesRoutes, favoritesController, favoritesService, getFavorites, toggleFavorites`)
- I.2: Resource Database Schema (model: `Favorites`)
- I.3: Front-end Repository sends requests to back-end (source: `frontend/src/apis/favoritesRepo`)
- I.4: Application State Persistence 

### Zachary Lam
- T.1: Back-end App Initialization
- I.1: Back-end Resource Endpoint (itemList: `itemListRoutes, itemListController, itemListService getItems, addItem, removeItem, clearItems`)
- I.2: Resource Database Schema (model: `ItemList`)
- I.3: Front-end Repository sends requests to back-end (source: `frontend/src/apis/itemListRepo`)
- I.4: Application State Persistence

### Efe Onota
- T.3: Prisma Installation and Client Initialization
- I.1: Back-end Resource Endpoint
- I.2: Resource Database Schema
- I.3: Front-end Repository sends requests to back-end
- I.4: Application State Persistence

## Sprint 5
### Dean Martin
- T.1: Clerk Auth Setup
- T.2: Team Vercel Account/Management
- T.4: User Login/Registration
- I.1: Custom User-Associated Data and Session Management (Favorites auth validation)
- 1.2: Project Retrospective

- ### Zachary Lam
- T.3: Backend User Management 
- I.1: Custom User-Associated Data and Session Management (read later aside in Directory page for session management, misc/extra features: Upload feature/page, card flipper feature, Multer middleware)
- 1.2: Project Retrospective
