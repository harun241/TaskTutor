import { useEffect, useState } from "react";

export default function ExamGenerator() {
  const [questions, setQuestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 20;

  // Fetch questions from backend (MongoDB)
  useEffect(() => {
    fetch("http://localhost:3000/api/mcq")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  // Get unique subjects from questions for dropdown
  const subjects = ["all", ...new Set(questions.map((q) => q.subject))];

  // Filter questions by difficulty, type & subject
  const filteredQuestions = questions.filter((q) => {
    return (
      (selectedDifficulty === "all" || q.difficulty === selectedDifficulty) &&
      (selectedType === "all" || q.type === selectedType) &&
      (selectedSubject === "all" || q.subject === selectedSubject)
    );
  });

  // Pagination calculations
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎯 Exam Q&A Generator
      </h1>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          {subjects.map((subj, idx) => (
            <option key={idx} value={subj}>
              {subj === "all" ? "All Subjects" : subj}
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => {
            setSelectedDifficulty(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="all">All Types</option>
          <option value="MCQ">MCQ</option>
          <option value="TrueFalse">True/False</option>
          <option value="ShortAnswer">Short Answer</option>
        </select>
      </div>

      {/* Questions Display */}
      <div className="space-y-6">
        {currentQuestions.length === 0 ? (
          <p className="text-center text-gray-500">No questions found.</p>
        ) : (
          currentQuestions.map((q, index) => (
            <div
              key={index + indexOfFirstQuestion}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h2 className="font-semibold mb-2">
                Q{index + 1 + indexOfFirstQuestion}. [{q.subject}] {q.question}
              </h2>

              {q.type === "MCQ" && (
                <ul className="list-disc ml-6">
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}

              {q.type === "TrueFalse" && (
                <div className="flex gap-4 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded">True</span>
                  <span className="px-3 py-1 bg-gray-200 rounded">False</span>
                </div>
              )}

              {q.type === "ShortAnswer" && (
                <p className="italic text-gray-600">Write your answer...</p>
              )}

              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600">
                  Show Answer
                </summary>
                <p className="mt-2 text-green-700 font-medium">{q.answer}</p>
              </details>
            </div>
          ))
        )}
      </div>

      {/* Official-style Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((num) => {
              // Always show first, last, current, and neighbors
              return (
                num === 1 ||
                num === totalPages ||
                (num >= currentPage - 1 && num <= currentPage + 1)
              );
            })
            .map((num, idx, arr) => {
              const prevNum = arr[idx - 1];
              const showDot = prevNum && num - prevNum > 1;
              return (
                <span key={num} className="flex items-center">
                  {showDot && <span className="px-1">...</span>}
                  <button
                    onClick={() => goToPage(num)}
                    className={`px-3 py-1 border rounded ${
                      num === currentPage ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {num}
                  </button>
                </span>
              );
            })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
