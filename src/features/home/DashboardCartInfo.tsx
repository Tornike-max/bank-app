import { FcSimCardChip } from "react-icons/fc";
import { formatCardDate } from "../../ui/formatCardDate";
import { Models } from "appwrite";

export default function DashboardCartInfo({
  cardData,
}: {
  cardData: Models.Document[] | undefined;
}) {
  return (
    <div className="w-full flex justify-center items-center flex-col bg-stone-100 rounded-lg py-4 gap-2">
      <h1 className="text-lg text-primary-500 font-semibold">Debit Card</h1>
      <div className="max-w-80 w-full h-44 rounded-xl bg-indigo-500 py-8 px-6">
        <div className="w-full flex justify-between items-center gap-6">
          <FcSimCardChip className="text-3xl" />
          <h1 className="text-3xl text-stone-100 opacity-5">New Card</h1>
        </div>
        <span className="text-stone-200 text-lg">
          {cardData?.length !== 0
            ? cardData &&
              cardData[0]?.card_number?.slice(0, 4) +
                " " +
                cardData[0]?.card_number?.slice(4, 8) +
                " " +
                cardData[0]?.card_number?.slice(8, 12) +
                " " +
                cardData[0]?.card_number?.slice(12, 16)
            : "4642 3489 9867 7632"}
        </span>
        <div className="w-full flex justify-start items-center text-[8px] text-stone-100 gap-2">
          <div className="flex flex-col justify-center items-start">
            <span>VALID</span>
            <span>THRU</span>
          </div>
          <span className="text-xs">
            {cardData?.length !== 0 && cardData
              ? formatCardDate(cardData[0]?.expiry_date)
              : "25/25"}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="text-stone-100 font-semibold text-xs">
            DSHFUQW736
          </span>
          <img className="w-14 h-12" src="https://i.imgur.com/bbPHJVe.png" />
        </div>
      </div>
    </div>
  );
}
