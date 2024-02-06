import AllCurrencies from "./AllCurrencies";
import CurrencyConvertion from "./CurrencyConvertion";

export default function Currencies() {
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col">
      <CurrencyConvertion />
      <AllCurrencies />
    </div>
  );
}
