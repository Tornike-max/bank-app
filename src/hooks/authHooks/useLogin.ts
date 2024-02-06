import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/userAuthApi/userApi";

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutateAsync: login, isPending: isUserLogin } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      throw new Error("Error wile logi usern");
    },
  });

  return { login, isUserLogin };
}
