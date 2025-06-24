import TransactionForm from '../components/TransactionForm';

import React from 'react'

const AddTransaction = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
      <TransactionForm />
    </div>
  );
}

export default AddTransaction