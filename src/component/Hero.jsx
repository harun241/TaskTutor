import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gray-50 text-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left: Text + Features */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Smart Tools for <span className="text-indigo-600">Smarter Students</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Plan your classes, manage your finances, and ace your exams—all in one platform.
          </p>

          {/* Feature Cards */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <div className="bg-white shadow-md rounded p-4 flex items-center gap-2">
              <span className="text-xl">📅</span>
              <span className="text-sm sm:text-base">Class Schedule Tracker</span>
            </div>
            <div className="bg-white shadow-md rounded p-4 flex items-center gap-2">
              <span className="text-xl">💰</span>
              <span className="text-sm sm:text-base">Budget Planner</span>
            </div>
            <div className="bg-white shadow-md rounded p-4 flex items-center gap-2">
              <span className="text-xl">📝</span>
              <span className="text-sm sm:text-base">Exam Q&A Generator</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/dashboard"
              className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition w-full sm:w-auto text-center"
            >
              Get Started
            </Link>
            <Link
              to="/content"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50 transition w-full sm:w-auto text-center"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://i.ibb.co.com/Y7KcnFBQ/image.png"
            alt="Student Tools Illustration"
            className="w-3/4 sm:w-2/3 md:w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
