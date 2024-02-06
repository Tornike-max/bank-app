import { Models } from "appwrite";
import { formatCurrency } from "../../ui/formatCurrency";

export default function TransactionsCard({
  transaction,
}: {
  transaction: Models.Document;
}) {
  return (
    <li className="bg-gray-100 rounded-md p-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-blue-600">
          Amount: {formatCurrency(transaction.amount, "USD")}
        </span>
        <span className="text-gray-500">{transaction.description}</span>
      </div>
    </li>
  );
}
