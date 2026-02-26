// types
import type CardType from '../../types/Card';
// components
import Card from './Card';

type CardListProps = {
  cards: CardType[];
  favorites?: string[];
  onUpdateFavorites?: (title: string) => void;
  readLaterWrapper?: (card: CardType) => React.ReactNode;
  dragWrapper?: (card: CardType) => React.HTMLAttributes<HTMLDivElement>;
};

const CardList: React.FC<CardListProps> = ({
  cards,
  favorites,
  onUpdateFavorites,
  readLaterWrapper,
  dragWrapper,
}): React.JSX.Element => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {cards.map((card) => {
        const dragWrapperProps = dragWrapper ? dragWrapper(card) : {};

        return (
          <div key={card.title} {...dragWrapperProps}>
            <Card
              card={card}
              isFavorite={favorites?.includes(card.title)}
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
