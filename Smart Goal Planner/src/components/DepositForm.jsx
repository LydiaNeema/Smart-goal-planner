import { useState, useEffect } from "react";

function DepositForm({ onAddDeposit }) {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    goalId: ""
  });

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then(setGoals);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.goalId || !formData.amount || !formData.date) {
      alert("Please fill in all fields.");
      return;
    }
    onAddDeposit(formData.goalId, formData.amount);
    setFormData({ amount: "", date: "", goalId: "" });
  }

  return (
    <div>
      <h2>Add Deposit</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label><br />
        <input
          type="text"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          autoComplete="off"
        /><br />

        <label htmlFor="date">Date</label><br />
        <input
          type="text"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Enter Date"
          autoComplete="off"
        /><br />

        <label htmlFor="goalId">Goal</label><br />
        <select
          name="goalId"
          id="goalId"
          value={formData.goalId}
          onChange={handleChange}
          autoComplete="off"
        >
          <option value="">Select Goal</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select><br />

        <button type="submit">Add Deposit</button>
      </form>
    </div>
  );
}

export default DepositForm;
