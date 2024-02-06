import { useQuery } from "@tanstack/react-query";
import { getCurrentUserTransactions } from "../../services/transactionApi/transactionApi";

export function useGetCurrentTransactions(userId: string) {
  const { data: transactions, isPending } = useQuery({
    queryKey: ["transaction"],
    queryFn: () => getCurrentUserTransactions(userId),
  });

  return { transactions, isPending };
}
