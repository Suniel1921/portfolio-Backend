const JWT = require ("jsonwebtoken");
const userModel = require ("../models/userModel");
//Token based protect routes
exports.requireLoggedIn = (req, res,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.userExit = decode;
        next();        
    } catch (error) {
        return res.status(500).send({success: false, message: "Login First"});        
    }
}

// Admin routes
exports.isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.userExit._id);
      if (user.role !== 1) {
        return res.status(401).send({ success: false, message: "Unauthorized Access!" });
      } else {
        next();
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: "Error in admin middleware" });
    }
  };