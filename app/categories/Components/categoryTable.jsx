"use client";
import {
  PencilSquareIcon,
  TrashIcon,
  trash,
} from "@heroicons/react/24/outline";

export default function CategoryTable({
  categories,
  setOpen,
  subCategories,
  seteditValues,
  seteditCategory,
}) {
  const CategoriesMap = ({ key, category }) => {
    const parentCategory = (id) => {
      let findParent = subCategories.find((item) => {
        if (item.id === id) {
          return item.category;
        }
      });
      if (findParent) {
        return findParent.category;
      } else {
        return "";
      }
    };
    return (
      <tr key={key}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-gray-900 sm:pl-6">
          {category.category}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
          {parentCategory(category.parent)}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center  text-sm font-medium sm:pr-6 flex flex-row gap-3  justify-center items-center">
          {/* <span>
            <TrashIcon
              className="h-5 w-5 shrink-0 cursor-pointer"
              title="Delete"
            />
          </span> */}
          <span
            onClick={() => {
              seteditValues({
                id: category.id,
                parent: category.parent,
                category: category.category,
              });
              seteditCategory(true);
            }}
            className="hover:text-[#4f46e5]"
          >
            <PencilSquareIcon
              className="h-5 w-5 shrink-0 cursor-pointer"
              title="Edit"
            />
          </span>
        </td>
      </tr>
    );
  };
  return (
    <div className="px-0 sm:px-6 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {/* <h1 className="text-base font-semibold leading-6 text-gray-900">
            Categories
          </h1> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setOpen(true);
            }}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 w-[33%]"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900  w-[33%]"
                    >
                      Parent Category
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900  w-[33%]"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {categories.map((category, i) => (
                    <CategoriesMap key={i} category={category} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
