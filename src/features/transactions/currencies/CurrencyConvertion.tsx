import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Input, Spinner, Button } from "@nextui-org/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formatDate } from "../../../ui/formatDate";
import { currencyCodes } from "../../../constants/constants";
import { convertAllCurrency } from "../../../services/currencyApi/currencyApi";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import { formatCurrency } from "../../../ui/formatCurrency";
import { useNavigate } from "react-router-dom";

type CurrencyTypes = {
  from: string;
  to: string;
  value: string;
};

export default function CurrencyConversion() {
  const navigate = useNavigate();
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
    <div className="w-full flex justify-center items-center bg-primary-500 rounded-lg py-4 px-6">
      <div className="w-full rounded-md">
        <Button
          onClick={() => navigate("/transactions")}
          variant="shadow"
          color="default"
          size="sm"
        >
          Go Bak
        </Button>
        <div className="w-full flex justify-center items-start flex-col gap-2 py-2 text-stone-200">
          <h1 className="text-xl font-semibold">Currency Converter</h1>
          <span className="text-xs sm:text-sm">
            {formatDate(new Date().toISOString())}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full flex flex-col gap-2">
            <Input
              variant="faded"
              type="number"
              color="default"
              label="Enter Value"
              size="sm"
              {...register("value", { required: true })}
            />

            <div className="w-full flex items-center gap-1 sm:gap-4">
              <FormControl
                variant="filled"
                sx={{ minWidth: 100 }}
                size="small"
                className="bg-white rounded-md w-full"
              >
                <InputLabel color="info" id="from-select-label">
                  From
                </InputLabel>
                <Select
                  color="info"
                  id="from-select"
                  {...register("from", { required: true })}
                >
                  {currencyCodes?.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="flex flex-col justify-center items-center">
                <HiOutlineArrowLongRight className="text-stone-100" />
                <HiOutlineArrowLongLeft className="text-stone-100" />
              </div>
              <FormControl
                variant="filled"
                sx={{ minWidth: 100 }}
                size="small"
                className="bg-white rounded-md w-full"
              >
                <InputLabel id="to-select-label">To</InputLabel>
                <Select
                  color="primary"
                  id="to-select"
                  {...register("to", { required: true })}
                >
                  {currencyCodes?.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            {!currencyData || !currencyData[to] ? (
              <Button
                disabled={true}
                variant="shadow"
                color="danger"
                size="md"
                className="w-full"
              >
                No Data
              </Button>
            ) : (
              <Button
                disabled={true}
                variant="shadow"
                color="success"
                size="md"
                className="w-full"
              >
                {formatCurrency(currencyData[to], to)}
              </Button>
            )}

            <div className="w-full flex justify-end items-center">
              <Button
                type="submit"
                variant="shadow"
                color="default"
                size="md"
                className="w-full"
              >
                {loading ? <Spinner size="sm" /> : "Convert"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
