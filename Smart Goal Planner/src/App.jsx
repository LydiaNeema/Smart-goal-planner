
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);

  // Fetch goals and deposits on load
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then(setGoals);

    fetch("http://localhost:3000/deposits")
      .then((r) => r.json())
      .then(setDeposits);
  }, []);

  // Add new goal
  function handleAddGoal(newGoal) {
    setGoals((prev) => [...prev, newGoal]);
  }

  // Add deposit and update savedAmount on the related goal
  function handleAddDeposit(goalId, depositAmount) {
    const goalToUpdate = goals.find((goal) => String(goal.id) === String(goalId));

    if (!goalToUpdate) return;

    const previousAmount = parseFloat(goalToUpdate.savedAmount || goalToUpdate.saved || 0);
    const newAmount = previousAmount + parseFloat(depositAmount);

    // PATCH the goal's savedAmount
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: newAmount })
    })
      .then((r) => r.json())
      .then((updatedGoal) => {
        // Update state (string-based ID comparison)
        setGoals((prev) =>
          prev.map((goal) =>
            String(goal.id) === String(updatedGoal.id) ? updatedGoal : goal
          )
        );

        // Create new deposit
        const newDeposit = {
          goalId,
          amount: depositAmount,
          date: new Date().toISOString().split("T")[0]
        };

        fetch("http://localhost:3000/deposits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newDeposit)
        })
          .then((r) => r.json())
          .then((savedDeposit) => {
            setDeposits((prev) => [...prev, savedDeposit]);
          });
      });
  }

  return (
    <div className="App">
      <NavBar />
      <Outlet context={{ goals, deposits, handleAddGoal, handleAddDeposit }} />
    </div>
  );
}

export default App;
