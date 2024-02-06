import { useQuery } from "@tanstack/react-query";
import { getUserAcc } from "../../services/accountAuth/accApi";

export function useGetCurrentAcc() {
  const { data: currentAcc, isPending: isCurrentAccPending } = useQuery({
    queryKey: ["acc"],
    queryFn: getUserAcc,
  });

  return { currentAcc, isCurrentAccPending };
}
