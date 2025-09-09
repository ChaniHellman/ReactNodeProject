const jwt=require("jsonwebtoken")
const verifyJWT =(req,res,next)=>{
    const autherHeader=req.headers.Authorization||req.headers.authorization
    if(!autherHeader?.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"})
    }
   const token=autherHeader.split(" ")[1]

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
        if(err)
            return res.status(401).json({message:"Forbidden"})
        req.user=decode
        next()
    })

}
module.exports=verifyJWT