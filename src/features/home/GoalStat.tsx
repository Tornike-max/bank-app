import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

import { formatCurrency } from "../../ui/formatCurrency";
import { formatDate } from "../../ui/formatDate";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";

export default function GoalStat({
  goalsData,
}: {
  goalsData: Models.Document[] | undefined;
}) {
  const navigate = useNavigate();

  const data =
    goalsData?.map((goal) => {
      return {
        goalName: goal.goalName,
        remainingAmount: goal.remainingAmount,
        goal: goal.goal,
        deadline: goal.deadline,
      };
    }) || [];

  return (
    <div className="w-full">
      <h1 className="w-full text-center text-primary-500 font-semibold text-xl py-2">
        Goals
      </h1>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>GOAL NAME</TableColumn>
          <TableColumn>REMAINING AMOUNT</TableColumn>
          <TableColumn>GOAL</TableColumn>
          <TableColumn>DEADLINE</TableColumn>
          <TableColumn>{""}</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((goal) => (
            <TableRow key={goal.deadline}>
              <TableCell>{goal.goalName}</TableCell>
              <TableCell>{formatCurrency(goal.remainingAmount, "")}</TableCell>
              <TableCell>{formatCurrency(goal.goal, "")}</TableCell>
              <TableCell>{formatDate(goal.deadline)}</TableCell>
              <TableCell>
                <Button
                  onClick={() => navigate("/goals")}
                  size="sm"
                  variant="ghost"
                  color="primary"
                >
                  Add Money
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
