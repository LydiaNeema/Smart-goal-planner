function GoalCard({ goal, onDelete, onEdit }) {
  const {
    id,
    name,
    targetAmount,
    savedAmount,
    deadline,
    category
  } = goal;

  const savedTotal = parseFloat(savedAmount || 0);
  const percent = targetAmount ? (savedTotal / targetAmount) * 100 : 0;

  return (
    <div style={{
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "1.5rem",
  marginBottom: "1rem",
  backgroundColor: "#fdfdfd",
  boxShadow: "0 0 8px rgba(0,0,0,0.05)",
  maxHeight:"300px"
  
}}>
  <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>{name}</h2>
  <p style={{ margin: "0.25rem 0" }}><strong>Category:</strong> {category}</p>
  <p style={{ margin: "0.25rem 0" }}><strong>Target:</strong> Ksh {targetAmount}</p>
  <p style={{ margin: "0.25rem 0" }}><strong>Saved:</strong> Ksh {savedTotal}</p>
  <p style={{ margin: "0.25rem 0" }}><strong>Deadline:</strong> {deadline}</p>
  
  <progress
    value={savedTotal}
    max={targetAmount}
    style={{ width: "100%", height: "20px", margin: "0.75rem 0" }}
  ></progress>

  <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>{percent.toFixed(2)}% complete</p>

  <div style={{ display: "flex", gap: "1rem" }}>
    <button
      onClick={() => onEdit(goal)}
      style={{
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Edit
    </button>
    
    <button
      onClick={() => onDelete(id)}
      style={{
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Delete
    </button>
  </div>
</div>

  );
}

export default GoalCard;
