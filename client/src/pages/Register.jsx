import React, { useState } from 'react';
import axiosInstance from '../services/api';
import {useNavigate, Link} from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({name:'', email:'', password:''});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          await axiosInstance.post('/auth/register',form);
          navigate('/login');
        }catch(err){
          console.log(err.response?.data?.message || 'Registration failed')
        }
        
    };
    
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input name='name' placeholder='Name' value={form.name} onChange={handleChange} required className="w-full mb-4 p-2 border rounded"/>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full mb-4 p-2 border rounded"/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full mb-4 p-2 border rounded"/>
        <button type='submit' className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >Register</button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
