import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTransactions, updateTransaction } from '../services/transactionServices';
import TransactionForm from '../components/TransactionForm';
import React from 'react'

const EditTransaction = () => {

    const { id } = useParams(); //id received here
    const [transaction, setTransaction] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
          const all = await getTransactions();
          const found = all.find((t) => t._id === id);
          setTransaction(found);
        };
        fetchTransaction();
      }, [id]);

      const handleUpdate = async (formData) => {
        await updateTransaction(id, formData);
        navigate('/transactions');
      };

      if (!transaction) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
      <TransactionForm editData={transaction} onSubmit={handleUpdate} />
    </div>
  );
}

export default EditTransaction