import { Spinner } from "@nextui-org/react";
import { useGetCustomers } from "../hooks/CustomersHooks/useGetCustomers";
import { useNavigate } from "react-router-dom";

export default function RightBar() {
  const navigate = useNavigate();

  const { data, isPending } = useGetCustomers();

  if (isPending)
    return (
      <div className="flex justify-center items-center py-36">
        <Spinner size="lg" />
      </div>
    );

  function handleNavigateToCustomerPage() {
    navigate(`/transactions/transfer`);
  }

  return (
    <ul className="w-full flex justify-start gap-8 flex-col text-lg font-semibold text-primary-500 overflow-y-auto">
      <h1 className="text-start text-xl">Top Clients</h1>
      {data?.map((users) => (
        <li key={users.$id}>
          <div className="flex items-center gap-2">
            <img
              src={users.imageUrl}
              alt="user image"
              className="rounded-full w-10 h-10"
            />
            <div className="flex flex-col items-start gap-1 justify-start">
              <span className="text-xs">{users.name}</span>
              <button
                onClick={() => handleNavigateToCustomerPage()}
                className="py-1 px-2 text-xs border-1 border-primary-500 rounded-md hover:bg-primary-500 hover:text-stone-200 duration-100 transition-all hover:shadow-md"
              >
                Transfer
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
