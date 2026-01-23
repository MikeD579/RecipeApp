
export const Loading = () => {
  return (
    <div className="relative w-24 flex flex-col items-end justify-center space-y-4">
      <div className="loading-spinner absolute left-0 top-1"></div>
      <div className="text-gray-800 font-semibold">Loading...</div>
    </div>
  );
};