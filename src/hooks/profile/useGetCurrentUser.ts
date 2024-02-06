import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profileApi/profileApi";

export function useGetCurrentUser() {
  const { data, isPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getProfile(),
  });

  return { data, isPending };
}
