import { Models } from "appwrite";

import { formatCardDate } from "../../../ui/formatCardDate";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import UpdateCardModal from "./UpdateCardModal";
import DeleteCardModal from "./DeleteCardModal";

export default function Card({
  cardData,
  cardName,
  userName,
}: {
  cardData: Models.Document[] | undefined;
  cardName: string;
  userName: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  console.log(cardData ? cardData : []);
  return (
    <div className="w-full flex justify-center items-center flex-col gap-4">
      <div className="w-full flex justify-center items-center bg-stone-100 shadow-md rounded-md py-4 px-6 hover:bg-slate-100">
        <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-xl  hover:shadow-2xl duration-150 transition-all">
          <img
            className="relative object-cover w-full h-full rounded-xl"
            src="https://i.imgur.com/kGkSg1v.png"
          />

          <div className="w-full px-8 absolute top-8">
            <div className="flex justify-between">
              <div className="">
                <h1 className="font-light">
                  {(cardData && cardData[0].cardName) || cardName}
                </h1>
                <p className="font-medium tracking-widest">
                  {(cardData && cardData[0].userName) || userName}
                </p>
              </div>
              <img
                className="w-14 h-14"
                src="https://i.imgur.com/bbPHJVe.png"
              />
            </div>
            <div className="pt-1">
              <h1 className="font-light">Card Number</h1>
              <p className="font-medium tracking-more-wider">
                {(cardData &&
                  cardData[0].card_number.slice(0, 4) +
                    " " +
                    cardData[0].card_number.slice(4, 8) +
                    " " +
                    cardData[0].card_number.slice(8, 12) +
                    " " +
                    cardData[0].card_number.slice(12, 16)) ||
                  "4642 3489 9867 7632"}
              </p>
            </div>
            <div className="pt-6 pr-6">
              <div className="flex justify-between">
                <div className="">
                  <h1 className="font-light text-xs">Valid</h1>
                  <p className="font-medium tracking-wider text-sm">
                    {(cardData && formatCardDate(cardData[0].$createdAt)) ||
                      "11/15"}
                  </p>
                </div>
                <div className="">
                  <h1 className="font-light text-xs ">Expiry</h1>
                  <p className="font-medium tracking-wider text-sm">
                    {(cardData && formatCardDate(cardData[0].expiry_date)) ||
                      "03/25"}
                  </p>
                </div>

                <div className="">
                  <h1 className="font-light text-xs">CVV</h1>
                  <p className="font-bold tracking-more-wider text-sm">
                    {(cardData && cardData[0].cvv) || "555"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        <Button type="button" variant="ghost" color="danger" onPress={onOpen2}>
          Delete
        </Button>
        <Button type="submit" variant="ghost" color="primary" onPress={onOpen}>
          Update
        </Button>
      </div>
      <UpdateCardModal
        documentId={(cardData && cardData[0].$id) || ""}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <DeleteCardModal
        documentId={(cardData && cardData[0].$id) || ""}
        isOpen2={isOpen2}
        onOpenChange2={onOpenChange2}
      />
    </div>
  );
}
