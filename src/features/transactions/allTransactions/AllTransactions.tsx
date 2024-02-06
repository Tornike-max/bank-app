import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { useGetAllTransactions } from "../../../hooks/transactionHooks/useGetAllTransactions";
import Loader from "../../../ui/Loader";
import FilterByAmount from "./FilterByAmount";
import TransactionsTable from "./TransactionsTable";
import { useDebounce } from "../../../ui/useDebaunce";
import { useSearchParams } from "react-router-dom";
import FilterByDate from "./FilterByDate";

export default function AllTransactions() {
  const [value, setValue] = useState(1000);
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedValue = useDebounce(String(value), 500);

  const { user } = useAuth();
  const { allTransactions, isPending } = useGetAllTransactions(user?.id || "");

  useEffect(() => {
    searchParams.set("filterByRange", String(debouncedValue));
    setSearchParams(searchParams);
  }, [debouncedValue, searchParams, setSearchParams]);

  if (isPending) return <Loader />;

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col">
      <div className="w-full py-4">
        <FilterByAmount value={value} setValue={setValue} />
      </div>
      <div className="w-full pb-4">
        <FilterByDate />
      </div>

      <TransactionsTable transactions={allTransactions} />
    </div>
  );
}
