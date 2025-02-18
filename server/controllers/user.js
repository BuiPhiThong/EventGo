const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createUser =asyncHandler(async(req,res)=>{
    const {name, email,password} = req.body
    if(!name || !email || !password){
       return res.status(409).json({
         success:false,
         mess:'Missing input to create user'
       })
    }
    const user = await User.create(req.body)

    return res.status(200).json({
        success: user? true :false,
        mess:'Create SuccessFully'
    })
   
})



module.exports ={
    createUser
}