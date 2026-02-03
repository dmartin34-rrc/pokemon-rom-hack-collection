import { useState } from "react";
// data
import cardData from "../../data/cardData.json";
// types
import type Filter from "../../types/Filter";
import type Rom from "../../types/Rom";
// helpers
import { filterRoms, getYearRange } from "./helpers/filterRoms";
import { PAGE_LIMIT, getTotalPages, getPage } from "./helpers/pages";
import { handleDragOver, handleRemoveDrop } from "./helpers/aside";
// components
import FilterForm from "./FilterForm";
import CardListDirectory from "./CardListDirectory";
import Pagination from "./Pagination";
import Aside from "./Aside";

const roms = cardData as Rom[];

type Props = {
  readLater: string[];
  setReadLater: React.Dispatch<React.SetStateAction<string[]>>;
};

const RomDirectory = ({ readLater, setReadLater }: Props) => {
  const yearRange = getYearRange(roms);

  const [filter, setFilter] = useState<Filter>({
    title: "",
    tags: "",
    yearMinimum: yearRange.min,
    yearMaximum: yearRange.max,
    filterMultiplayer: null,
    filterCompleted: null,
  });

  const filteredRoms = filterRoms(roms, filter);

  const [page, setPage] = useState<number>(1);
  const totalPages = getTotalPages(filteredRoms.length, PAGE_LIMIT);
  const pageRoms = getPage(filteredRoms, page, PAGE_LIMIT);

  return (
    <div className="flex gap-6 p-4">
      <div
        className="flex-1 min-w-0"
        onDragOver={handleDragOver}
        onDrop={handleRemoveDrop(setReadLater)}
      >
        <FilterForm
          filter={filter}
          setFilter={setFilter}
          yearMinimum={yearRange.min}
          yearMaximum={yearRange.max}
        />

        <div className="flex flex-wrap gap-6">
          {pageRoms.map((card) => {
            return (
              <CardListDirectory
                key={card.title}
                card={card}
                readLater={readLater}
                setReadLater={setReadLater}
              />
            );
          })}
        </div>

        {filteredRoms.length !== 0 ? (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(nextPage: number) =>
              setPage(Math.max(1, Math.min(totalPages, nextPage)))
            }
          />
        ) : null}
      </div>

      <Aside readLater={readLater} setReadLater={setReadLater} />
    </div>
  );
};

export default RomDirectory;
