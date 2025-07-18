import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then(setGoals);

    fetch("http://localhost:3000/deposits")
      .then((r) => r.json())
      .then(setDeposits);
  }, []);

  // Add new goal to state
  function handleAddGoal(newGoal) {
    setGoals((prev) => [...prev, newGoal]);
  }

  // Add new deposit to state
  function handleAddDeposit(goalId, amount) {
  setGoals((prevGoals) =>
    prevGoals.map((goal) =>
      goal.id === parseInt(goalId)
        ? { ...goal, savedAmount: goal.savedAmount + Number(amount) }
        : goal
    )
  );

  // Optional: Post a new deposit to keep the /deposits log alive
  fetch("http://localhost:3000/deposits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goalId, amount, date: new Date().toISOString().slice(0, 10) }),
  });
}


  return (
    <div className="App">
        <NavBar />
      <Outlet context={{ goals,deposits, handleAddGoal, handleAddDeposit }} />

    </div>
  );
}

export default App;
