import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-cyan-700 text-white mt-10">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        {/* Left: Logo + About */}
        <div>
          <h2 className="text-2xl font-bold">
            Task<span className="text-yellow-300">Tutor</span>
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            A complete educational management platform for students, teachers,
            and administrators. Learn, manage, and grow smarter.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-yellow-300">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/teachers" className="hover:text-yellow-300">
                Teachers
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
        <div>
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
      <div className="bg-indigo-900 text-center py-3 text-sm">
        © {new Date().getFullYear()} EduManage. All rights reserved.
      </div>
    </footer>
  );
}
