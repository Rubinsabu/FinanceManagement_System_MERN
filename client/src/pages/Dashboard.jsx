import React,{useState, useEffect} from 'react';
import axiosInstance from '../services/api';
import ChartComponent from '../components/ChartComponent'
import { getTransactions } from '../services/transactionServices';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [alert, setAlert] = useState('');
    const monthlyLimit = 50000; // Hardcoded

    useEffect(() => {
        const fetchData = async () => {
          const transactions = await getTransactions(); // Using the service function
          setTransactions(transactions);
        };
        fetchData();
      }, []);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthExpenses = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const monthlyExpense = thisMonthExpenses.reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  useEffect(() => {
    if (monthlyExpense > monthlyLimit) {
      setAlert(`⚠️ Monthly expense exceeded ₹${monthlyLimit}! Current: ₹${monthlyExpense}`);
    } else {
      setAlert('');
    }
  }, [monthlyExpense]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      {alert && <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">{alert}</div>}
      <div className="flex gap-6 mb-6">
        <div className="p-4 bg-green-100 rounded shadow w-1/2">Total Income: ₹{totalIncome}</div>
        <div className="p-4 bg-red-100 rounded shadow w-1/2">Total Expense: ₹{totalExpense}</div>
        <div className="p-4 bg-orange-100 rounded shadow w-1/2">Balance: ₹{balance}</div>
      </div>
      <ChartComponent transactions={transactions} />
    </div>
  )
}

export default Dashboard