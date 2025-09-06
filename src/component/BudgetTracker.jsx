import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import Summary from "./Summary";
import BudgetChart from "./BudgetChart";

export default function BudgetTracker() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("https://task-tutor-server.vercel.app/api/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Budget Tracker</h1>

      {/* Form */}
      <div className="mb-6">
        <TransactionForm
          onAdd={(newTransaction) =>
            setTransactions(prev => [...prev, newTransaction]) // ✅ functional update
          }
        />
      </div>

      {/* Summary + Chart */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/2">
          <Summary transactions={transactions} />
        </div>
        <div className="md:w-1/2">
          <BudgetChart transactions={transactions} />
        </div>
      </div>

      {/* Transaction List */}
      <TransactionList
        transactions={transactions}
        setTransactions={setTransactions}
        loading={loading}
      />
    </div>
  );
}
