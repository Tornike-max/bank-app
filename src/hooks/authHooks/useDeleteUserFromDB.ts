import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/userAuthApi/userApi";
import toast from "react-hot-toast";

export function useDeleteUserFromDB() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (documentId: string) => deleteUser(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("User Deleted");
    },
    onError: () => {
      toast.error("Error while deleting");
    },
  });

  return { mutate, isPending };
}
