import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Input, Spinner, Button, Chip } from "@nextui-org/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formatDate } from "../../../ui/formatDate";
import { currencyCodes } from "../../../constants/constants";
import { convertAllCurrency } from "../../../services/currencyApi/currencyApi";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";

type CurrencyTypes = {
  from: string;
  to: string;
  value: string;
};

export default function CurrencyConvertion() {
  const { register, handleSubmit } = useForm<CurrencyTypes>();
  const [currencyData, setCurrencyData] = useState<Record<
    string,
    number
  > | null>(null);
  const [to, setTo] = useState("GBP");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CurrencyTypes> = async (data) => {
    setLoading(true);
    const response = await convertAllCurrency(
      Number(data.value),
      data.from,
      data.to
    );
    setTo(data.to);
    setCurrencyData(response.rates);
    setLoading(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between flex-col max-h-44 bg-primary-500 py-4 px-6 rounded-md text-lg">
        <div className="w-full flex justify-between items-center">
          <p className="text-stone-100">Currency Converter</p>
          <p className="text-stone-100">
            {formatDate(new Date().toISOString())}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center items-center flex-col gap-2"
        >
          <div className="flex items-center justify-center gap-2">
            <Input
              variant="flat"
              type="number"
              color="default"
              label="Enter Value"
              size="sm"
              {...register("value", {
                required: true,
              })}
            />

            <FormControl
              variant="filled"
              sx={{ m: 1, minWidth: 100 }}
              size="small"
              className="bg-white rounded-md"
            >
              <InputLabel id="demo-select-small-label">From</InputLabel>
              <Select
                id="demo-simple-select-filled"
                {...register("from", {
                  required: true,
                })}
              >
                {currencyCodes?.map((currency) => (
                  <MenuItem value={currency}>{currency}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="text-stone-100 flex flex-col justify-center items-center gap-1">
              <HiOutlineArrowLongRight />
              <HiOutlineArrowLongLeft />
            </div>

            <FormControl
              variant="filled"
              sx={{ m: 1, minWidth: 100 }}
              size="small"
              className="bg-white rounded-md"
            >
              <InputLabel id="demo-select-small-label">To</InputLabel>
              <Select
                id="demo-simple-select-filled"
                {...register("to", {
                  required: true,
                })}
              >
                {currencyCodes?.map((currency) => (
                  <MenuItem value={currency}>{currency}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" variant="shadow" color="default" size="lg">
              {loading ? <Spinner size="sm" /> : "Convert"}
            </Button>
          </div>

          <div className="flex justify-center items-center">
            {!currencyData || !currencyData[to] ? (
              <Chip variant="shadow" color="danger" size="lg">
                No Data
              </Chip>
            ) : (
              <Chip variant="shadow" color="default" size="lg">
                {currencyData[to]}
              </Chip>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
