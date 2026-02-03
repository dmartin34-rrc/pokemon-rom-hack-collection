export function FavoriteButton(
    {
        isFavorite,
        onClick
    }
    : {
        isFavorite: boolean,
        onClick: () => void
    }
) {
    return (
        <button
            onClick={() => {
                onClick();
            }}
            className={`
            ml-2 text-xl leading-none transition-colors duration-200 
            ${isFavorite ? 'text-yellow-500' : 'text-yellow-500 hover:text-gray-400'}`}
        >
            {isFavorite ? '★': '☆'}
        </button>
    );
};