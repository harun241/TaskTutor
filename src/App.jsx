import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Schedule from "../pages/Schedule";
import BudgetTracker from "../component/BudgetTracker";
import ExamGenerator from "../component/ExamGenerator";
import StudyPlanner from "../pages/StudyPlanner";
import DashboardLayout from "../pages/Dashboard";
import PomodoroTimer from "../component/PomodoroTimer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      
      // Dashboard with nested routes
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { path: "schedule", element: <Schedule /> },
          { path: "budget", element: <BudgetTracker /> },
          { path: "exam", element: <ExamGenerator /> },
          { path: "planner", element: <StudyPlanner /> },
          { path: "pomodoro", element: <PomodoroTimer /> },
        ],
      },
    ],
  },
]);

export default router;
