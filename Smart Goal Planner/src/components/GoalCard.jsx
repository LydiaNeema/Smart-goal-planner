import {useOutletContext } from "react-router-dom";
function GoalCard(){
const goals = useOutletContext();
    


return(<>
return (
    <div>
      <h1>My Goals</h1>
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );

</>);
}
export default GoalCard;