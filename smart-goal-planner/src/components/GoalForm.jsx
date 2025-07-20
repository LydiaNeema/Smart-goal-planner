import { useState, useEffect } from "react";

function GoalForm({ onAddGoal, onEditGoal, editingGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
    category: ""
  });

  const [error, setError] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (editingGoal) {
      setFormData({
        name: editingGoal.name || "",
        target: editingGoal.targetAmount || editingGoal.target || "",
        saved: editingGoal.savedAmount || editingGoal.saved || "",
        deadline: editingGoal.deadline || "",
        category: editingGoal.category || ""
      });
    }
  }, [editingGoal]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function validateForm() {
    const { name, target, saved, deadline, category } = formData;

    if (!name || !target || !saved || !deadline || !category) {
      return "All fields are required.";
    }

    if (isNaN(target) || isNaN(saved)) {
      return "Target and Saved amounts must be numbers.";
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

    const goalData = {
      name: formData.name,
      targetAmount: Number(formData.target),
      savedAmount: Number(formData.saved),
      deadline: formData.deadline,
      category: formData.category
    };

    if (editingGoal) {
      // Call edit handler
      onEditGoal({ ...editingGoal, ...goalData });
    } else {
      // Call add handler
      fetch("http://localhost:3000/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData)
      })
        .then(r => {
          if (!r.ok) throw new Error("Failed to add goal");
          return r.json();
        })
        .then(newGoal => {
          onAddGoal(newGoal);
        })
        .catch(err => setError(err.message));
    }

    // Clear form
    setFormData({
      name: "",
      target: "",
      saved: "",
      deadline: "",
      category: ""
    });
    setError("");
  }

  return (
    <div style={{
  border: "1px solid #ccc",
  padding: "1.5rem",
  borderRadius: "10px",
  maxWidth: "500px",
  margin: "2rem auto",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)"
}}>
  <h2 style={{ marginBottom: "1rem", color: "#333" }}>
    {editingGoal ? "Edit Goal" : "Add New Goal"}
  </h2>

  {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

  <form onSubmit={handleSubmit} autoComplete="on">
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="name">Name</label><br />
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter Name"
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="target">Target Amount</label><br />
      <input
        type="number"
        id="target"
        name="target"
        value={formData.target}
        onChange={handleChange}
        placeholder="Enter Target Amount"
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="saved">Saved so far</label><br />
      <input
        type="number"
        id="saved"
        name="saved"
        value={formData.saved}
        onChange={handleChange}
        placeholder="Enter Saved Amount"
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="deadline">Deadline</label><br />
      <input
        type="date"
        id="deadline"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>

    <div style={{ marginBottom: "1.5rem" }}>
      <label htmlFor="category">Category</label><br />
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Enter Category"
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>

    <button type="submit" style={{
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "6px",
      fontSize: "1rem",
      cursor: "pointer"
    }}>
      {editingGoal ? "Update Goal" : "Add Goal"}
    </button>
  </form>
</div>

  );
}

export default GoalForm;
