import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGoal } from "../../services/goalsApi/goalsApi";
import toast from "react-hot-toast";

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: ({
      documentId,
      newValue,
      remainingAmount,
    }: {
      documentId: string;
      newValue: number;
      remainingAmount: number;
    }) => updateGoal(documentId, newValue, remainingAmount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal Updated");
    },
    onError: () => {
      toast.error("Error while updating");
    },
  });

  return { update, isUpdating };
}
