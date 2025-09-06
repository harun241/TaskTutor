import React from "react";
import axios from "axios";

export default function TransactionList({ transactions = [], setTransactions, loading }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-tutor-server.vercel.app/api/transactions/${id}`);
      setTransactions(prev => prev.filter(t => t._id !== id)); // ✅ functional update
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Loading transactions...</p>;
  if (transactions.length === 0) return <p className="p-4 text-gray-500">No transactions yet.</p>;

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      {transactions.map(t => {
        const type = t.type ? t.type.toUpperCase() : "UNKNOWN";
        const category = t.category || "No Category";
        const amount = t.amount ?? 0;

        return (
          <div key={t._id} className="flex justify-between mb-2 border-b pb-1">
            <span>{type} - {category}: ${amount}</span>
            <button
              onClick={() => handleDelete(t._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
