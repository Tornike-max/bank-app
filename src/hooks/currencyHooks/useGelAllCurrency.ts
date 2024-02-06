import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCurrency } from "../../services/currencyApi/currencyApi";
import { useEffect } from "react";

export function useGetAllCurrency(currency: string) {
  const queryClient = useQueryClient();
  console.log(currency);
  const { data: currencies, isPending: isCurrenciesPending } = useQuery({
    queryKey: ["currency", currency],
    queryFn: () => getAllCurrency(currency),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["currency"] });
  }, [currency, queryClient]);

  return { isCurrenciesPending, currencies };
}
