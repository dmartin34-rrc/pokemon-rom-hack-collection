// types
import type CardType from '../../../types/Card';

const CardImage = ({ img, title }: CardType) => {
  return (
    <img
      className="w-full h-full object-cover rounded-[15px]"
      src={img}
      alt={title}
    />
  );
};

export default CardImage;
