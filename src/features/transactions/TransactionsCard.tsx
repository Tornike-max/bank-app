import { Models } from "appwrite";
import { formatCurrency } from "../../ui/formatCurrency";

export default function TransactionsCard({
  transaction,
}: {
  transaction: Models.Document;
}) {
  return (
    <li className="bg-gray-100 rounded-md p-2 sm:p-4">
      <div className="flex justify-between items-center">
        <span className="text-sm sm:text-lg font-semibold text-blue-600">
          Amount: {formatCurrency(transaction.amount, "USD")}
        </span>
        <span className="text-gray-500 text-sm sm:text-lg">
          {transaction.description}
        </span>
      </div>
    </li>
  );
}
