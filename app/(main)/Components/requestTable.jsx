export default function RequestTable({ requests }) {
  const generatedDate = (date) => {
    return new Date(date);
  };
  return (
    <div className=" mt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Requests
          </h1>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Creation Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Generated Image
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {requests.map((request, i) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            className="h-11 w-11 rounded-full"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            Lindsay Walton
                          </div>
                          <div className="mt-1 text-gray-500">
                            Front-end Developer
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {request.created_at.slice(0, 10)}
                      </div>
                      {/* <div className="mt-1 text-gray-500">
                        {request.department}
                      </div> */}
                    </td>

                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {request.status === 0
                        ? "queued"
                        : request.status === 1
                        ? "processing"
                        : request.status === 2
                        ? "completed"
                        : request.status === 3
                        ? "failed"
                        : ""}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                      {request.status === 2 ? (
                        <button
                          onClick={() => {
                            if (request.status === 2) {
                              let url = request.output[0];
                              window.open(url, "_blank");
                            }
                          }}
                          className={`${
                            request.status === 2
                              ? "bg-indigo-700 cursor-pointer"
                              : "bg-indigo-500 cursor-default"
                          } text-[white] hover:bg-indigo-500 rounded-[8px] p-[7px_10px] `}
                          rel="noreferrer"
                        >
                          open
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
