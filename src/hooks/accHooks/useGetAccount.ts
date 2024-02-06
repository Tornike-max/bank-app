import { useQuery } from "@tanstack/react-query";
import { getNotCurUser } from "../../services/accountAuth/accApi";

export function useGetAccount(userId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["acc", userId],
    queryFn: () => getNotCurUser(userId),
  });

  return { data, isPending };
}
