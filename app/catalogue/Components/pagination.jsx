import React from "react";

const Pagination = ({ nextPage, previousPage, paginationStart, limit }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <button
        onClick={() => {
          previousPage();
        }}
        className={`${
          paginationStart - limit >= 0
            ? "bg-indigo-700 cursor-pointer"
            : "cursor-default bg-indigo-500"
        } hover:bg-indigo-500 text-[white] p-[5px_13px] rounded-[7px]`}
      >
        Prev
      </button>
      <button
        onClick={() => {
          nextPage();
        }}
        className="bg-indigo-700 hover:bg-indigo-500 text-[white] p-[5px_13px] rounded-[7px]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
