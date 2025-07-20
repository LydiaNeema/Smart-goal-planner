import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import DepositForm from "../components/DepositForm";
//deposits page
function Deposits() {
  //receive props from app.jsx to use
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
            return<li
  key={d.id}
  style={{
    listStyle: "none",
    padding: "1rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  }}
>
  <div style={{ flex: "1 1 auto", marginRight: "1rem" }}>
    <strong>{goal ? goal.name : "Unknown Goal"}</strong>: Ksh {d.amount} – {d.date}
  </div>

  <div style={{ display: "flex", gap: "0.5rem" }}>
    <button
      onClick={() => setEditingDeposit(d)}
      style={{
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "0.5rem 0.8rem",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Edit
    </button>

    <button
      onClick={() => handleDeleteDeposit(d)}
      style={{
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "0.5rem 0.8rem",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Delete
    </button>
  </div>
</li>

          })}
        </ul>
      </section>
    </div>
  );
}

export default Deposits;
