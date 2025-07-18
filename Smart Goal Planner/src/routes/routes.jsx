import App from "../App.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Deposits from "../pages/Deposits.jsx";
import Goals from "../pages/Goals.jsx";
import ErrorPage from "../pages/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
             {
                path: "/",
                element: <Dashboard />
            }, 
            {
                path: "/deposits",
                element: <Deposits />
            },
            {
                path: "/goals",
                element: <Goals />
            },
           
        ]
    }
];

export default routes;