import React from "react";
import axios from "axios";

export default function TransactionList({ transactions = [], setTransactions }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/transactions/${id}`);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        transactions.map((t, index) => (
          <div key={t._id || index} className="flex justify-between mb-2 border-b pb-1">
            <span>
              {(t.type || "unknown").toUpperCase()} - {(t.category || "No Category")}: ${t.amount || 0}
            </span>
            <button onClick={() => handleDelete(t._id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
