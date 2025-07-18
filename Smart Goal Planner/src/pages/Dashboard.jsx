
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const { goals = [] } = useOutletContext();

  return (
    <div>
      <h1>My Dashboard</h1>
      {goals.map((goal) => {
        const saved = parseFloat(goal.savedAmount || goal.saved || 0);
        const percent = Math.round((saved / goal.targetAmount) * 100);

        return (
          <div key={goal.id}>
            <h2>{goal.name}</h2>
            <p>Target: Ksh {goal.targetAmount}</p>
            <p>Progress: {percent}%</p>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
