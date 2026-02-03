
// types
import type CardType from '../../types/Card';
// components
import CardTitle from './helpers/CardTitle';
import CardImage from './helpers/CardImage';
import CardDescription from './helpers/CardDescription';
import CardTag from './helpers/CardTag';
import { FavoriteButton } from '../common/FavoriteButton';

const Card = (
  {
    card,
    isFavorite = false,
    onUpdateFavorites
  }
  : {
    card: CardType,
    isFavorite?: boolean,
    onUpdateFavorites?: (title: string) => void
  }
) => {
  if (!card.title) return null;

  return (
    <>
      <div className="w-[500px]">
        <div className="flex justify-between items-center">
          <CardTitle title={card.title} />
          </div>

        <div className="relative">
          {onUpdateFavorites && (
            <div className="absolute top-3 right-3 z-10">
              <FavoriteButton
                isFavorite={isFavorite}
                onClick={() => onUpdateFavorites(card.title!)}
              />
            </div>
          )}
          <CardImage img={card.img} title={card.title} />
          <CardTag tags={card.tags} />
        </div>

        <CardDescription description={card.description} />
      </div>
    </>
  );
};

export default Card;
