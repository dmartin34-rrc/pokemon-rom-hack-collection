// types
import type CardType from '../../../../../shared/types/CardType';
// components
import Card from './card';

/**
 * Uses the service → repository pattern.
 * The component requests card data from CardService,
 * which retrieves it via CardRepository from test data (cardData.json).
 * This prepares the app for swapping the repository to a real backend later.
 */

type CardListProps = {
  cards: CardType[];
  favoriteRomIds?: number[];
  onUpdateFavorites?: (romId: number) => void;
  readLaterWrapper?: (card: CardType) => React.ReactNode;
  dragWrapper?: (card: CardType) => React.HTMLAttributes<HTMLDivElement>;
};

const CardList: React.FC<CardListProps> = ({
  cards,
  favoriteRomIds,
  onUpdateFavorites,
  readLaterWrapper,
  dragWrapper,
}): React.JSX.Element => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {cards.map((card) => {
        const dragWrapperProps = dragWrapper ? dragWrapper(card) : {};

        return (
          <div key={card.id} {...dragWrapperProps}>
            <Card
              card={card}
              isFavorite={favoriteRomIds?.includes(card.id!)}
              onUpdateFavorites={onUpdateFavorites}
            />

            {readLaterWrapper && (
              <div className="mt-2">{readLaterWrapper(card)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
