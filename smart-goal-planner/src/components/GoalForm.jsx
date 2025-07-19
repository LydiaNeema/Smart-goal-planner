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
    <div>
      <h2>{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} autoComplete="on">
        <label htmlFor="name">Name</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
        /><br />

        <label htmlFor="target">Target Amount</label><br />
        <input
          type="number"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="Enter Target Amount"
        /><br />

        <label htmlFor="saved">Saved so far</label><br />
        <input
          type="number"
          id="saved"
          name="saved"
          value={formData.saved}
          onChange={handleChange}
          placeholder="Enter Saved Amount"
        /><br />

        <label htmlFor="deadline">Deadline</label><br />
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        /><br />

        <label htmlFor="category">Category</label><br />
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter Category"
        /><br />

        <button type="submit">
          {editingGoal ? "Update Goal" : "Add Goal"}
        </button>
      </form>
    </div>
  );
}

export default GoalForm;
