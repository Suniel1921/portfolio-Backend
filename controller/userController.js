const userModel = require("../models/userModel");
const bcrypt  = require ("bcrypt");
const JWT = require ("jsonwebtoken");

//register controller

exports.register = async (req, res)=>{
    try {
        const {name,email,password} = req.body;
        //validation
        if(!name || !email || !password){
            return res.status(400).send({success: false, message: 'All fields are required'});
        }

        //check user already exit or not in our db
        const userExit = await userModel.findOne({email});
        if(userExit){
            return res.status(400).send({success: false, message: 'User already Exit'});
        }

        //hashing user password
        const hashPassword = await bcrypt.hash(password, 10);

        //saving new user in db
        const newUser = await userModel.create({name,email,password:hashPassword});
        return res.status(201).send({success: true, message: 'User Register Successfully',newUser})

        
    } catch (error) {
        return res.status(500).send({success: false, message: 'Error while registering user'})        
    }
}


//login controller
exports.login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(400).send({success: false, message: 'All fields are required'});
        }

        //check email exit or not in db
        const userExit = await userModel.findOne({email});
        if(!userExit){
            return res.status(404).send({success: false, message: "Invalid Credentials  "})
        }

        //check user entering password with database password
        const passwordMatch = await bcrypt.compare(password, userExit.password);
        if(!passwordMatch){
            return res.status(400).send({success: false, message: "Invalid Credentials"})
        }

        //generating token 
        const token = JWT.sign({ _id: userExit._id }, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});
        return res.status(200).send({success: true, message: 'Logged In Successfully',userExit, token});
        
    } catch (error) {
        return res.status(500).send({success: false, message: "Error while login user"})   
        
    }
}