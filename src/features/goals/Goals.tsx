import { useAuth } from "../../context/useAuth";
import { useGetGoals } from "../../hooks/goalHooks/useGetGoals";
import Loader from "../../ui/Loader";
import CreateGoal from "./CreateGoal";
import GoalsList from "./GoalsList";

export default function Goals() {
  const { user } = useAuth();
  const { goalsData, isGoalsPending } = useGetGoals(user?.id || "");

  if (isGoalsPending) return <Loader />;

  const filteredGoals = goalsData
    ?.sort(
      (a, b) =>
        new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center py-8">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <CreateGoal />

        {filteredGoals?.map((item) => (
          <GoalsList key={item.$id} item={item} />
        ))}
      </div>
    </div>
  );
}
