const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({msg: 'Authentication invalid'});
    }
    const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId : payload.userId,
            role : payload.role
        };
        next();
    }catch (error){
        return res.status(401).json({msg: 'Token invalid'});
    }
};


const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: Admins only' });
  }
  next();
};



module.exports = {authenticateUser,  adminOnly};