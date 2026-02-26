// components
import Button from '../ui/Button';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
}) => {
  return (
    <Button
      className={`
            ml-2 text-xl leading-none transition-colors duration-200 
            ${isFavorite ? 'text-yellow-500' : 'text-yellow-500 hover:text-gray-400'}`}
      onClick={() => {
        onClick();
      }}
    >
      {isFavorite ? '★' : '☆'}
    </Button>
  );
};

export default FavoriteButton;
