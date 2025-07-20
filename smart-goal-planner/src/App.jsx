import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
// in app.jsx all functionalities needed in the page are declared here and passed down to the children as props using outlet
//data is fetched here
function App() {
  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    fetch("https://json-server-deployment-d96k.onrender.com/goals")
      .then((r) => r.json())
      .then(setGoals);

    fetch("https://json-server-deployment-d96k.onrender.com/deposits")
      .then((r) => r.json())
      .then(setDeposits);
  }, []);

  function handleAddGoal(newGoal) {
    setGoals((prev) => [...prev, newGoal]);
  }

  function handleEditGoal(updatedGoal) {
    fetch(`https://json-server-deployment-d96k.onrender.com/goals/${updatedGoal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    })
      .then((r) => r.json())
      .then((newGoal) => {
        setGoals((prev) =>
          prev.map((goal) => (goal.id === newGoal.id ? newGoal : goal))
        );
      });
  }

  function handleDeleteGoal(id) {
  const confirmed = window.confirm("Are you sure you want to delete this goal?");
  if (!confirmed) return;

  fetch(`https://json-server-deployment-d96k.onrender.com/goals/${id}`, {
    method: "DELETE",
  }).then(() => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  });
}

  function handleAddDeposit(goalId, depositAmount) {
    const goalToUpdate = goals.find((goal) => String(goal.id) === String(goalId));
    if (!goalToUpdate) return;

    const previousAmount = parseFloat(goalToUpdate.savedAmount || 0);
    const newAmount = previousAmount + parseFloat(depositAmount);

    fetch(`https://json-server-deployment-d96k.onrender.com/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: newAmount }),
    })
      .then((r) => r.json())
      .then((updatedGoal) => {
        setGoals((prev) =>
          prev.map((goal) =>
            String(goal.id) === String(updatedGoal.id) ? updatedGoal : goal
          )
        );

        const newDeposit = {
          goalId,
          amount: depositAmount,
          date: new Date().toISOString().split("T")[0],
        };

        fetch("https://json-server-deployment-d96k.onrender.com/deposits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newDeposit),
        })
          .then((r) => r.json())
          .then((savedDeposit) => {
            setDeposits((prev) => [...prev, savedDeposit]);
          });
      });
  }
function handleEditDeposit(updatedDeposit) {
  // First, update the deposit in the DB
  fetch(`https://json-server-deployment-d96k.onrender.com/deposits/${updatedDeposit.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedDeposit),
  })
    .then((r) => r.json())
    .then((savedDeposit) => {
      // Update local deposits state
      setDeposits((prev) =>
        prev.map((d) => (d.id === savedDeposit.id ? savedDeposit : d))
      );
    });
}

function handleDeleteDeposit(deposit) {
  const confirmed = window.confirm("Are you sure you want to delete this deposit?");
  if (!confirmed) return;

  fetch(`https://json-server-deployment-d96k.onrender.com/deposits/${deposit.id}`, {
    method: "DELETE",
  }).then(() => {
    // Subtract deposit amount from goal’s savedAmount
    const goal = goals.find((g) => String(g.id) === String(deposit.goalId));
    if (goal) {
      const newSaved = parseFloat(goal.savedAmount) - parseFloat(deposit.amount);

      fetch(`https://json-server-deployment-d96k.onrender.com/goals/${goal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedAmount: newSaved }),
      })
        .then((r) => r.json())
        .then((updatedGoal) => {
          setGoals((prev) =>
            prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
          );
        });
    }

    setDeposits((prev) => prev.filter((d) => d.id !== deposit.id));
  });
}

  return (
    <div className="App">
      <NavBar />
      <Outlet
        context={{
          goals,
          setGoals,
          deposits,
          handleAddGoal,
          handleEditGoal,
          handleDeleteGoal,
          handleAddDeposit,
          handleEditDeposit, 
    handleDeleteDeposit
        }}
      />
    </div>
  );
}

export default App;
