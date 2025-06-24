const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async(req,res)=>{
    const {name, email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists)
            res.status(400).json({message:'Email already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = await User.create({name,email,password:hashedPassword});
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(201).json({token});


    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const login = async(req,res)=>{

    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message:'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message:'Invalid credentials'})

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).json({token});

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports={
    register,
    login
}