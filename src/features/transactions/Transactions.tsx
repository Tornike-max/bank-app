import { useGetCustomers } from "../../hooks/CustomersHooks/useGetCustomers";
import Loader from "../../ui/Loader";
import MyPayments from "./MyPayments";
import PaymentCategories from "./PaymentCategories";
import PaymentContacts from "./PaymentContacts";

export default function Transactions() {
  const { data, isPending } = useGetCustomers();

  if (isPending) return <Loader />;

  return (
    <div className="max-w-[2200px] w-full flex flex-col gap-4">
      <PaymentCategories />
      <MyPayments />
      <div className="max-w-[2200px] w-full flex justify-center items-center flex-col border-1 border-gray-300 rounded-md py-6 px-10 shadow-lg">
        <h1 className="text-2xl font-semibold text-primary-500 py-4">
          Contacts
        </h1>
        {data?.map((contact) => (
          <PaymentContacts key={contact.$id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
