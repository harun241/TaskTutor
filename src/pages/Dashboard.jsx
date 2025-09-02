import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const links = [
    { name: "Class Schedule", path: "/dashboard/schedule" },
    { name: "Budget Tracker", path: "/dashboard/budget" },
    { name: "Exam Q&A", path: "/dashboard/exam" },
    { name: "Study Planner", path: "/dashboard/planner" },
    { name: "Pomodoro Timer", path: "/dashboard/pomodoro" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Student Dashboard</h1>
        <nav className="flex flex-col space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium hover:bg-gray-200 ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
