import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createFinancialGoal } from "../../services/goalsApi/goalsApi";
import { GoalType } from "../../types/types";

export function useCreateGoal() {
  const queryClient = useQueryClient();
  const { mutate: createGoal, isPending: isGoalCreating } = useMutation({
    mutationFn: (goalData: GoalType) => createFinancialGoal(goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal Created Successfully");
    },
    onError: () => {
      toast.error("Error while creating goal");
    },
  });

  return { createGoal, isGoalCreating };
}
