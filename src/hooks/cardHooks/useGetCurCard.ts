import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/useAuth";
import { getCard } from "../../services/cardApi/cardApi";

export function useGetCurCard() {
  const { user } = useAuth();
  const { data: cardData, isPending } = useQuery({
    queryKey: ["card", user?.id],
    queryFn: () => getCard(user?.id || ""),
  });

  return { cardData, isPending };
}
