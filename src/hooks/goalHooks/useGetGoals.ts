import { useQuery } from "@tanstack/react-query";
import { getGoals } from "../../services/goalsApi/goalsApi";

export function useGetGoals(userId: string) {
  const { data: goalsData, isPending: isGoalsPending } = useQuery({
    queryKey: ["goals", userId],
    queryFn: () => getGoals(userId),
  });

  return { goalsData, isGoalsPending };
}
