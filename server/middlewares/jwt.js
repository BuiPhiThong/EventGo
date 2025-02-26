const jwt = require('jsonwebtoken')

const genAccessToken = (uid,role)=>{
    return jwt.sign({_id:uid,role:role},process.env.ACESS_SECRETKEY,{expiresIn:'2000s'}) 
}


const genRefreshToken = (uid,role)=>{
    return jwt.sign({_id:uid,role:role},process.env.REFRESH_SECRETKEY,{expiresIn:'3d'}) 
}

module.exports={
    genAccessToken,
    genRefreshToken
}