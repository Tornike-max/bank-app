import { useAuth } from "../../../context/useAuth";
import { SiMinutemailer } from "react-icons/si";
import { formatCurrency } from "../../../ui/formatCurrency";
import { CiBank } from "react-icons/ci";
import TransferAmountForm from "./TransferAmountForm";
import { useGetCurrentAcc } from "../../../hooks/accHooks/useGetCurrentAcc";
import Loader from "../../../ui/Loader";

export default function Transfers() {
  const { user } = useAuth();
  const { currentAcc, isCurrentAccPending } = useGetCurrentAcc();

  if (isCurrentAccPending) return <Loader />;
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col">
      <div className="bg-primary-500 flex justify-center items-center flex-col py-4 px-6 w-full rounded-md text-stone-200 gap-6">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-semibold w-full text-start">
            {user?.username}
          </h3>
          <div className="flex items-center gap-2 text-stone-200">
            <CiBank className="text-xl" />
            <span>
              {formatCurrency(currentAcc && currentAcc[0].balance, "USD")}
            </span>
          </div>
        </div>

        <h1 className="w-full text-2xl text-stone-100 font-bold  flex justify-start items-center gap-2">
          <SiMinutemailer />
          <span>Transfer To Other Account</span>
        </h1>
      </div>

      <TransferAmountForm />
    </div>
  );
}
