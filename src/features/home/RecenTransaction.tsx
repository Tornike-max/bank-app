import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { formatCurrency } from "../../ui/formatCurrency";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";

export default function RecenTransaction({
  transactions,
}: {
  transactions: Models.Document[] | undefined;
}) {
  const navigate = useNavigate();

  return (
    <>
      {transactions?.length !== 0 ? (
        <div className="w-full flex justify-center items-center flex-col gap-2">
          <h1 className="text-xl text-primary-500 font-semibold">
            Recent Transaction
          </h1>

          <Table
            isStriped
            aria-label="Example static collection table"
            className="w-full"
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>AMOUNT</TableColumn>
              <TableColumn>DESCRIPTION</TableColumn>
            </TableHeader>
            <TableBody>
              {transactions?.length !== 0 && transactions ? (
                transactions?.map((item, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item?.$id || ""}</TableCell>
                    <TableCell>
                      {formatCurrency(item?.amount, "USD") || ""}
                    </TableCell>
                    <TableCell>{item?.description || ""}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <span>No transactions found</span>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="w-full flex justify-center items-center">
            <Button
              onClick={() => navigate("/transctions/all")}
              variant="ghost"
              color="primary"
            >
              View all transactions
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
