import {
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

import { useAuth } from "../../../context/useAuth";
import { IoRemoveOutline } from "react-icons/io5";
import { useGetCustomers } from "../../../hooks/CustomersHooks/useGetCustomers";
import { TransferType } from "../../../types/types";
import { useMakeTransaction } from "../../../hooks/transactionHooks/useMakeTransaction";

import Loader from "../../../ui/Loader";
import { useNavigate } from "react-router-dom";

export default function TransferAmountForm() {
  const navigate = useNavigate();

  const { makeTransfer, isTransferPending } = useMakeTransaction();
  const { user } = useAuth();

  const { register, handleSubmit } = useForm<TransferType>();
  const { data, isPending } = useGetCustomers();

  const onSubmit: SubmitHandler<TransferType> = (data) => {
    const transferData = {
      description: data.description,
      amount: data.amount,
      user: user?.id,
      to: data.to,
      account: "",
    };
    makeTransfer(transferData);
  };

  if (isPending) return <Loader />;

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 py-8 px-6 bg-stone-100 rounded-lg my-6">
      <div className="w-full flex justify-start items-center">
        <Button onClick={() => navigate(-1)} variant="shadow" color="primary">
          Go Back
        </Button>
      </div>
      <div className="w-full flex justify-start items-center gap-2 text-sm sm:text-base md:text-lg font-semibold text-primary-500">
        <HiOutlineCurrencyDollar />
        <h1>Enter The Transfer Amount</h1>
      </div>
      <div className="w-full flex justify-start items-center gap-2 font-semibold">
        <HiOutlineArrowLeft className="text-lg sm:text-xl  text-primary-500 font-semibold" />
        <p className="text-lg sm:text-xl ">From</p>
        <IoRemoveOutline className="text-lg sm:text-xl " />
        <p className="text-lg sm:text-xl ">To</p>
        <HiOutlineArrowRight className="text-lg sm:text-xl  text-primary-500 font-semibold" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center gap-4 flex-col"
      >
        <div className="w-full flex items-center flex-col sm:flex-row gap-4">
          <Input
            variant="bordered"
            color="primary"
            className="w-full"
            placeholder={user?.name}
            disabled={true}
            label="Your Account"
            size="sm"
          />

          <Select
            items={data}
            variant="bordered"
            placeholder="Please Select To Account"
            color="primary"
            size="lg"
            labelPlacement="outside"
            aria-label="Select To Account"
            {...register("to", {
              required: "This Field Is Required",
            })}
            classNames={{
              base: "w-full",
              trigger: "min-h-unit-12 py-2",
            }}
          >
            {(user) => (
              <SelectItem key={user.account.$id} textValue={user.name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={user.imageUrl}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>

        <div className="w-full flex items-center flex-col sm:flex-row  gap-4">
          <Input
            variant="bordered"
            color="primary"
            type="number"
            label="Please Enter The Amount"
            className="w-full"
            {...register("amount", {
              required: "This Field Is Required",
            })}
          />
          <Input
            variant="bordered"
            color="primary"
            label="Please Enter The Description"
            className="w-full"
            {...register("description", {
              required: "This Field Is Required",
            })}
          />
        </div>
        <div className="w-full flex items-center gap-4 justify-end">
          <Button
            disabled={isTransferPending}
            type="button"
            variant="ghost"
            color="danger"
          >
            Close
          </Button>
          <Button
            disabled={isTransferPending}
            type="submit"
            variant="ghost"
            color="primary"
          >
            {isTransferPending ? <Spinner /> : "Transfer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
