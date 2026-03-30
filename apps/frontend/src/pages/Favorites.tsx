// data
import cardData from '../../../../shared/data/cardData.json';
// types
import type CardType from '../../../../shared/types/CardType';
// hooks
import useSearchFilter from '../hooks/useSearchFilter';
// components
import CardList from '../../src/components/card/CardList';
import SearchBar from '../layouts/header/SearchBar';

/**
 * The Favorites page uses the hook-service-repository architecture by:
 *
 * Having the useFavorites() custom hook passed down via props to access the synced list of favorite ROM titles.
 *
 * This custom hook also relies on favoritesService to handle business logic for toggling favorites and generating metadata.
 *
 * The favoritesRepo provides the saved test data so this page can just simply display the user's favorites.
 *
 * Additionally, useSearchFilter() is used as a custom hook to handle presentation logic and state for the search bar.
 */
type FavoritesProps = {
  favoriteRomIds: number[];
  onUpdateFavorites: (romId: number) => void;
};

const Favorites: React.FC<FavoritesProps> = ({
  favoriteRomIds,
  onUpdateFavorites,
}): React.JSX.Element => {
  const favoriteCards = cardData.filter(
    (card: CardType) => card.id !== undefined && favoriteRomIds.includes(card.id),
  );

  const {
    searchQuery,
    setSearchQuery,
    filteredItems: displayedCards,
  } = useSearchFilter<CardType>({
    items: favoriteCards,
    searchText: (card) => card.title ?? '',
  });

  return (
    <main className="max-w-[1100px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 font-[Oxygen]">My Favorites</h2>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search favorites..."
      />

      {favoriteRomIds.length === 0 ? (
        <p className="text-gray-500 mt-4">You have no favorites.</p>
      ) : displayedCards.length === 0 ? (
        <p className="text-gray-500 mt-4">No favorites match.</p>
      ) : (
        <CardList
          cards={displayedCards}
          favoriteRomIds={favoriteRomIds}
          onUpdateFavorites={onUpdateFavorites}
        />
      )}
    </main>
  );
};

export default Favorites;
