const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center py-4">
      <button
        className="inline-block px-4 py-2 text-sm font-medium disabled:bg-gray-100 disabled:dark:bg-gray-950 text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800 rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span className="text-gray-700 dark:text-gray-200">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="inline-block px-4 py-2 text-sm font-medium disabled:bg-gray-100 disabled:dark:bg-gray-950 text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800 rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
