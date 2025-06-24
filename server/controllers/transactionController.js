const Transaction = require('../models/Transaction');

const addTransaction = async(req,res)=>{
    const {title,amount,type,category,date}=req.body;

    try{
        const transaction = await Transaction.create({
            user: req.user._id,
            title,
            amount,
            type,
            category,
            date
        });
        res.status(201).json(transaction);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const getTransactions = async(req,res)=>{
    const {category, startDate, endDate}= req.query;
    let filter = {user: req.user._id}
    if(category)
        filter.category = category;
    if(startDate && endDate)
        filter.date = {$gte: new Date(startDate), $lte: new Date(endDate)};
    try{
        const transactions = await Transaction.find(filter).sort({date:-1});
        res.status(200).json(transactions);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}
const updateTransaction  = async(req,res)=>{
    const {id} = req.params;
    try{
        const transaction = await Transaction.findOneAndUpdate(
            {_id: id, user: req.user._id},
            req.body,
            {new: true}
        );
        if(!transaction)
            return res.status(404).json({message: 'Transaction not found'});
        res.status(200).json(transaction);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const deleteTransaction = async(req,res)=>{
    const {id}= req.params;
    try{

        const transaction = await Transaction.findOneAndDelete({_id:id, user: req.user._id});
        if(!transaction)
            return res.status(404).json({message:'Transaction not found'});
        res.status(200).json({message:'Transaction deleted'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    addTransaction,
    updateTransaction,
    getTransactions,
    deleteTransaction
}