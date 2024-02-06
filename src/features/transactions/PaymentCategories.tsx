import { CiBank } from "react-icons/ci";
import {
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function PaymentCategories() {
  const navigate = useNavigate();

  function handleNavigate(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    path: string
  ) {
    e.preventDefault();
    if (!path) return;

    navigate(`/transactions/${path}`);
  }
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col border-1 border-gray-300 rounded-md py-6 px-10 shadow-lg">
      <h1 className="w-full text-center text-xl  sm:text-2xl font-semibold text-primary-500 py-4">
        Categories
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <button
          onClick={(e) => handleNavigate(e, "payments")}
          className="py-4 px-4 rounded-lg bg-blue-500 opacity-80 hover:opacity-100 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex justify-center items-center"
        >
          <div className="text-white font-bold flex flex-col items-center justify-center w-28">
            <HiOutlineHomeModern className="text-white text-xl  sm:text-2xl " />
            <span className="text-stone-200 font-bold w-full text-center text-xs sm:text-sm">
              Expense Manager
            </span>
          </div>
        </button>
        <button
          onClick={(e) => handleNavigate(e, "transfer")}
          className="py-4 px-4 rounded-lg bg-blue-500 opacity-80 hover:opacity-100 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex justify-center items-center"
        >
          <div className="text-white font-bold flex flex-col items-center justify-center w-28">
            <HiOutlineUsers className="text-white text-xl sm:text-2xl" />
            <span className="text-stone-200 font-bold w-full text-center text-xs sm:text-sm">
              Transfer Station
            </span>
          </div>
        </button>
        <button
          onClick={(e) => handleNavigate(e, "currencyConvertion")}
          className="py-4 px-4 rounded-lg bg-blue-500 opacity-80 hover:opacity-100 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex justify-center items-center"
        >
          <div className="text-white font-bold flex flex-col items-center justify-center w-28">
            <HiOutlineCurrencyDollar className="text-white text-xl sm:text-2xl" />
            <span className="text-stone-200 font-bold w-full text-center text-xs sm:text-sm">
              Currency conversion
            </span>
          </div>
        </button>
        <button
          onClick={(e) => handleNavigate(e, "loan")}
          className="py-4 px-4 rounded-lg bg-blue-500 opacity-80 hover:opacity-100 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex justify-center items-center"
        >
          <div className="text-white font-bold flex flex-col items-center justify-center w-20">
            <CiBank className="text-white text-xl sm:text-2xl" />
            <span className="text-stone-200 font-bold w-full text-center text-xs sm:text-sm">
              Make a Loan
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
