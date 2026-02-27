// helpers
import { getTotalPages } from './helpers/pages';
// components
import Button from '../ui/Button';

type PaginationProps = {
  page: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalItems,
  perPage,
  onPageChange,
}): React.JSX.Element => {
  const totalPages = getTotalPages(totalItems, perPage);

  return (
    <div className="flex items-center gap-2 mt-6">
      <Button
        className="border border-slate-300 rounded px-3 py-1 disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </Button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        className="border border-slate-300 rounded px-3 py-1 disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
