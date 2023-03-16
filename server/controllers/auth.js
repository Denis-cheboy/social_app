const User=require("../models/User")
const createError = require("../utils/createError")
const { registerValidation, loginValidation } = require("../utils/inputValidations")
const { hash, comparePassword } = require("../utils/passwordHashing")

const register=async(req,res,next)=>{
    try{
     const {error}=registerValidation(req.body)
     if(error) return next(createError(400,error.details[0].message))
     const {username,email,password,profilePic}=req.body
     const hashPassword=await hash(password)
     const newUser=await User.create({
        username:username,
        email:email,
        password:hashPassword,
        profilePic:profilePic
     })
     return res.status(201).json(newUser)
    }
    catch(err){
        next(err)
    }
}

const login=async(req,res,next)=>{
    try{
      const {error}=loginValidation(req.body)
      if(error) return createError(400,error.details[0].message)
      const {password,email}=req.body
      const foundUser= await User.findOne({email:email})
      if(!foundUser) return next(createError(400,"User does not exists"))
      const comparePasswords=await comparePassword(foundUser.password,password)
      if(!comparePasswords) return next(createError(400,"Wrong email or password"))
      return res.status(200).json(foundUser)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    register,login
}