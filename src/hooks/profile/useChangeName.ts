import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserName } from "../../services/profileApi/profileApi";
import toast from "react-hot-toast";

export function useChangeName() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      email,
      userId,
    }: {
      name: string;
      email: string;
      userId: string;
    }) => updateUserName(name, email, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["acc"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      toast.success("You Successfully changed your name");
    },
    onError: () => {
      toast.error("error while changing name");
    },
  });

  return { mutate, isPending };
}
