import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../../services/userAuthApi/userApi";
import toast from "react-hot-toast";

export function useChangePassword() {
  const queryClient = useQueryClient();
  const { mutate: changePass, isPending } = useMutation({
    mutationFn: ({
      password,
      oldPassword,
    }: {
      password: string;
      oldPassword: string;
    }) => changePassword(password, oldPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Password Changed Successfully");
    },
    onError: () => {
      toast.error("Error while Changing password");
    },
  });

  return { changePass, isPending };
}
