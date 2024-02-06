import { useQuery } from "@tanstack/react-query";
import { getAllTransactionsOfCurUser } from "../../services/transactionApi/transactionApi";
import { useSearchParams } from "react-router-dom";

export function useGetAllTransactions(userId: string) {
  const [searchParams] = useSearchParams();
  const values = searchParams.get("filterByRange") || 1000;
  const filterResult = searchParams.get("filterByDate") || "today";

  const { data: allTransactions, isPending } = useQuery({
    queryKey: ["transaction", "all", userId, values, filterResult],
    queryFn: () =>
      getAllTransactionsOfCurUser(userId, String(values), filterResult),
  });

  return { allTransactions, isPending };
}
