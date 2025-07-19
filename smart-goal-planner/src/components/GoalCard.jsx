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
    <div className="goal-card">
      <h2>{name}</h2>
      <p>Category: {category}</p>
      <p>Target: Ksh {targetAmount}</p>
      <p>Saved: Ksh {savedTotal}</p>
      <p>Deadline: {deadline}</p>
      <progress value={savedTotal} max={targetAmount}></progress>
      <p>{percent.toFixed(2)}% complete</p>

      <button onClick={() => onEdit(goal)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default GoalCard;
