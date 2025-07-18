import GoalCard from "../components/GoalCard";
import { useOutletContext } from "react-router-dom";

function Goals() {
  const goals = useOutletContext();

  return (
    <div>
      <h1>My Goals</h1>
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
export default Goals;