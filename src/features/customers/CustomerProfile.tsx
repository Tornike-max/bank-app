import { useParams } from "react-router-dom";
import { useGetSingleCustomer } from "../../hooks/CustomersHooks/useGetSingleCustomer";
import { Spinner } from "@nextui-org/react";

export default function CustomerProfile() {
  const { customerId } = useParams();
  const { customerData, isCustomerPending } = useGetSingleCustomer(
    customerId || ""
  );

  if (isCustomerPending)
    return (
      <div className="flex justify-center items-center py-36">
        <Spinner size="lg" color="primary" />
      </div>
    );

  console.log(customerData);

  return <div>CustomerProfile</div>;
}
