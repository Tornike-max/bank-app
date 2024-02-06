import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Models } from "appwrite";
import { formatCurrency } from "../../../ui/formatCurrency";

export default function TransactionsTable({
  transactions,
}: {
  transactions: Models.Document[] | undefined;
}) {
  return (
    <div className="w-full flex justify-center items-center">
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
        </TableHeader>
        <TableBody>
          {transactions ? (
            transactions?.map((action) => (
              <TableRow key={action.$createdAt}>
                <TableCell>{action.$id}</TableCell>
                <TableCell>{formatCurrency(action.amount, "USD")}</TableCell>
                <TableCell>{action.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <Table aria-label="Example empty table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            </Table>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
