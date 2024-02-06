import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateLoan } from "../../../hooks/loanHooks/useCreateLoan";
import { useAuth } from "../../../context/useAuth";
import { loanPeriodByYears, loanPurposes } from "../../../constants/constants";
import { LoanType } from "../../../types/types";

import { Models } from "appwrite";

export default function LoanForm({
  settings,
  currentAcc,
}: {
  settings: Models.Document | undefined;
  currentAcc: Models.Document[] | undefined;
}) {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<LoanType>();
  const { loanRequest, isLoanPending } = useCreateLoan();

  console.log(currentAcc);

  const onSubmit: SubmitHandler<LoanType> = (data) => {
    console.log(data);
    const loanData = {
      loanPurpose: data.loanPurpose,
      account: currentAcc && currentAcc[0].$id,
      amount: data.amount,
      interestRate: Number(settings?.loanPercentage),
      period: data.period,
      status: data.status,
      user: user?.id,
    };
    loanRequest({
      loanData: loanData,
      accountId: (currentAcc && currentAcc[0].$id) || "",
      loanAmount: data.amount,
    });
    reset();
  };

  const handleClear = () => {
    reset({
      loanPurpose: "",
      period: 1,
      amount: 0,
      interestRate: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col justify-start items-center gap-2"
    >
      <div className="w-full">
        <Select
          variant="bordered"
          label="Select Loan Purpose"
          color="primary"
          size="sm"
          className="w-full"
          {...register("loanPurpose", {
            required: "This Field Is Required",
          })}
        >
          {loanPurposes?.map((purpose) => (
            <SelectItem key={purpose} value={purpose}>
              {purpose}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-full">
        <Select
          variant="bordered"
          label="Select Loan Purpose"
          color="primary"
          size="sm"
          className="w-full"
          {...register("period", {
            required: "This Field Is Required",
          })}
        >
          {loanPeriodByYears?.map((year) => (
            <SelectItem key={year} value={year}>
              {`${year} Year`}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-full">
        <Input
          size="sm"
          type="number"
          variant="bordered"
          className="w-full"
          color="primary"
          label="Loan Amount"
          {...register("amount", {
            required: "This Field Is Required",
            min: { value: 1, message: "Minimum amount is 1" },
          })}
        />
      </div>
      <div className="w-full">
        <Input
          size="sm"
          type="number"
          step="0.01"
          variant="bordered"
          className="w-full"
          color="primary"
          disabled={true}
          label={`Interest Rate (${settings?.loanPercentage}%)`}
        />
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <Button onClick={handleClear} variant="ghost" color="danger">
          Clear
        </Button>
        <Button type="submit" variant="ghost" color="primary">
          {isLoanPending ? <Spinner size="sm" /> : "Send Loan Request"}
        </Button>
      </div>
    </form>
  );
}
