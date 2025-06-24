import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../services/transactionServices";

import React from 'react'

const TransactionForm = ({editData=null, onSubmit}) => {

    const [form, setForm] = useState(
        editData || { title: '', amount: '', type: 'expense', category: '', date: '' }
      );
    const navigate = useNavigate();

    useEffect(() => {
        if (editData) setForm(editData);
      }, [editData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSubmit) {
          await onSubmit(form);
        } else {
          await addTransaction(form);
          navigate('/transactions');
        }
      };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
      {['title', 'amount', 'category', 'date'].map((field) => (
        <input
          key={field}
          name={field}
          value={
            field === 'date' && form.date ? 
            new Date(form.date).toISOString().split('T')[0] : form[field]
          }
          onChange={handleChange}
          placeholder={field}
          className="w-full p-2 border rounded"
          required
          type={field === 'amount' ? 'number' : field === 'date' ? 'date' : 'text'}
        />
      ))}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {editData ? 'Update' : 'Add'} Transaction
      </button>
    </form>
  );
};

export default TransactionForm