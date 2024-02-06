import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../services/transactionApi/transactionApi";
import { TransferType } from "../../types/types";
import toast from "react-hot-toast";

export function useMakeTransaction() {
  const queryClient = useQueryClient();
  const { mutate: makeTransfer, isPending: isTransferPending } = useMutation({
    mutationFn: (transferData: TransferType) => createTransaction(transferData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      queryClient.invalidateQueries({ queryKey: ["acc"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["loan"] });

      toast.success("Transaction created Successfully");
    },
    onError: () => {
      toast.error("Error while create Transaction");
    },
  });

  return { makeTransfer, isTransferPending };
}
