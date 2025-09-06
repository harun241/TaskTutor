import React, { useState } from "react";

// 60 different lessons
const lessonsData = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  title: `Lesson ${i + 1}: Topic ${i + 1}`,
  description: `This is a description for Lesson ${i + 1}. Learn about topic ${i + 1} in detail.`,
  videoId: ["Ke90Tje7VS0", "NCwa_xi0Uuc", "JJSoEo8JSnc"][i % 3], // rotating sample videos
}));

export default function LessonSearch() {
  const [query, setQuery] = useState("");

  // Split search query into keywords (space-separated)
  const keywords = query.toLowerCase().split(" ").filter(k => k);

  const filteredLessons = lessonsData.filter((lesson) => {
    // Convert title & description to lowercase
    const text = (lesson.title + " " + lesson.description).toLowerCase();

    // Check if all keywords exist in text
    return keywords.every((kw) => text.includes(kw));
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Search Lessons</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search lessons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <p className="text-center text-gray-500">No lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="border p-4 rounded-lg shadow-sm bg-white flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-2">{lesson.title}</h2>
              <p className="mb-3 text-gray-700">{lesson.description}</p>

              {/* Embedded YouTube Video with Lazy Loading */}
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.videoId}`}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"   // 👈 Lazy load enabled
                  className="w-full h-48 md:h-56 rounded"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
