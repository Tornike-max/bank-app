import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../services/Customers/CustomersApi";

export function useGetCustomers() {
  const { data, isPending } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  return { data, isPending };
}
