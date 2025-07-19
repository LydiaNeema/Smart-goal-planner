import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import DepositForm from "../components/DepositForm";

function Deposits() {
  const {
    deposits,
    goals,
    handleAddDeposit,
    handleEditDeposit,
    handleDeleteDeposit,
  } = useOutletContext();

  const [editingDeposit, setEditingDeposit] = useState(null);

  return (
    <div>
      <h1>My Deposits</h1>

      <section>
        <DepositForm
          onAddDeposit={handleAddDeposit}
          onEditDeposit={handleEditDeposit}
          editingDeposit={editingDeposit}
          clearEditing={() => setEditingDeposit(null)}
        />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Recent Deposits</h2>
        <ul>
          {deposits.map((d) => {
            const goal = goals.find((g) => String(g.id) === String(d.goalId));
            return (
              <li key={d.id}>
                <strong>{goal ? goal.name : "Unknown Goal"}</strong>: ${d.amount} - {d.date}
                <button onClick={() => setEditingDeposit(d)}>Edit</button>
                <button onClick={() => handleDeleteDeposit(d)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Deposits;
