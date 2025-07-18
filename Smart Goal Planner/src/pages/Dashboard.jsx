import { Outlet, useOutletContext } from "react-router-dom";
import GoalCard from "../components/GoalCard.jsx";
function Dashboard() {
    const goals=useOutletContext();
  return (
    
      <div>
      <h1>My Dashboard</h1>
      {goals.map(goal => (
        <div key={goal.id}>
          <h2>{goal.name}</h2>
          <p>Target: ${goal.target}</p>
          
        </div>
      ))}
    </div>
     

  );
}

export default Dashboard;
