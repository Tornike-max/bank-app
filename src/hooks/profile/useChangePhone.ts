import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserPhone } from "../../services/profileApi/profileApi";
import toast from "react-hot-toast";

export function useChangePhone() {
  const queryClient = useQueryClient();
  const { mutate: changePhoneNumber, isPending: isChanging } = useMutation({
    mutationFn: ({ userId, phone }: { userId: string; phone: string }) =>
      changeUserPhone(userId, phone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Phone Number Successfully changed");
    },
    onError: () => {
      toast.error("error while updating");
    },
  });
  return { changePhoneNumber, isChanging };
}
