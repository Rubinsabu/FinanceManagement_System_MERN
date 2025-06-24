import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ChartComponent = ({ transactions }) => {
  const income = transactions.filter(t => t.type === 'income');
  const expense = transactions.filter(t => t.type === 'expense');

  const categoryTotals = {};
  expense.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const monthlyTotals = {};
  transactions.forEach(t => {
    const date = new Date(t.date); // Ensure it's a proper Date object
    if (!isNaN(date)) {
      const month = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount * (t.type === 'expense' ? -1 : 1);
    }
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'],
      }
    ]
  };

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: 'Monthly Net Total',
        data: Object.values(monthlyTotals),
        backgroundColor: '#3b82f6',
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Expenses by Category (Pie Chart)</h3>
        <div className="w-90 h-90 mx-auto">
          <Pie data={pieData} />
          </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Monthly Trends (Bar Chart)</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default ChartComponent;