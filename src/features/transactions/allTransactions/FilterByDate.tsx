import { useSearchParams } from "react-router-dom";

export default function FilterByDate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterResult = searchParams.get("filterByDate") || "today";
  function handleFilter(value: string) {
    searchParams.set("filterByDate", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-2">
      <button
        className={`max-w-[100px] w-full text-xs sm:text-sm py-3 sm:py-2 px-3 rounded-md bg-none hover:bg-primary-500 hover:text-stone-100 hover:shadow-2xl border-2 border-stone-200 hover:border-primary-600 duration-150 transition-all ${
          filterResult === "today" && "bg-primary-500 text-stone-100 shadow-2xl"
        }`}
        onClick={() => handleFilter("today")}
      >
        Today
      </button>
      <button
        className={`max-w-[100px] w-full text-xs sm:text-sm py-3 sm:py-2 px-3 rounded-md bg-none hover:bg-primary-500 hover:text-stone-100 hover:shadow-2xl  border-2 border-stone-200 hover:border-primary-600 duration-150 transition-all ${
          filterResult === "week" && "bg-primary-500 text-stone-100 shadow-2xl"
        }`}
        onClick={() => handleFilter("week")}
      >
        Last Week
      </button>
      <button
        className={`max-w-[100px] w-full text-xs sm:text-sm py-3 sm:py-2 px-3 rounded-md bg-none hover:bg-primary-500 hover:text-stone-100 hover:shadow-2xl border-2 border-stone-200 hover:border-primary-600 duration-150 transition-all ${
          filterResult === "month" && "bg-primary-500 text-stone-100 shadow-2xl"
        }`}
        onClick={() => handleFilter("month")}
      >
        Last Month
      </button>
      <button
        className={`max-w-[100px] w-full text-xs sm:text-sm py-3 sm:py-2 px-3 rounded-md bg-none hover:bg-primary-500 hover:text-stone-100 hover:shadow-2xl  border-2 border-stone-200 hover:border-primary-600 duration-150 transition-all ${
          filterResult === "year" && "bg-primary-500 text-stone-100 shadow-2xl"
        }`}
        onClick={() => handleFilter("year")}
      >
        Last Year
      </button>
    </div>
  );
}
