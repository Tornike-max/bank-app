import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/userAuthApi/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: (documentId: string) => logoutApi(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Log out");
      navigate("/login");
    },
    onError: () => {
      toast.error("Error while login");
    },
  });

  return { logout, isLoggingOut };
}
