import { useEffect, useState } from "react";

export default function ExamGenerator() {
  const [questions, setQuestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 20;

  // Track which questions are open
  const [openAnswers, setOpenAnswers] = useState({});

  useEffect(() => {
    fetch("https://task-tutor-server.vercel.app/api/mcq")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const subjects = ["all", ...new Set(questions.map((q) => q.subject))];

  const filteredQuestions = questions.filter((q) => {
    return (
      (selectedDifficulty === "all" || q.difficulty === selectedDifficulty) &&
      (selectedType === "all" || q.type === selectedType) &&
      (selectedSubject === "all" || q.subject === selectedSubject)
    );
  });

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

  // Toggle open/close for a question
  const toggleAnswer = (idx) => {
    setOpenAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🎯 Exam Q&A Generator</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          value={selectedSubject}
          onChange={(e) => { setSelectedSubject(e.target.value); setCurrentPage(1); }}
          className="border p-2 rounded"
        >
          {subjects.map((subj, idx) => (
            <option key={idx} value={subj}>
              {subj === "all" ? "All Subjects" : subj}
            </option>
          ))}
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => { setSelectedDifficulty(e.target.value); setCurrentPage(1); }}
          className="border p-2 rounded"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
          className="border p-2 rounded"
        >
          <option value="all">All Types</option>
          <option value="MCQ">MCQ</option>
          <option value="TrueFalse">True/False</option>
          <option value="ShortAnswer">Short Answer</option>
        </select>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.length === 0 ? (
          <p className="text-center text-gray-500">No questions found.</p>
        ) : (
          currentQuestions.map((q, idx) => {
            const questionIndex = idx + indexOfFirstQuestion;
            const isOpen = !!openAnswers[questionIndex];

            return (
              <div
                key={questionIndex}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <h2 className="font-semibold mb-2">
                  Q{idx + 1 + indexOfFirstQuestion}. [{q.subject}] {q.question}
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
                    <span className="px-3 py-1 bg-gray-200 rounded cursor-pointer">True</span>
                    <span className="px-3 py-1 bg-gray-200 rounded cursor-pointer">False</span>
                  </div>
                )}

                {q.type === "ShortAnswer" && (
                  <input
                    type="text"
                    placeholder="Write your answer..."
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  />
                )}

                {/* Show/Hide Answer */}
                <details
                  open={isOpen}
                  onClick={(e) => { e.preventDefault(); toggleAnswer(questionIndex); }}
                  className="mt-3"
                >
                  <summary className="cursor-pointer text-blue-600 font-semibold">
                    {isOpen ? "Hide Answer" : "Show Answer"}
                  </summary>
                  <p className="mt-2 text-green-700 font-medium">{q.answer}</p>
                </details>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
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
            .filter((num) => num === 1 || num === totalPages || (num >= currentPage - 1 && num <= currentPage + 1))
            .map((num, idx, arr) => {
              const prevNum = arr[idx - 1];
              const showDot = prevNum && num - prevNum > 1;
              return (
                <span key={num} className="flex items-center">
                  {showDot && <span className="px-1">...</span>}
                  <button
                    onClick={() => goToPage(num)}
                    className={`px-3 py-1 border rounded ${num === currentPage ? "bg-blue-500 text-white" : ""}`}
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
