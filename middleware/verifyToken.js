const jwt = require('jsonwebtoken')

const verifyToken = async (req,res,next)=>{
    let jwtToken ;
    const authHeader = req.headers['authorization']
    if(authHeader !== undefined){
        jwtToken = authHeader.split("")[1]
    }
    if(jwtToken === undefined){
        res.status(401).send({message:"Not found jwtToken"})
    }else{
        await jwt.verify(jwtToken , "JWT", async (err , payload)=>{
            if(err){
                console.log(err)
                res.status(401).send({message:"Not found in jwttoken"})
            }else{
                req.username = payload.username
                next()
            }
        })
    }
}

module.exports = verifyToken