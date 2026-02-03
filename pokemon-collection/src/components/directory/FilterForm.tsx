const FilterForm = ({ filter, setFilter, yearMinimum, yearMaximum }: any) => {
  const updateFilter = (part: any) => {
    setFilter((prev: any) => ({ ...prev, ...part }));
  };

  return (
    <form className="flex flex-wrap gap-4 items-end mb-6">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Title</span>

        <input
          className="border border-slate-300 rounded px-2 py-1 min-w-[160px]"
          type="text"
          placeholder="PokeSouls"
          value={filter.title}
          onChange={(e) => updateFilter({ title: e.target.value })}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Tags</span>

        <input
          className="border border-slate-300 rounded px-2 py-1 min-w-[160px]"
          type="text"
          placeholder="X, Red, Beta"
          value={filter.tags}
          onChange={(e) => updateFilter({ tags: e.target.value })}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Year</span>

        <div className="flex items-center gap-2">
          <input
            className="border border-slate-300 rounded px-2 py-1 w-20"
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

          <span>to</span>

          <input
            className="border border-slate-300 rounded px-2 py-1 w-20"
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

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={filter.filterMultiplayer == true}
          onChange={(e) =>
            updateFilter({
              filterMultiplayer: e.target.checked ? true : null,
            })
          }
        />

        <span className="text-sm">Multiplayer</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={filter.filterCompleted == true}
          onChange={(e) =>
            updateFilter({
              filterCompleted: e.target.checked ? true : null,
            })
          }
        />

        <span className="text-sm">Completed</span>
      </label>
    </form>
  );
};

export default FilterForm;
