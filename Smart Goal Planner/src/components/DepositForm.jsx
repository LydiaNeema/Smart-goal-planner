import { useState, useEffect } from "react";

function DepositForm({ onAddDeposit, onEditDeposit, editingDeposit, clearEditing }) {
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

  useEffect(() => {
    if (editingDeposit) {
      setFormData({
        amount: editingDeposit.amount,
        date: editingDeposit.date,
        goalId: editingDeposit.goalId,
      });
    }
  }, [editingDeposit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const { amount, date, goalId } = formData;
    if (!goalId || !amount || !date) return "Please fill in all fields.";
    if (isNaN(amount) || Number(amount) <= 0) return "Amount must be valid.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (editingDeposit) {
      onEditDeposit({ ...editingDeposit, ...formData });
      clearEditing();
    } else {
      onAddDeposit(formData.goalId, formData.amount);
    }

    setFormData({ amount: "", date: "", goalId: "" });
    setError("");
  }

  return (
    <div>
      <h2>{editingDeposit ? "Edit Deposit" : "Add Deposit"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} autoComplete="on">
        <label htmlFor="amount">Amount</label><br />
        <input
          id="amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          autoComplete="off"
        /><br />

        <label htmlFor="date">Date</label><br />
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          autoComplete="off"
        /><br />

        <label htmlFor="goalId">Goal</label><br />
        <select
          id="goalId"
          name="goalId"
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

        <button type="submit">{editingDeposit ? "Update" : "Add"} Deposit</button>
        {editingDeposit && (
          <button type="button" onClick={clearEditing}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default DepositForm;
