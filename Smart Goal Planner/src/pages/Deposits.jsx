import { useOutletContext } from "react-router-dom";
import DepositForm from "../components/DepositForm";

function Deposits() {
  const { deposits, handleAddDeposit } = useOutletContext();

  return (
    <div>
      <h1>My Deposits</h1>
      <DepositForm onAddDeposit={handleAddDeposit} />
      <ul>
        {deposits.map((d) => (
          <li key={d.id}>
            ${d.amount} - {d.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deposits;
