import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardInfo } from "../../services/cardApi/cardApi";
import toast from "react-hot-toast";

export function useUpdateCard() {
  const queryClient = useQueryClient();
  const { mutateAsync: updateCardMutation, isPending: isUpdating } =
    useMutation({
      mutationFn: ({
        documentId,
        userName,
        cardName,
      }: {
        documentId: string;
        userName?: string;
        cardName?: string;
      }) => updateCardInfo(documentId, userName, cardName),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["card"] });
        toast.success("Card Updated Successfully");
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  return { updateCardMutation, isUpdating };
}
