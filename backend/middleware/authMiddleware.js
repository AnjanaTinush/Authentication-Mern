const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler (async(req,res,next)=>{

    try {

        const token = req.cookies.token
        if(!token){
            res.status(401);
            throw new Error("Not authorize, pleace login")
        }
        
        //Verify token
        const verified=jwt.verify(token,process.env.JWT_SECRET)
        //Get user id from token 
        const user= await User.findById(verified.id).select("-password")

        if(!user){
            res.status(401);
            throw new Error("User not found")
        }

        if(user.role === 'suspended'){
            res.status(400);
            throw new Error("User suspended pleace contact suport")
        }

        req.user=user
        next()

        
    } catch (error) {
        res.status(401);
        throw new Error("Not authorize, pleace login")
    }
})

const adminonly = asyncHandler( async(req,res,next) => {
    if(req.user && req.user.role =="admin"){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
})

const authornonly =asyncHandler (async(req,res,next) => {
    if(req.user.role =="author" || req.user.role =="admin"){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as an autho")
    }
})

const verifiedonly =asyncHandler (async(req,res,next) => {
    if(req.user && req.user.isVerified ){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized, account not verified")
    }
})

module.exports={
    protect,
    adminonly,
    authornonly,
    verifiedonly,
}