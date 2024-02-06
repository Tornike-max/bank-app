import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLoan } from "../../services/loanApi/loanApi";
import toast from "react-hot-toast";
import { LoanRequestType } from "../../types/types";

export function useCreateLoan() {
  const queryClient = useQueryClient();
  const { mutate: loanRequest, isPending: isLoanPending } = useMutation({
    mutationFn: ({
      loanData,
      accountId,
      loanAmount,
    }: {
      loanData: LoanRequestType;
      accountId: string;
      loanAmount: number;
    }) => createLoan(loanData, accountId, loanAmount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loan"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["acc"] });

      toast.success("Loan Excepted By Oz-Bank");
    },
    onError: () => {
      toast.error("Loan Request Rejected");
    },
  });

  return { loanRequest, isLoanPending };
}
