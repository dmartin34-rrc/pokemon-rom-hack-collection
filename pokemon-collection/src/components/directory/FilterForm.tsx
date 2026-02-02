const FilterForm = () => {
  return (
    <form>
      <label>
        <span>Title</span>
        <input type="text" placeholder="PokeSouls" />
      </label>
      <label>
        <span>Tags</span>
        <input type="text" placeholder="X, Red, Beta" />
      </label>
      <label>
        <span>Year</span>
        <div>
          <input type="number" />
          <span>to</span>
          <input type="number" />
        </div>
      </label>
      <label>
        <input type="checkbox" />
        <span>Multiplayer</span>
      </label>
      <label>
        <input type="checkbox" />
        <span>Completed</span>
      </label>
    </form>
  );
};

export default FilterForm;
