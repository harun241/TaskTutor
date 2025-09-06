import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react"; // arrow icons

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Class Schedule", path: "/dashboard/schedule" },
    { name: "Budget Tracker", path: "/dashboard/budget" },
    { name: "Exam Q&A", path: "/dashboard/exam" },
    { name: "Study Planner", path: "/dashboard/planner" },
    { name: "Pomodoro Timer", path: "/dashboard/pomodoro" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <button
        className="absolute top-4 left-4 md:hidden z-50 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-6">Student Dashboard</h1>
        <nav className="flex flex-col space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)} // close sidebar on click
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

      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto md:ml-0">
        <Outlet />
      </main>
    </div>
  );
}
