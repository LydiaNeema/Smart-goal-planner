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

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        name: editingGoal.name || "",
        target: editingGoal.targetAmount || "",
        saved: editingGoal.savedAmount || "",
        deadline: editingGoal.deadline || "",
        category: editingGoal.category || ""
      });
    }
  }, [editingGoal]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      category: formData.category,
    };

    if (editingGoal) {
      onEditGoal({ ...editingGoal, ...goalData });
    } else {
      fetch("http://localhost:3000/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      })
        .then((r) => {
          if (!r.ok) throw new Error("Failed to add goal");
          return r.json();
        })
        .then((newGoal) => {
          onAddGoal(newGoal);
        })
        .catch((err) => setError(err.message));
    }

    setFormData({
      name: "",
      target: "",
      saved: "",
      deadline: "",
      category: "",
    });
    setError("");
  }

  return (
    <div>
      <h2>{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} autoComplete="on">
        <label>Name</label><br />
        <input type="text" name="name" value={formData.name} onChange={handleChange} /><br />

        <label>Target Amount</label><br />
        <input type="number" name="target" value={formData.target} onChange={handleChange} /><br />

        <label>Saved so far</label><br />
        <input type="number" name="saved" value={formData.saved} onChange={handleChange} /><br />

        <label>Deadline</label><br />
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} /><br />

        <label>Category</label><br />
        <input type="text" name="category" value={formData.category} onChange={handleChange} /><br />

        <button type="submit">
          {editingGoal ? "Update Goal" : "Add Goal"}
        </button>
      </form>
    </div>
  );
}

export default GoalForm;
