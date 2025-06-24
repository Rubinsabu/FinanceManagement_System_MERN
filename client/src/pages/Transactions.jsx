import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions, deleteTransaction } from '../services/transactionServices';


const Transactions = () => {

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
      fetchTransactions();
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    return (
      (!search || t.title.toLowerCase().includes(search.toLowerCase())) &&
      (!categoryFilter || t.category.toLowerCase().includes(categoryFilter.toLowerCase())) &&
      (!dateFilter || new Date(t.date).toISOString().slice(0, 10) === dateFilter) 
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Transactions</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t._id}>
                <td className="py-2 px-4 border">{t.title}</td>
                <td className="py-2 px-4 border">₹{t.amount}</td>
                <td className="py-2 px-4 border capitalize">{t.type}</td>
                <td className="py-2 px-4 border">{t.category}</td>
                <td className="py-2 px-4 border">{new Date(t.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => navigate(`/edit-transaction/${t._id}`)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <p className="mt-4 text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  )
};

export default Transactions