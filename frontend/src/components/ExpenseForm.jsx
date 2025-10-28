import { useEffect, useState } from "react";

const ExpenseForm = ({ addExp, initial, onUpdate }) => {
  const [expense, setExpense] = useState({});

  const handleChange = (e) => {
    e.stopPropagation();
    setExpense((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (initial) {
      setExpense({
        title: initial.title || "",
        amount: initial.amount || "",
        category: initial.category || "",
        date: initial.date ? initial.date.split("T")[0] : "",
      });
    }
  }, [initial]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initial && onUpdate) {
      onUpdate(initial._id, expense);
    } else {
      addExp(expense);
    }
    setExpense({ title: "", category: "", amount: "", date: "" });
  };

  return (
    // form which handle both createExpense and update functionality 
    // which make it reusable componenet
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="mb-2">
        <label className="block text-sm">Title</label>
        <input
          type="text"
          name="title"
          value={expense.title}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Amount</label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          step="0.01"
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Category</label>
        <input
          type="text"
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Date</label>
        <input
          name="date"
          value={expense.date}
          onChange={handleChange}
          type="date"
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <button
        className="px-3 py-2 rounded bg-indigo-600 text-white cursor-pointer"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default ExpenseForm;
