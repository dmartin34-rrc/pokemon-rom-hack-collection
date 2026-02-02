// data
import cardData from '../../data/cardData.json';
// components
import FilterForm from './FilterForm';
import CardListDirectory from './CardListDirectory';

const RomDirectory = () => {
  return (
    <>
      <div>
        <FilterForm />
      </div>

      <div>
        {cardData.map((card) => {
          return <CardListDirectory title={card.title || ''} />;
        })}
      </div>
    </>
  );
};

export default RomDirectory;
