import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import GoalForm from "../components/GoalForm";
import GoalCard from "../components/GoalCard";
//function goal page
function Goals() {
  //passed props from app.jsx
  const {
    goals,
    handleAddGoal,
    handleEditGoal,
    handleDeleteGoal,
  } = useOutletContext();

  const [editingGoal, setEditingGoal] = useState(null);

  return (
    <div>
      <h1>My Goals</h1>

      <GoalForm
        onAddGoal={handleAddGoal}
        onEditGoal={handleEditGoal}
        editingGoal={editingGoal}
      />

      {goals?.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={handleDeleteGoal}
          onEdit={setEditingGoal}
        />
      ))}
    </div>
  );
}

export default Goals;
