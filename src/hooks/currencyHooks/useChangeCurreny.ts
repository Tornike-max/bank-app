import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeCurrencyApi } from "../../services/currencyApi/currencyApi";

export function useChangeCurrency() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (currency: string) => changeCurrencyApi(currency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currency"] });
      toast.success("Change");
    },
    onError: () => {
      toast.error("Error while converting");
    },
  });

  return { mutate, isPending };
}
