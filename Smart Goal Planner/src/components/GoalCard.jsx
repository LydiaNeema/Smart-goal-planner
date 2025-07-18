
import React from 'react';

function GoalCard({ goal }) {
  const {
    name,
    targetAmount,
    savedAmount,
    saved, // fallback if needed
    deadline,
    category
  } = goal;

  const savedTotal = parseFloat(savedAmount || saved || 0);
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
    </div>
  );
}

export default GoalCard;
