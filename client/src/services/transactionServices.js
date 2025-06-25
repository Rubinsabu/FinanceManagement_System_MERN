import axiosInstance from './api';

export const getTransactions = async(filters = {})=>{
    
  const query = Object.keys(filters).length                 // Only build query string if filters exist
  ? `?${new URLSearchParams(filters).toString()}`
  : '';
    const res = await axiosInstance.get(`/transactions?${query}`);
    return res.data;
}

export const addTransaction = async(transaction)=>{
    const res = await axiosInstance.post('/transactions',transaction);
    return res.data;
};

export const updateTransaction = async(id,updatedData)=>{
    const res=await axiosInstance.put(`/transactions/${id}`,updatedData);
    return res.data;
};

export const deleteTransaction = async(id) =>{
    const res= await axiosInstance.delete(`/transactions/${id}`);
    return res.data;
}

