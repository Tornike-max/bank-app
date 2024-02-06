import { useSearchParams } from "react-router-dom";
import { useGetCurrentAcc } from "../../hooks/accHooks/useGetCurrentAcc";
import Loader from "../../ui/Loader";
import Totals from "./Totals";
import Statistics from "./Statistics";
import RecenTransaction from "./RecenTransaction";
import DashboardCartInfo from "./DashboardCartInfo";
import GoalStat from "./GoalStat";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetCurrentTransactions } from "../../hooks/transactionHooks/useGetCurrentTransactions";
import { useAuth } from "../../context/useAuth";
import { useGetCurCard } from "../../hooks/cardHooks/useGetCurCard";
import { useGetGoals } from "../../hooks/goalHooks/useGetGoals";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectCurrency = searchParams.get("currency") || "USD";
  const { currentAcc, isCurrentAccPending } = useGetCurrentAcc();
  const { user } = useAuth();
  const { transactions, isPending } = useGetCurrentTransactions(user?.id || "");

  const { cardData, isPending: isCardDataLoading } = useGetCurCard();
  const { goalsData, isGoalsPending } = useGetGoals(user?.id || "");

  if (isCurrentAccPending || isPending || isCardDataLoading || isGoalsPending)
    return <Loader />;

  const income = currentAcc?.reduce(
    (accum, cur) => accum + (cur?.income || 0),
    0
  );
  const withdrawals = currentAcc?.reduce(
    (accum, cur) => accum + (cur?.outcome || 0),
    0
  );
  const loan = currentAcc?.reduce((accum, cur) => accum + (cur?.loan || 0), 0);
  const totalBalance = currentAcc?.reduce(
    (accum, cur) => accum + (cur?.balance || 0),
    0
  );

  const handleChangeCurrency = (value: string) => {
    setSearchParams(new URLSearchParams({ ...searchParams, currency: value }));
  };

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col m-auto px-2 py-2">
      <div className="w-full flex justify-start items-center gap-2">
        <h1 className="text-2xl font-bold py-2 text-primary-500">Balance</h1>
        <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            id="currency-select"
            value={selectCurrency}
            label="Currency"
            onChange={(e) => handleChangeCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="m-auto max-w-[2200px] w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Totals
          income={income}
          withdrawals={withdrawals}
          loan={loan}
          totalBalance={totalBalance}
        />
      </div>
      <h1 className="text-2xl font-bold py-2 text-primary-500 pt-8">
        Statistics
      </h1>
      <div className="w-full flex justify-center items-center flex-col gap-8">
        <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-4">
          <Statistics transactions={transactions} />
          <DashboardCartInfo cardData={cardData} />
        </div>
        <RecenTransaction transactions={transactions} />
        <GoalStat goalsData={goalsData} />
      </div>
    </div>
  );
}
