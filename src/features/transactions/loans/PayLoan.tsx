import { Button, Input, Progress, Spinner, Switch } from "@nextui-org/react";
import React, { useState } from "react";
import { useGetLoanData } from "../../../hooks/loanHooks/useGetLoanData";
import Loader from "../../../ui/Loader";
import { useAuth } from "../../../context/useAuth";
import { formatCurrency } from "../../../ui/formatCurrency";
import { usePayLoan } from "../../../hooks/loanHooks/usePayLoan";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { Models } from "appwrite";

export default function PayLoan({
  settings,
  currentAcc,
}: {
  settings: Models.Document | undefined;
  currentAcc: Models.Document[] | undefined;
}) {
  const { user } = useAuth();
  const { loanData, isLoanDataPending } = useGetLoanData(user?.id || "");
  const [isSelected, setIsSelected] = useState(false);
  const [loanValue, setLoanValue] = useState("");
  const { pay, isPaying } = usePayLoan();

  if (isLoanDataPending) return <Loader />;

  const loanPerc = loanData?.amount * (1 + settings?.loanPercentage / 100);

  const progress = currentAcc && currentAcc[0].balance - Number(loanValue);
  console.log(progress);
  const leftToPay = ((loanData?.moneyToPay || 0) / loanPerc) * 100;
  console.log(loanPerc);

  const moneyToPay = !isSelected ? loanData?.amount / 2 : loanData?.amount / 12;

  function handlePayBill(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    pay({
      documentId: loanData?.$id || "",
      accountId: loanData?.account?.$id,
      loanValue: Number(loanValue),
      loanAmount: loanData?.amount,
      loanPercentage: loanData?.amount * (settings?.loanPercentage / 100),
      leftToPay: progress ? progress : loanPerc - Number(loanValue),
      currentBalance: currentAcc && currentAcc[0].balance,
      currentOutcome: currentAcc && currentAcc[0].outcome,
      settingsLoanPercentage: settings?.loanPercentage,
    });
  }

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <div className="w-full flex items-center justify-center gap-2">
        <Switch isSelected={isSelected} onValueChange={setIsSelected} />
        <span> {isSelected ? "Monthly" : "Anual"}</span>
      </div>

      <div className="w-full">
        <span className="text-sm  flex justify-center items-center">
          {!isSelected
            ? `If you want to pay the loan once a year? You will have to pay 
          ${formatCurrency(moneyToPay, "USD")}
          GEL every year for 1 years`
            : `If you want to pay monthly, you have to pay ${formatCurrency(
                moneyToPay,
                "USD"
              )}`}
        </span>
        <div className="w-full py-4"></div>
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-4">
        <h1 className="text-2xl font-semibold text-primary-500">
          {formatCurrency(
            loanData?.amount === undefined
              ? 0
              : loanData?.amount * (settings?.loanPercentage / 100) +
                  loanData?.amount,
            "USD"
          )}
        </h1>
        <Progress
          aria-label="Loading..."
          value={100 - leftToPay}
          className="w-full"
        />
      </div>
      <div className="w-full flex justify-center items-center py-2">
        <Input
          variant="bordered"
          color="primary"
          size="sm"
          value={loanValue}
          label="Loan Amount"
          className="w-full"
          onChange={(e) => setLoanValue(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs font-semibold text-red-500">
          left to pay: {formatCurrency(loanData?.leftToPay, "USD")}
        </span>
        <div className="w-full flex justify-end items-center gap-2">
          <Button variant="ghost" color="primary">
            Clear
          </Button>
          <Button
            disabled={loanData?.amount === loanData?.moneyToPay}
            onClick={handlePayBill}
            variant="ghost"
            color="primary"
          >
            {isPaying ? (
              <Spinner size="sm" />
            ) : loanData?.amount !== loanData?.moneyToPay ? (
              "Pay"
            ) : (
              <HiOutlineCheckBadge className="text-2xl " />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
