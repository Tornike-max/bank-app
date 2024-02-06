import { useGetCurrentAcc } from "../../../hooks/accHooks/useGetCurrentAcc";
import { useGetSettings } from "../../../hooks/settingsHooks/useGetSettings";
import Loader from "../../../ui/Loader";
import LoanForm from "./LoanForm";
import PayLoan from "./PayLoan";

export default function CreateLoan() {
  const { settings, isSettingsPending } = useGetSettings();
  const { currentAcc, isCurrentAccPending } = useGetCurrentAcc();

  if (isSettingsPending || isCurrentAccPending) return <Loader />;
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col shadow-lg border-1 border-gray-300 py-6 px-8 rounded-md">
      <h1 className="text-2xl text-primary-500 font-semibold pb-6">
        Make a Loan
      </h1>
      <div className=" w-full flex justify-center items-center flex-col gap-8">
        <div className="w-full">
          <LoanForm settings={settings} currentAcc={currentAcc} />
        </div>
        <div className="w-full">
          <PayLoan settings={settings} currentAcc={currentAcc} />
        </div>
      </div>
    </div>
  );
}
