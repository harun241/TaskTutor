import React, { useState, useEffect } from "react";

export default function StudentNotes() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  // Load notes once on mount
  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("studentNotes")) || [];
      setNotes(savedNotes);
    } catch {
      setNotes([]);
    }
  }, []);

  // Save notes whenever notes array changes
  useEffect(() => {
    localStorage.setItem("studentNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!noteInput.trim()) return;
    const newNote = { id: Date.now(), text: noteInput.trim() };
    setNotes([newNote, ...notes]);
    setNoteInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Notes</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Write a note..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={addNote}
        >
          Add
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet. Start writing!</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-white p-4 rounded-md shadow flex justify-between items-center"
            >
              <span>{note.text}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
