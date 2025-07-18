import { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
    category: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(newGoal => {
        onAddGoal(newGoal);
        setFormData({
          name: "",
          target: "",
          saved: "",
          deadline: "",
          category: ""
        });
      });
  }

  return (
    <div>
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          autoComplete="off"
        /><br />

        <label htmlFor="target">Target Amount</label><br />
        <input
          type="text"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="Enter Target Amount"
          autoComplete="off"
        /><br />

        <label htmlFor="saved">Saved so far</label><br />
        <input
          type="text"
          id="saved"
          name="saved"
          value={formData.saved}
          onChange={handleChange}
          placeholder="Enter Saved Amount"
          autoComplete="off"
        /><br />

        <label htmlFor="deadline">Deadline</label><br />
        <input
          type="text"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          placeholder="Enter Deadline"
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

