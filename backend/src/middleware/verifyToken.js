import jwt from 'jsonwebtoken';

const verifyToken =(req,res,next)=>{
    try {
        const token = req.cookies?.auth_token ||
        req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            return res.status(401).json({message:"Access denied"});
        }

        const decoded=jwt.verify(token,process.env.SECRETKEY);
        req.role=decoded.role;
        req.userId=decoded.userId;
        req.user = decoded;

        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(403).json({message:"Inavalid Token"})
    }
}
export default verifyToken;