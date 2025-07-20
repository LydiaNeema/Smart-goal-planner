import {useState,useEffect} from 'react';
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
    <div
  style={{
    backgroundColor: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "2rem auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  }}
>
  <h2 style={{ marginBottom: "1rem", color: "#333" }}>
    {editingDeposit ? "Edit Deposit" : "Add Deposit"}
  </h2>

  {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

  <form onSubmit={handleSubmit} autoComplete="on">
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.3rem" }}>Amount</label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        autoComplete="off"
        style={{
          width: "100%",
          padding: "0.6rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.3rem" }}>Date</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        autoComplete="off"
        style={{
          width: "100%",
          padding: "0.6rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
    </div>

    <div style={{ marginBottom: "1.5rem" }}>
      <label style={{ display: "block", marginBottom: "0.3rem" }}>Goal</label>
      <select
        name="goalId"
        value={formData.goalId}
        onChange={handleChange}
        autoComplete="off"
        style={{
          width: "100%",
          padding: "0.6rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
    </div>

    <div style={{ display: "flex", gap: "1rem" }}>
      <button
        type="submit"
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {editingDeposit ? "Update" : "Add"} Deposit
      </button>

      {editingDeposit && (
        <button
          type="button"
          onClick={clearEditing}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      )}
    </div>
  </form>
</div>

  );
}
export default DepositForm;