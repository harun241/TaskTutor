import { useEffect, useState } from "react";
import axios from "axios";
import ClassCard from "../component/ClassCard";


export default function Schedule() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ subject: "", day: "", time: "", instructor: "", color: "bg-blue-200" });
  const [editingId, setEditingId] = useState(null);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/classes");
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchClasses(); }, []);

  const handleAddOrUpdate = async () => {
    if (!newClass.subject || !newClass.day || !newClass.time || !newClass.instructor) return;

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/classes/${editingId}`, newClass);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3000/api/classes", newClass);
      }
      setNewClass({ subject: "", day: "", time: "", instructor: "", color: "bg-blue-200" });
      fetchClasses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/classes/${id}`);
    fetchClasses();
  };

  const handleEdit = (cls) => {
    setNewClass(cls);
    setEditingId(cls._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Class Schedule Tracker</h2>

      {/* Form */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input type="text" placeholder="Subject" value={newClass.subject} onChange={e => setNewClass({ ...newClass, subject: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Day" value={newClass.day} onChange={e => setNewClass({ ...newClass, day: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Time" value={newClass.time} onChange={e => setNewClass({ ...newClass, time: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Instructor" value={newClass.instructor} onChange={e => setNewClass({ ...newClass, instructor: e.target.value })} className="border p-2 rounded" />
        <select value={newClass.color} onChange={e => setNewClass({ ...newClass, color: e.target.value })} className="border p-2 rounded">
          <option value="bg-blue-200">Blue</option>
          <option value="bg-green-200">Green</option>
          <option value="bg-yellow-200">Yellow</option>
          <option value="bg-red-200">Red</option>
        </select>
        <button onClick={handleAddOrUpdate} className="bg-green-500 text-white px-4 py-2 rounded">{editingId ? "Update" : "Add"}</button>
      </div>

      {/* Classes List */}
      <div className="grid gap-4">
        {classes.map((cls) => <ClassCard key={cls._id} cls={cls} onDelete={handleDelete} onEdit={handleEdit} />)}
      </div>
    </div>
  );
}
