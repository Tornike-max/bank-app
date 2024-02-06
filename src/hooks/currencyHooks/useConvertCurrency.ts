import { useQuery } from "@tanstack/react-query";
import { convertCurrency } from "../../services/currencyApi/currencyApi";

export function useConvertCurrency(amount: number, to: string) {
  const { data, isPending } = useQuery({
    queryKey: ["currency", to],
    queryFn: () => convertCurrency(amount, to),
  });

  return { data, isPending };
}
