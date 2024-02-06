import { useAuth } from "../../context/useAuth";
import { useGetAllTransactions } from "../../hooks/transactionHooks/useGetAllTransactions";
import Loader from "../../ui/Loader";
import TransactionsCard from "./TransactionsCard";

export default function MyPayments() {
  const { user } = useAuth();
  const { allTransactions, isPending } = useGetAllTransactions(user?.id || "");

  if (isPending) return <Loader />;

  return (
    <div className=" max-w-[2200px] w-full mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-center text-2xl text-blue-600 font-semibold mb-4">
        My Payments
      </h1>
      <ul className="w-full flex flex-col gap-4">
        {allTransactions?.length !== 0 ? (
          allTransactions &&
          allTransactions.map((transaction) => (
            <TransactionsCard key={transaction.$id} transaction={transaction} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <span className="text-red-500 font-semibold text-lg ">
              NO DATA!
            </span>
          </div>
        )}
      </ul>
    </div>
  );
}
