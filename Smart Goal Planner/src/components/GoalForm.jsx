import { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
    category: ""
  });

  const [error, setError] = useState("");

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

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        target: Number(formData.target),
        saved: Number(formData.saved)
      })
    })
      .then(r => {
        if (!r.ok) throw new Error("Failed to add goal");
        return r.json();
      })
      .then(newGoal => {
        onAddGoal(newGoal);
        setFormData({
          name: "",
          target: "",
          saved: "",
          deadline: "",
          category: ""
        });
        setError(""); // clear any error
      })
      .catch(err => setError(err.message));
  }

  return (
    <div>
      <h2>Add New Goal</h2>

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
          autoComplete="name"
        /><br />

        <label htmlFor="target">Target Amount</label><br />
        <input
          type="number"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="Enter Target Amount"
          autoComplete="off"
        /><br />

        <label htmlFor="saved">Saved so far</label><br />
        <input
          type="number"
          id="saved"
          name="saved"
          value={formData.saved}
          onChange={handleChange}
          placeholder="Enter Saved Amount"
          autoComplete="off"
        /><br />

        <label htmlFor="deadline">Deadline</label><br />
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          autoComplete="off"
        /><br />

        <label htmlFor="category">Category</label><br />
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter Category"
          autoComplete="off"
        /><br />

        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;
