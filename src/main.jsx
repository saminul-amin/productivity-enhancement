import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Statistics from "./pages/Statistics.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
