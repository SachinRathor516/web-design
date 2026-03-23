const express = require('express')
const userModel = require('../models/user_model')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')



authRouter.post('/register' , async(req,res)=>{
    const {name ,email , password}= req.body

    const isEmailExist = await userModel.findOne({email})

    if (isEmailExist) {
       return res.status(400).json({
            message:"Email already exist , choose another email"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

   const user = await userModel.create({
        name, 
        email,
        password:hash
    })

    const token = jwt.sign(
        {
           id:user._id,
           email:user.email,
           name:user.name
        },
        process.env.JWT_SECRET
    )

    res.cookie('token', token)



    res.status(201).json({
        message:"user register successfully",
        user,
        token
    })
})

authRouter.post('/login' , async(req , res )=>{

    const{email , password} = req.body

   const user = await userModel.findOne({email})

   if(!user){
    return res.status(404).json({
        message:"This email address is not exist"
    })
   }

   const ispassword = user.password===crypto.createHash('md5').update(password).digest('hex')

   if(!ispassword){
   return res.status(401).json({
        message:"invalid password"
    })
   }

   res.status(200).json({
    message:"user logged in !",
    user
   })

})





module.exports = authRouter

