import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCreditCard } from "../../services/cardApi/cardApi";
import toast from "react-hot-toast";

export function useDeleteCard() {
  const queryClient = useQueryClient();
  const { mutate: deleteCard, isPending: isCardDeleting } = useMutation({
    mutationFn: (documentId: string) => deleteCreditCard(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
      toast.success("Your Card Successfully deleted from our database");
    },
    onError: () => {
      toast.error("ERROR WHILE DELETING");
    },
  });
  return { deleteCard, isCardDeleting };
}
