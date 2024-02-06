import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../../services/cardApi/cardApi";
import { CartType } from "../../types/types";
import toast from "react-hot-toast";

export function useCreateCard() {
  const queryClient = useQueryClient();
  const { mutate: createCardMutation, isPending: isCreating } = useMutation({
    mutationFn: (newCardData: CartType) => createCard(newCardData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
      toast.success("Your Card Created Successfully");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { createCardMutation, isCreating };
}
