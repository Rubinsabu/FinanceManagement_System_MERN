import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="text-2xl font-semibold text-indigo-300 mb-2 sm:mb-0">
        Finance Management
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
        <Link to="/" className="hover:text-indigo-400 transition duration-200 font-medium">
        Dashboard
        </Link>
        <Link to="/transactions" className="hover:text-indigo-400 transition duration-200 font-medium">
        Transactions
        </Link>
        <Link to="/add-transaction" className="hover:text-indigo-400 transition duration-200 font-medium">
        Add Transaction
        </Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition duration-200">Logout</button>
    </nav>
  );
};

export default Navbar;