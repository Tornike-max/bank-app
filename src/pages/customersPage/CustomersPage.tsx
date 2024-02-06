import Customers from "../../features/customers/Customers";
import { useGetCustomers } from "../../hooks/CustomersHooks/useGetCustomers";
import Loader from "../../ui/Loader";

export default function CustomersPage() {
  const { data, isPending } = useGetCustomers();

  if (isPending) return <Loader />;
  return (
    <>
      <Customers customers={data} />
    </>
  );
}
