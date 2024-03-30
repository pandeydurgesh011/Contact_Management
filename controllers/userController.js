const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const User = require('../models/userModel.js');
const jwt = require("jsonwebtoken");
const { use } = require('../routes/userRoutes.js');


const createUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
         throw new Error("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,email,password:hashedPassword
    })
    if(user){
        res.status(201).json({_id: user.id, username: user.username, email: user.email})
    }
    else{
        res.status(400);
        throw new Error("User data is not Valid");
    }
}) 

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("Email and password is required to login");
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1m"})
        res.status(201).json({accessToken})
    }
    else{
        res.status(400);
        throw new Error("User Does not exists or password incorrect")
    }
})

module.exports = {createUser,loginUser}