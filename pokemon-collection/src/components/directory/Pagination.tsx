const Pagination = ({ page, totalPages, onPageChange }: any) => {
  return (
    <div className="flex items-center gap-2 mt-6">
      <button
        className="border border-slate-300 rounded px-3 py-1 disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        className="border border-slate-300 rounded px-3 py-1 disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
