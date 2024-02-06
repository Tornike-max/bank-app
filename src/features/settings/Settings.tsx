import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdPercent } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import { useUpdateSettings } from "../../hooks/settingsHooks/useUpdateSettings";
import { SettingsType } from "../../types/types";

export default function Settings({
  settings,
}: {
  settings: Models.Document | undefined;
}) {
  const navigate = useNavigate();
  const { updateSettings, isPending } = useUpdateSettings();

  // Initialize form with default values
  const { register, handleSubmit } = useForm<SettingsType>({
    defaultValues: {
      transactionPercentage: settings?.transactionPercentage ?? 0,
      loanPercentage: settings?.loanPercentage ?? 0,
      creditPercentage: settings?.creditPercentage ?? 0,
    },
  });

  const onSubmit: SubmitHandler<SettingsType> = (data) => {
    if (!data) return;

    const updateData = {
      loanPercentage: Number(data.loanPercentage),
      transactionPercentage: Number(data.transactionPercentage),
      creditPercentage: Number(data.creditPercentage),
    };

    updateSettings({ documentId: settings?.$id || "", updateData });
  };

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-start items-center flex-col gap-4 w-full px-10"
      >
        <h1 className="text-2xl text-primary-500 font-semibold mb-4">
          Settings
        </h1>

        <div className="w-full">
          <Input
            variant="bordered"
            type="number"
            color="primary"
            className="w-full"
            placeholder={settings?.transactionPercentage || ""}
            endContent={
              <div className="flex items-center text-primary-500">
                <MdPercent />
              </div>
            }
            label="Transaction Percentage"
            {...register("transactionPercentage", {
              validate: (value) =>
                Number(value) <= 2 ||
                "Transaction Percentage should be equal or lower 2%",
            })}
          />
        </div>
        <div className="w-full">
          <Input
            variant="bordered"
            color="primary"
            type="number"
            className="w-full"
            label="Loan Percentage"
            placeholder={settings?.loanPercentage || ""}
            endContent={
              <div className="flex items-center text-primary-500">
                <MdPercent />
              </div>
            }
            {...register("loanPercentage", {
              validate: (value) =>
                Number(value) <= 20 ||
                "Loan Percentage should be equal or lower 20%",
            })}
          />
        </div>
        <div className="w-full">
          <Input
            variant="bordered"
            color="primary"
            type="number"
            className="w-full"
            placeholder={settings?.creditPercentage || ""}
            endContent={
              <div className="flex items-center text-primary-500">
                <MdPercent />
              </div>
            }
            label="Credit Percentage"
            {...register("creditPercentage", {
              validate: (value) =>
                Number(value) <= 20 ||
                "Credit Percentage should be equal or lower 20%",
            })}
          />
        </div>
        <div className="w-full flex justify-end items-center gap-2">
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="ghost"
            color="default"
          >
            Go Back
          </Button>
          <Button type="submit" variant="ghost" color="primary">
            {isPending ? <Spinner size="sm" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
