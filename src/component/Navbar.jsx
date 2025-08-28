import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/schedule", label: "Schedule" },
    { path: "/budget", label: "Budget-Tracker" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  return (
    <nav className="bg-cyan-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Task<span className="text-yellow-300">Tutor</span>
        </Link>

        {/* Menu Items */}
        <div className="flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-yellow-300 transition ${
                  isActive ? "text-yellow-300 font-semibold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
