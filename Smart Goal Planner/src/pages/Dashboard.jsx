import { useOutletContext } from "react-router-dom";
import { useMemo } from "react";

function Dashboard() {
  const { goals = [] } = useOutletContext();

  // Total number of goals
  const totalGoals = goals.length;

  // Total saved across all goals
  const totalSaved = goals.reduce((sum, goal) => sum + (parseFloat(goal.savedAmount) || 0), 0);

  // Completed goals
  const completedGoals = goals.filter(goal => parseFloat(goal.savedAmount) >= parseFloat(goal.targetAmount)).length;

  // Helper function to calculate days left
  function getDaysLeft(deadline) {
    const today = new Date();
    const end = new Date(deadline);
    const diff = end - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <div>
      <h1>My Dashboard</h1>

      {/* Overview Section */}
      <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", marginBottom: "2rem", borderRadius: "8px" }}>
        <h2>Overview</h2>
        <p><strong>Total Goals:</strong> {totalGoals}</p>
        <p><strong>Total Saved:</strong> Ksh {totalSaved.toLocaleString()}</p>
        <p><strong>Goals Completed:</strong> {completedGoals}</p>
      </div>

      {/* Goals List */}
      {goals.map((goal) => {
        const {
          id,
          name,
          targetAmount,
          savedAmount,
          deadline
        } = goal;

        const progress = Math.round((savedAmount / targetAmount) * 100);
        const daysLeft = getDaysLeft(deadline);
        const isComplete = savedAmount >= targetAmount;
        const isWarning = daysLeft <= 30 && !isComplete && daysLeft > 0;
        const isOverdue = daysLeft < 0 && !isComplete;

        return (
          <div key={id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "6px" }}>
            <h2>{name}</h2>
            <p><strong>Target:</strong> Ksh {targetAmount}</p>
            <p><strong>Saved:</strong> Ksh {savedAmount}</p>
            <p><strong>Progress:</strong> {progress}%</p>
            <p><strong>Time Left:</strong> {daysLeft > 0 ? `${daysLeft} day(s) remaining` : isOverdue ? "Deadline passed" : "Today"}</p>

            {isWarning && <p style={{ color: "orange" }}>⚠️ Warning: Less than 30 days left!</p>}
            {isOverdue && <p style={{ color: "red" }}>❗Overdue: Goal deadline has passed.</p>}
            {isComplete && <p style={{ color: "green" }}>✅ Goal Completed!</p>}
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
