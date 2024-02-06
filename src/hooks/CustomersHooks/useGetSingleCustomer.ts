import { useQuery } from "@tanstack/react-query";
import { getSingleCustomer } from "../../services/Customers/CustomersApi";

export function useGetSingleCustomer(customerId: string) {
  const { data: customerData, isPending: isCustomerPending } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: () => getSingleCustomer(customerId),
  });

  return { customerData, isCustomerPending };
}
