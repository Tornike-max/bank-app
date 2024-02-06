import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../services/userAuthApi/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: register, isPending: isRegistring } = useMutation({
    mutationFn: ({
      email,
      password,
      name,
      username,
    }: {
      email: string;
      password: string;
      name: string;
      username: string;
    }) => registerUser(email, password, name, username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("User Successfully Register");
      navigate("/login");
    },
    onError: () => {
      toast.error("Something went wrong! Please try again");
    },
  });

  return { register, isRegistring };
}
