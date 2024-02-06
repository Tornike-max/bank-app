import { Slider } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export default function FilterByAmount({
  value,
  setValue,
}: {
  setValue: Dispatch<SetStateAction<number>>;
  value: number;
}) {
  const handleChange = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h1 className="w-full text-center text-2xl font-semibold text-primary-500">
        Filter Transactions
      </h1>
      <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
        <Slider
          label="Select a Range"
          formatOptions={{ style: "currency", currency: "USD" }}
          step={10}
          maxValue={5000}
          minValue={0}
          value={value}
          onChange={handleChange}
          showTooltip
          className="max-w-lg w-full"
        />
      </div>
    </div>
  );
}
