// types
import type CardType from '../../../../../shared/types/CardType';
// components
import FavoriteButton from '../common/FavoriteButton';

type CardProps = {
  card: CardType;
  isFavorite?: boolean;
  onUpdateFavorites?: (romId: number) => void;
};

const Card: React.FC<CardProps> = ({
  card,
  isFavorite,
  onUpdateFavorites,
}): React.JSX.Element => {
  return (
    <>
      <div className="w-[500px]">
        <div className="flex justify-between items-center">
          <h3 className="rom-title">
            <a>{card.title}</a>
          </h3>
        </div>

        <div className="group h-[280px] w-[500px] [perspective:1000px]">
          <div className="relative h-full w-full transition-transform duration-[800ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[15px] [backface-visibility:hidden]">
              {onUpdateFavorites && (
                <div className="absolute top-3 right-3 z-10">
                  <FavoriteButton
                    isFavorite={isFavorite ?? false}
                    onClick={() => onUpdateFavorites(card.id!)}
                  />
                </div>
              )}

              <img
                className="h-full w-full object-cover rounded-[15px]"
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

            <div className="absolute inset-0 flex h-full w-full flex-col justify-center overflow-hidden rounded-[15px] bg-slate-600 p-4 text-left text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="line-clamp-[14] text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
