const FilterForm = ({ filter, setFilter, yearMinimum, yearMaximum }: any) => {
  const updateFilter = (part: any) => {
    setFilter((prev: any) => ({ ...prev, ...part }));
  };

  return (
    <form>
      <label>
        <span>Title</span>
        <input
          type="text"
          placeholder="PokeSouls"
          value={filter.title}
          onChange={(e) => updateFilter({ title: e.target.value })}
        />
      </label>
      <label>
        <span>Tags</span>
        <input
          type="text"
          placeholder="X, Red, Beta"
          value={filter.tags}
          onChange={(e) => updateFilter({ tags: e.target.value })}
        />
      </label>
      <label>
        <span>Year</span>
        <div>
          <input
            type="number"
            min={yearMinimum}
            max={yearMaximum}
            value={filter.yearMinimum}
            onChange={(e) =>
              updateFilter({
                yearMinimum: Number(e.target.value) || yearMinimum,
              })
            }
          />
          <span> to </span>
          <input
            type="number"
            min={yearMinimum}
            max={yearMaximum}
            value={filter.yearMaximum}
            onChange={(e) =>
              updateFilter({
                yearMaximum: Number(e.target.value) || yearMaximum,
              })
            }
          />
        </div>
      </label>
      <label>
        <input
          type="checkbox"
          checked={filter.filterMultiplayer == true}
          onChange={(e) =>
            updateFilter({
              filterMultiplayer: e.target.checked ? true : null,
            })
          }
        />
        <span>Multiplayer</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={filter.filterCompleted == true}
          onChange={(e) =>
            updateFilter({
              filterCompleted: e.target.checked ? true : null,
            })
          }
        />
        <span>Completed</span>
      </label>
    </form>
  );
};

export default FilterForm;
