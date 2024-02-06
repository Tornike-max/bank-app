import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payLoan } from "../../services/loanApi/loanApi";
import toast from "react-hot-toast";

export function usePayLoan() {
  const queryClient = useQueryClient();
  const { mutate: pay, isPending: isPaying } = useMutation({
    mutationFn: ({
      documentId,
      accountId,
      loanValue,
      loanAmount,
      loanPercentage,
      leftToPay,
      currentBalance,
      currentOutcome,
      settingsLoanPercentage,
    }: {
      documentId: string;
      accountId: string;
      loanValue: number;
      loanAmount: number;
      loanPercentage: number;
      leftToPay: number;
      currentBalance: number;
      currentOutcome: number;
      settingsLoanPercentage: number;
    }) =>
      payLoan(
        documentId,
        accountId,
        loanValue,
        loanAmount,
        loanPercentage,
        leftToPay,
        currentBalance,
        currentOutcome,
        settingsLoanPercentage
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loan"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["acc"] });

      toast.success("Payed successfully");
    },
    onError: () => {
      toast.error("Error while paying your bill");
    },
  });

  return { pay, isPaying };
}
