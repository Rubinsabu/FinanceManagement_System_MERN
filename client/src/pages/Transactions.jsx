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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Transactions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-blue-100 text-gray-700 text-left text-sm uppercase">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredTransactions.map((t) => (
              <tr key={t._id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4 border font-medium">{t.title}</td>
                <td className="py-2 px-4 border">₹{t.amount}</td>
                <td className="py-2 px-4 border capitalize">{t.type}</td>
                <td className="py-2 px-4 border">{t.category}</td>
                <td className="py-2 px-4 border">{new Date(t.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/edit-transaction/${t._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
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