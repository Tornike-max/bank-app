import { Button } from "@nextui-org/button";
import { Textarea, Slider, Spinner, Input } from "@nextui-org/react";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useCreateGoal } from "../../hooks/goalHooks/useCreateGoal";

export default function CreateGoal() {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [goalName, setGoalName] = useState("");
  const [amount, setAmount] = useState("");
  const [sliderAmount, setSliderAmount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const { createGoal, isGoalCreating } = useCreateGoal();

  function handleAddGoal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const goalData = {
      description: description,
      goalName: goalName,
      deadline: deadline,
      amount: Number(amount),
      remainingAmount: Number(amount) - sliderAmount,
      goal: Number(amount),
      user: user?.id || "",
      sliderAmount: sliderAmount,
    };
    createGoal(goalData);
  }

  return (
    <div className="w-full flex justify-center items-center bg-gray-100 border-1 border-primary-500 rounded-md">
      <div className=" w-full bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl font-semibold text-primary-500 mb-4 text-center">
          Create Your Goal
        </h1>
        <form className="w-full" onSubmit={(e) => handleAddGoal(e)}>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="bordered"
            color="primary"
            label="Description"
            className="mb-4"
          />
          <div className="flex items-center flex-col sm:flex-row w-full gap-1">
            <Input
              value={goalName}
              size="sm"
              color="primary"
              variant="bordered"
              label="Goal Name"
              className="w-full"
              onChange={(e) => setGoalName(e.target.value)}
            />
            <Input
              type="number"
              size="sm"
              color="primary"
              variant="bordered"
              label="Amount"
              value={amount}
              className="w-full"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              type="date"
              size="sm"
              color="primary"
              variant="bordered"
              value={deadline}
              className="w-full"
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <Slider
            label="Currency"
            showTooltip={true}
            formatOptions={{ style: "currency", currency: "GEL" }}
            maxValue={Number(amount)}
            value={sliderAmount}
            isDisabled={!amount}
            onChange={(newValue) => {
              if (typeof newValue === "number") {
                setSliderAmount(newValue);
              }
            }}
            tooltipValueFormatOptions={{
              style: "currency",
              currency: "GEL",
            }}
            className="mb-4"
          />
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs sm:text-sm text-gray-600">
              Remaining Amount: {Number(amount) - sliderAmount}
            </span>
            <span className="text-xs sm:text-sm text-gray-600">
              Your Goal: {amount}
            </span>
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              color="danger"
              onClick={() => {
                setAmount("");
                setGoalName("");
                setSliderAmount(0);
                setDeadline("");
                setDescription("");
              }}
              className="border border-gray-300 px-4 py-2 rounded-md"
            >
              Clear
            </Button>
            <Button
              disabled={isGoalCreating}
              type="submit"
              size="sm"
              variant="ghost"
              color="primary"
              className="px-4 py-2 rounded-md"
            >
              {isGoalCreating ? <Spinner size="sm" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
