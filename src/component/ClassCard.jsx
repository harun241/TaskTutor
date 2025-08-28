import React from "react";

export default function ClassCard({ cls, onDelete, onEdit }) {
  return (
    <div className={`p-4 rounded shadow ${cls.color} flex justify-between items-center`}>
      <div>
        <h3 className="font-bold text-lg">{cls.subject}</h3>
        <p className="text-sm">{cls.day} - {cls.time}</p>
        <p className="text-sm">Instructor: {cls.instructor}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(cls)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">Edit</button>
        <button onClick={() => onDelete(cls._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Delete</button>
      </div>
    </div>
  );
}
