import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import Card from "./Card";
import { useAuth } from "../../../context/useAuth";
import { useCreateCard } from "../../../hooks/cardHooks/useCreateCard";
import { useGetCurCard } from "../../../hooks/cardHooks/useGetCurCard";
import Loader from "../../../ui/Loader";
import BasicCard from "./BasicCard";

export default function CreateCard() {
  const { createCardMutation, isCreating } = useCreateCard();
  const { user } = useAuth();
  const [cardName, setCardName] = useState("");
  const [userName, setUserName] = useState("");
  const { cardData, isPending } = useGetCurCard();

  if (isPending) return <Loader />;

  const handleSaveCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cardName || !userName) return;
    const expiryDate = `${new Date().getFullYear() + 5}-${(
      new Date().getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    const newCardData = {
      cardName: cardName,
      userName: userName,
      expiry_date: expiryDate,
      cvv: Math.floor(Math.random() * 999) + 1,
      user: user?.id,
      card_number: [...Array(16)]
        .map(() => Math.floor(Math.random() * 10))
        .join(""),
    };
    createCardMutation(newCardData);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 px-6 py-4">
      {cardData && cardData?.length > 0 ? (
        <Card
          cardData={cardData || []}
          cardName={cardName}
          userName={userName}
        />
      ) : (
        <form
          onSubmit={handleSaveCard}
          className="w-full flex justify-center items-center flex-col gap-4 px-6 py-4"
        >
          <BasicCard cardName={cardName} userName={userName} />
          <div className="w-full flex items-center justify-center gap-2">
            <Input
              variant="bordered"
              color="primary"
              label="Card Name"
              className="w-full"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <Input
              variant="bordered"
              color="primary"
              label="User Name"
              className="w-full"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-end items-center gap-2">
            <Button
              disabled={isCreating}
              type="button"
              variant="ghost"
              color="danger"
            >
              Delete
            </Button>
            <Button
              disabled={isCreating}
              type="submit"
              variant="ghost"
              color="primary"
            >
              {isCreating ? <Spinner size="sm" /> : "Save"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
