import React from 'react';
function GoalCard({goal}){
     const { name, target, saved, deadline, category } = goal;

  const percent = (saved / target) * 100;
    

return (
    <div className="goal-card">
      <h2>{name}</h2>
      <p>Category: {category}</p>
      <p>Target: ${target}</p>
      <p>Saved: ${saved}</p>
      <p>Deadline: {deadline}</p>
      <progress value={saved} max={target}></progress>
      <p>{percent.toFixed(2)}% complete</p>
    </div>
  );


}
export default GoalCard;