import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { formatCurrency } from "../../../ui/formatCurrency";
import { formatDate } from "../../../ui/formatDate";
import { currencyItems } from "../../../constants/constants";
import { useSearchParams } from "react-router-dom";
import { useGetAllCurrency } from "../../../hooks/currencyHooks/useGelAllCurrency";
import Loader from "../../../ui/Loader";

interface CurrencyTypes {
  rates: Record<string, number>;
}

export default function AllCurrencies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("selectedCurrency") || "USD";

  const currency = searchParams.get("selectedCurrency") || "USD";

  const { currencies, isCurrenciesPending } = useGetAllCurrency(currency);

  if (isCurrenciesPending) return <Loader />;

  const currencyData = currencies as CurrencyTypes;

  const currenciesData = !currencyData.rates
    ? []
    : Object.entries(currencyData.rates).map(([currency, value]) => ({
        currency,
        value,
        date: new Date().toISOString(),
      }));

  function handleSelectCurrency(value: string) {
    searchParams.set("selectedCurrency", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col gap-4 py-6">
      <h1 className="text-2xl font-semibold text-primary-500 w-full text-center">
        Currency Rates
      </h1>
      <div className="w-full shadow-lg bg-stone-100 py-4 px-6">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-xl font-semibold text-primary-500">
            Main Currency
          </h1>
          <Select
            items={currencyItems}
            className="max-w-36 w-full"
            variant="underlined"
            placeholder="Select Currency"
            value={selected}
            onChange={(e) => handleSelectCurrency(e.target.value)}
            aria-label="Select Currency" // Add aria-label attribute here
            classNames={{
              label: "group-data-[filled=true]:-translate-y-5",
              trigger: "min-h-unit-16",
              listboxWrapper: "max-h-[400px]",
            }}
            listboxProps={{
              itemClasses: {
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
              },
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data?.currency}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.data?.image}
                  />
                  <div className="flex">
                    <span>{item.data?.currency}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(user) => (
              <SelectItem key={user.currency} textValue={user.currency}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.currency}
                    className="flex-shrink-0"
                    size="sm"
                    src={user.image}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.currency}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
      </div>
      <div className="w-full mx-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Currency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currenciesData.map((currency) => (
              <tr key={currency.currency}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {currency.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(currency.value, "")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(currency?.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
