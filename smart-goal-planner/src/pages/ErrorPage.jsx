import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
  <h1 style={{ color: "#e63946" }}>Oops! Something went wrong.</h1>
  <p>Please try again or refresh the page.</p>
</main>

  );
};

export default ErrorPage;
