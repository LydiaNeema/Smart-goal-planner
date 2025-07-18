import { useOutletContext } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalCard from "../components/GoalCard";

function Goals() {
  const { goals, handleAddGoal } = useOutletContext();

  return (
    <div>
      <h1>My Goals</h1>
      <GoalForm onAddGoal={handleAddGoal} />
      {goals?.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}

export default Goals;
