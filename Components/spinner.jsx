/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/prop-types
export function Spinner2({ color }) {
  return (
    <div
      className={`inline-block  animate-spin rounded-full border-4 border-solid ${
        color === "model"
          ? "border-indigo-600 h-[30px] w-[30px]"
          : "border-current h-[20px] w-[20px]"
      } border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
