import cardData from '../../data/cardData.json';
import Card from './card';

const CardList = ({
  cards = cardData,
  favorites = [],
  onUpdateFavorites,
  sharedMessage,
  setSharedMessage
}: any) => {
  return (
    <>
      <div className="mb-4">
        <p>
          You are feeling: <strong>{sharedMessage || "not sure yet"}</strong>
        </p>

        <label>
          How are you feeling today?
          <input
            type="text"
            value={sharedMessage}
            onChange={(e) => setSharedMessage(e.target.value)}
            className="ml-2 border px-2 py-1"
            placeholder="Happy, excited, tired..."
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {cards.map((c: any) => {
          return (
            <Card
              card={c}
              key={c.title}
              isFavorite={favorites.includes(c.title)}
              onUpdateFavorites={onUpdateFavorites}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardList;
