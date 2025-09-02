// src/pages/StudyPlanner.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudyPlanner() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    topic: "",
    priority: "Medium",
    day: "",
    allocatedTime: "",
    deadline: "",
  });

  // Fetch tasks
  useEffect(() => {
    axios.get("https://task-tutor-server.vercel.app/api/study-tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle input change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new task
  const handleAdd = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("https://task-tutor-server.vercel.app/api/study-tasks", form);
      setTasks([...tasks, res.data]);
      setForm({ subject: "", topic: "", priority: "Medium", day: "", allocatedTime: "", deadline: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-tutor-server.vercel.app/api/study-tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Study Planner</h1>

      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="border p-2 rounded" required/>
        <input name="topic" value={form.topic} onChange={handleChange} placeholder="Topic" className="border p-2 rounded"/>
        <select name="priority" value={form.priority} onChange={handleChange} className="border p-2 rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input name="day" value={form.day} onChange={handleChange} placeholder="Day (e.g., Monday)" className="border p-2 rounded"/>
        <input name="allocatedTime" value={form.allocatedTime} onChange={handleChange} placeholder="Time (e.g., 2h)" className="border p-2 rounded"/>
        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} className="border p-2 rounded"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-full">Add Task</button>
      </form>

      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{task.subject} - {task.topic}</h2>
              <p>Priority: {task.priority} | Day: {task.day} | Time: {task.allocatedTime} | Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A"}</p>
            </div>
            <button onClick={() => handleDelete(task._id)} className="text-red-500 font-bold">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
