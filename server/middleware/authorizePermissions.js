const authorizePermissions = (...roles)=>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({msg: "Unauthorized to access this route"});
        }
        next();
    };
};
module.exports = authorizePermissions;