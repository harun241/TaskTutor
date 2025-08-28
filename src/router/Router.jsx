import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Schedule from "../pages/Schedule";
import BudgetTracker from "../component/BudgetTracker";
import ExamGenerator from "../component/ExamGenerator";
import StudyPlanner from "../pages/StudyPlanner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/schedule", element: <Schedule /> }, // Added Schedule page
      { path: "/budget", element: <BudgetTracker /> }, 
      { path: "/exam", element: < ExamGenerator/> },  
      { path: "/planner", element: < StudyPlanner/> }, 
    ],
  },
]);

export default router;
