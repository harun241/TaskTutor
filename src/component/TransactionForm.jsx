import React, { useState } from "react";
import axios from "axios";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) return;

    const transaction = { type, category, amount: Number(amount), date: new Date() };
    setLoading(true);
    try {
      const res = await axios.post(
        "https://task-tutor-server.vercel.app/api/transactions",
        transaction
      );
      onAdd(res.data); // ✅ instant update
      setCategory("");
      setAmount("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded">
      <select value={type} onChange={e => setType(e.target.value)} className="p-2 border rounded">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded ${loading ? "opacity-50" : ""}`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
