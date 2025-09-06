import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gray-50 text-gray-900 py-24">
      <div className="container mx-auto px-4 text-center md:text-left md:flex md:items-center md:justify-between gap-10">
        
        {/* Left: Text + Features */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Smart Tools for <span className="text-indigo-600">Smarter Students</span>
          </h1>
          <p className="text-lg text-gray-700">
            Plan your classes, manage your finances, and ace your exams—all in one platform.
          </p>

          {/* Feature Cards */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <div className="bg-white shadow-md rounded p-4 flex items-center gap-2">
              <span className="text-xl">📅</span>
              <span>Class Schedule Tracker</span>
            </div>
            <div className="bg-white shadow-md rounded p-4 flex items-center gap-2">
              <span className="text-xl">💰</span>
              <span>Budget Planner</span>
            </div>
            <div className="bg-white shadow-md rounded p-4 flex items-center gap-2">
              <span className="text-xl">📝</span>
              <span>Exam Q&A Generator</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to="/dashboard"
              className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/content"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50 transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co.com/Y7KcnFBQ/image.png"
            alt="Student Tools Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
