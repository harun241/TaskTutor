import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetChart({ transactions = [] }) {
  const totalIncome = transactions
    ?.filter(t => t.type === "income")
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const totalExpense = transactions
    ?.filter(t => t.type === "expense")
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  if (totalIncome === 0 && totalExpense === 0) {
    return <p className="p-4 border rounded mt-4">No transactions to display chart.</p>;
  }

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Budget",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#3B82F6", "#F59E0B"], // Blue & Orange
        borderColor: ["#1E40AF", "#B45309"], // Dark Blue & Dark Orange
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-lg font-bold mb-2">Budget Chart</h2>
      <Pie data={data} />
    </div>
  );
}
