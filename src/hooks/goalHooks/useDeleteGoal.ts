import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGoalApi } from "../../services/goalsApi/goalsApi";
import toast from "react-hot-toast";

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  const { mutate, isPending: isGoalDeleting } = useMutation({
    mutationFn: (documentId: string) => deleteGoalApi(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal Deleted Successfully");
    },
    onError: () => {
      toast.error("Error while deleting");
    },
  });

  return { mutate, isGoalDeleting };
}
