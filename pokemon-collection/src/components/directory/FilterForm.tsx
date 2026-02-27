// types
import type Filter from '../../types/Filter';
// components
import Form from '../form/Form';
import Input from '../ui/Input';

type FilterFormProps = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  yearMinimum: number;
  yearMaximum: number;
};

const FilterForm: React.FC<FilterFormProps> = ({
  filter,
  setFilter,
  yearMinimum,
  yearMaximum,
}): React.JSX.Element => {
  const updateFilter = (part: Partial<Filter>) => {
    setFilter((prev: any) => ({ ...prev, ...part }));
  };

  return (
    <Form className="flex flex-wrap gap-4 items-end mb-6">
      <Input
        type="text"
        className="border border-slate-300 rounded px-2 py-1 min-w-[160px]"
        placeholder="PokeSouls"
        value={filter.title}
        onChange={(e) => updateFilter({ title: e.target.value })}
        labelClassName="flex flex-col gap-1"
        actions={<span className="text-sm font-medium">Title</span>}
      />

      <Input
        type="text"
        className="border border-slate-300 rounded px-2 py-1 min-w-[160px]"
        placeholder="X, Red, Beta"
        value={filter.tags}
        onChange={(e) => updateFilter({ tags: e.target.value })}
        labelClassName="flex flex-col gap-1"
        actions={<span className="text-sm font-medium">Tags</span>}
      />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Year</span>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            className="border border-slate-300 rounded px-2 py-1 w-20"
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

          <Input
            type="number"
            className="border border-slate-300 rounded px-2 py-1 w-20"
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

      <Input
        type="checkbox"
        checked={filter.filterMultiplayer == true}
        onChange={(e) =>
          updateFilter({
            filterMultiplayer: e.target.checked ? true : null,
          })
        }
        labelClassName="flex items-center gap-2 cursor-pointer"
        actions={<span className="text-sm">Multiplayer</span>}
      />

      <Input
        type="checkbox"
        checked={filter.filterCompleted == true}
        onChange={(e) =>
          updateFilter({
            filterCompleted: e.target.checked ? true : null,
          })
        }
        labelClassName="flex items-center gap-2 cursor-pointer"
        actions={<span className="text-sm">Completed</span>}
      />
    </Form>
  );
};

export default FilterForm;
