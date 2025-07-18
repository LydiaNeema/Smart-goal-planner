import { useState, useEffect } from "react";

function DepositForm({ onAddDeposit }) {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    goalId: ""
  });

  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then(setGoals);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const { amount, date, goalId } = formData;

    if (!goalId || !amount || !date) {
      return "Please fill in all fields.";
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return "Amount must be a valid positive number.";
    }

    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    onAddDeposit(formData.goalId, formData.amount);
    setFormData({ amount: "", date: "", goalId: "" });
    setError(""); // clear errors
  }

  return (
    <div>
      <h2>Add Deposit</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} autoComplete="on">
        <label htmlFor="amount">Amount</label><br />
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          autoComplete="off"
        /><br />

        <label htmlFor="date">Date</label><br />
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
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
