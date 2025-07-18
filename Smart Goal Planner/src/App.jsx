import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then(r => r.json())
      .then(data => setGoals(data));
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet context={goals} />
    </>
  );
}

export default App;
