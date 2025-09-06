import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Schedule from "../pages/Schedule";
import BudgetTracker from "../component/BudgetTracker";
import ExamGenerator from "../component/ExamGenerator";
import StudyPlanner from "../pages/StudyPlanner";
import DashboardLayout from "../pages/Dashboard";
import PomodoroTimer from "../component/PomodoroTimer";
import Contact from "../pages/Contact";
import LessonSearch from "../pages/Content";
import Notes from "../pages/Notes";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element:<Contact></Contact>  },
      { path: "/content", element:<LessonSearch></LessonSearch>  },
      { path: "/notes", element:<Notes></Notes> },

  
      
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
