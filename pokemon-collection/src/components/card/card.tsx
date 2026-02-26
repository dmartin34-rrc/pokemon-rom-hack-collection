// types
import type CardType from '../../types/Card';
// components
import { FavoriteButton } from '../common/FavoriteButton';

type CardProps = {
  card: CardType;
  isFavorite?: boolean;
  onUpdateFavorites?: (title: string) => void;
};

const Card: React.FC<CardProps> = ({
  card,
  isFavorite,
  onUpdateFavorites,
}): React.JSX.Element => {
  isFavorite = false;

  return (
    <>
      <div className="w-[500px]">
        <div className="flex justify-between items-center">
          <h3 className="rom-title">
            <a>{card.title}</a>
          </h3>
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

          <img
            className="w-full h-full object-cover rounded-[15px]"
            src={card.img}
            alt={card.title}
          />

          <aside className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {card.tags?.map((tag, index) => (
              <a
                className="bg-slate-500 text-white px-1 py-[0.2rem] rounded-[3px] tracking-[1px] hover:bg-slate-600"
                href="#"
                key={index}
              >
                {tag}
              </a>
            ))}
          </aside>
        </div>

        <p>{card.description}</p>
      </div>
    </>
  );
};

export default Card;
