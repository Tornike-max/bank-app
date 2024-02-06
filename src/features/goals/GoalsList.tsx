import { Button, Input, Slider, Spinner, Textarea } from "@nextui-org/react";
import { formatDate } from "../../ui/formatDate";
import { formatCurrency } from "../../ui/formatCurrency";
import { useEffect, useState } from "react";
import { useUpdateGoal } from "../../hooks/goalHooks/useUpdateGoal";
import { Models } from "appwrite";
import { useDeleteGoal } from "../../hooks/goalHooks/useDeleteGoal";

export default function GoalsList({ item }: { item: Models.Document }) {
  const [sliderAmount, setSliderAmount] = useState(0);
  const { update, isUpdating } = useUpdateGoal();
  const { mutate, isGoalDeleting } = useDeleteGoal();
  useEffect(() => {}, [item]);

  function handleUpdate(
    e: React.MouseEvent,
    amount: number,
    documentId: string
  ) {
    e.preventDefault();
    const newValue = sliderAmount;
    const remainingAmount = amount - sliderAmount;
    update({ documentId, newValue, remainingAmount });
  }

  function handleDelete(e: React.MouseEvent, documentId: string) {
    e.preventDefault();

    if (!documentId) return;
    mutate(documentId);
  }

  return (
    <div className="w-full">
      <div className="max-w-xl w-full p-8 m-auto flex justify-center items-center flex-col gap-4 shadow-lg border-1 border-stone-500 rounded-md">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-2xl font-semibold text-primary-500">Your Goal</h1>
        </div>

        <div className="w-full flex justify-between text-base text-primary-500 font-medium">
          <span>{item.goalName}</span>
          <span className="text-sm">{formatDate(item.deadline)}</span>
        </div>

        <div className="w-full">
          <Textarea
            variant="bordered"
            color="primary"
            label="Description"
            value={item.description}
            disabled={true}
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <Input
            variant="bordered"
            color="primary"
            label="Amount"
            value={item.amount}
            disabled={true}
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <Slider
            label="Currency"
            showTooltip={true}
            formatOptions={{ style: "currency", currency: "GEL" }}
            maxValue={item.amount}
            defaultValue={item.sliderAmount}
            onChange={(newValue) => {
              if (typeof newValue === "number") {
                setSliderAmount(newValue);
              }
            }}
            tooltipValueFormatOptions={{
              style: "currency",
              currency: "GEL",
            }}
          />
        </div>
        <div className="w-full flex justify-between items-center text-sm">
          <p>
            <span>Remaining Amount: </span>
            <span className="font-semibold">
              {formatCurrency(item.remainingAmount, "")}
            </span>
          </p>
          <p>
            <span>Your Goal: </span>
            <span className="font-semibold">
              {formatCurrency(item.goal, "")}
            </span>
          </p>
        </div>
        <div className="w-full flex justify-end items-center gap-2">
          <Button
            onClick={(e) => handleDelete(e, item.$id)}
            variant="ghost"
            color="danger"
          >
            {isGoalDeleting ? <Spinner size="sm" /> : "Delete"}
          </Button>
          <Button
            onClick={(e) => handleUpdate(e, item.amount, item.$id)}
            variant="ghost"
            color="primary"
          >
            {isUpdating ? <Spinner size="sm" /> : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
