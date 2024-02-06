import { useQuery } from "@tanstack/react-query";
import { getLoanData } from "../../services/loanApi/loanApi";

export function useGetLoanData(documentId: string) {
  const { data: loanData, isPending: isLoanDataPending } = useQuery({
    queryKey: ["loan"],
    queryFn: () => getLoanData(documentId),
  });

  return { loanData, isLoanDataPending };
}
