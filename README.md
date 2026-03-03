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

## Sprint 3

### Dean Martin

- T.2: Service Definitions (`romService.ts`, `favoritesService.ts`)
- I.1: Repository Definitions & Integration (`favoritesRepo.ts`)
- I.2: Test Data (`favouriteData.json`, `favouritesRepo.ts`)
- I.3: New / Refactored Components (`App.tsx` uses `useFavorites.ts` -> `favoritesService.ts` -> `favoritesRepo.ts`)
- I.4: Architectural Layout Document (`/docs/architecture-dm.md`)

### Efe Onota

- T.4: Shared-page-state Refactor
- I.1: Repository Definitions & Integration
- I.2: Test Data
- I.3: New / Refactored Components
- I.4: Architectural Layout Document

### Zachary Lam

- T.1: Hook Definitions (`useSearchFilter.ts`, `useItemList.ts`)
- I.1: Repository Definitions & Integration (`itemListRepo.ts`)
- I.2: Test Data (`cardData.json`, `itemListRepo`)
- I.3: New / Refactored Components (`RomDirectoryPage.tsx` uses `useItemList.ts`, `itemListService.ts`, `itemListRepo.ts` & `Favorites.tsx` / `RomDirectoryPage.tsx` uses `useSearchFilter.ts`)
- I.4: Architectural Layout Document (`/docs/architecture-zl.md`)
