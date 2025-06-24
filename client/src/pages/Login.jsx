import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../services/api'

const Login = () => {
    const [form, setForm]=useState({email:'',password:''});
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({...form,[e.target.name]: e.target.value});

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axiosInstance.post('/auth/login',form);
            login(res.data.token);
            navigate('/');
        }catch(err){
            setError(err.response?.data?.message || 
                'Invalid credentials. Please try again.'
            )
        }    
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
    <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md">
    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Finance Manager Login</h2>
      <form onSubmit={handleSubmit}
      className="space-y-4">
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input name='email' placeholder='Email' value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        </div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button type='submit' className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >Login</button>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-500 hover:underline font-medium">
            Signup
          </Link>
        </p>
      </form>
    </div>
    </div>
  )
}

export default Login
