import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-cyan-700 text-white mt-10">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Logo + About */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">
            Task<span className="text-yellow-300">Tutor</span>
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            A complete educational management platform for students, teachers,
            and administrators. Learn, manage, and grow smarter.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div className="flex flex-col mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/schedule" className="hover:text-yellow-300">
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/dashboard/budget" className="hover:text-yellow-300">
                Budget Tracker
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-yellow-300">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Social Media */}
        <div className="flex flex-col mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-xl hover:text-yellow-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-xl hover:text-yellow-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-xl hover:text-yellow-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center py-3 text-sm border-t border-cyan-600 mt-4">
        © {new Date().getFullYear()} Task-Tutor. All rights reserved.
      </div>
    </footer>
  );
}
