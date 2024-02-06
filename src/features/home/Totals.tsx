import {
  HiOutlineBriefcase,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { formatCurrency } from "../../ui/formatCurrency";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useConvertCurrency } from "../../hooks/currencyHooks/useConvertCurrency";
import { Spinner } from "@nextui-org/react";

export default function Totals({
  income,
  withdrawals,
  loan,
  totalBalance,
}: {
  income: number | undefined;
  withdrawals: number | undefined;
  loan: number | undefined;
  totalBalance: number | undefined;
}) {
  const [blurBalance, setBlurBalance] = useState(false);
  const [blurIncome, setBlurIncome] = useState(false);
  const [blurOutcome, setBlurOutcome] = useState(false);
  const [blurLoan, setBlurLoan] = useState(false);
  const [searchParams] = useSearchParams();
  const selectCurrency = searchParams.get("currency") || "USD";

  const { data, isPending } = useConvertCurrency(
    totalBalance || 0,
    selectCurrency
  );

  if (isPending) return <Spinner />;

  return (
    <>
      <div className="rounded-md border-1 border-stone-200 shadow-lg hover:shadow-2xl duration-150 transition-all py-3 px-5 max-w-md w-full flex justify-start items-center flex-col gap-2 font-semibold">
        <div className="w-full flex items-center justify-between">
          <HiOutlineBriefcase className="text-primary-500 text-lg xl:text-xl" />
          <div className="flex items-center">
            <button
              onClick={() => setBlurBalance((blurBalance) => !blurBalance)}
            >
              {blurBalance ? (
                <HiOutlineEye className="text-primary-500 text-xl" />
              ) : (
                <HiOutlineEyeSlash className="text-primary-500 text-xl" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full flex justify-start items-center">
          <p className="text-xs lg:text-xs xl:text-sm font-semibold text-primary-500">
            Total Balance
          </p>
        </div>
        <div className="flex justify-start gap-2 items-center w-full text-xs lg:text-xs xl:text-sm">
          <span className={`text-primary-500 ${blurBalance && "blur-sm"}`}>
            {selectCurrency === "USD"
              ? formatCurrency(totalBalance || 0, selectCurrency)
              : selectCurrency === "GBP"
              ? formatCurrency(data?.rates.GBP, selectCurrency)
              : selectCurrency === "EUR"
              ? formatCurrency(data?.rates.EUR, selectCurrency)
              : formatCurrency(totalBalance || 0, selectCurrency)}
          </span>
          <button>
            <HiOutlineChevronUp className="text-primary-500" />
          </button>
        </div>
      </div>
      <div className="rounded-md border-1 border-stone-200 shadow-lg hover:shadow-2xl duration-150 transition-all py-3 px-5 max-w-md w-full flex justify-start items-center flex-col gap-2 font-semibold">
        <div className="w-full flex items-center justify-between">
          <HiOutlineBriefcase className="text-yellow-500 text-xl" />
          <button onClick={() => setBlurIncome((blurIncome) => !blurIncome)}>
            {blurIncome ? (
              <HiOutlineEye className="text-primary-500 text-xl" />
            ) : (
              <HiOutlineEyeSlash className="text-primary-500 text-xl" />
            )}
          </button>
        </div>
        <div className="w-full flex justify-start items-center">
          <p className="text-xs lg:text-xs xl:text-sm font-semibold text-yellow-500">
            Income
          </p>
        </div>
        <div className="flex justify-start gap-2 items-center w-full">
          <span
            className={`text-yellow-500 ${
              blurIncome && "blur-sm"
            } text-xs lg:text-xs xl:text-sm`}
          >
            {formatCurrency(income || 0, selectCurrency)}
          </span>
          <HiOutlineChevronUp className="text-red-500 font-bold" />
        </div>
      </div>
      <div className="rounded-md border-1 border-stone-200 shadow-lg hover:shadow-2xl duration-150 transition-all py-3 px-5 max-w-md w-full flex justify-start items-center flex-col gap-2 font-semibold">
        <div className="w-full flex items-center justify-between">
          <HiOutlineBriefcase className="text-indigo-500 text-xl" />
          <button onClick={() => setBlurOutcome((blurOutcome) => !blurOutcome)}>
            {blurOutcome ? (
              <HiOutlineEye className="text-primary-500 text-xl" />
            ) : (
              <HiOutlineEyeSlash className="text-primary-500 text-xl" />
            )}
          </button>
        </div>
        <div className="w-full flex justify-start items-center">
          <p className="text-xs lg:text-xs xl:text-sm font-semibold text-indigo-500">
            Withdrawals
          </p>
        </div>
        <div className="flex justify-start gap-2 items-center w-full">
          <span
            className={`text-indigo-600 ${
              blurOutcome && "blur-sm"
            } text-xs lg:text-xs xl:text-sm`}
          >
            {formatCurrency(withdrawals || 0, selectCurrency)}
          </span>
          <HiOutlineChevronDown className="text-indigo-600" />
        </div>
      </div>
      <div className="rounded-md border-1 border-stone-200 shadow-lg hover:shadow-2xl duration-150 transition-all py-3 px-5 max-w-md w-full flex justify-start items-center flex-col gap-2 font-semibold">
        <div className="w-full flex items-center justify-between">
          <HiOutlineBriefcase className="text-green-500 text-xl" />
          <button onClick={() => setBlurLoan((blurLoan) => !blurLoan)}>
            {blurLoan ? (
              <HiOutlineEye className="text-primary-500 text-xl" />
            ) : (
              <HiOutlineEyeSlash className="text-primary-500 text-xl" />
            )}
          </button>
        </div>
        <div className="w-full flex justify-start items-center">
          <p className="text-xs lg:text-xs xl:text-sm font-semibold text-green-500">
            Loans
          </p>
        </div>
        <div className="flex justify-start gap-2 items-center w-full">
          <span
            className={`text-green-600 ${
              blurLoan && "blur-sm"
            } text-xs lg:text-xs xl:text-sm`}
          >
            {formatCurrency(loan || 0, selectCurrency)}
          </span>
          <HiOutlineChevronUp className="text-green-600" />
        </div>
      </div>
    </>
  );
}
