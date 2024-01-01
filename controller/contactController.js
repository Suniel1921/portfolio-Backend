const userContactModel = require("../models/contactModel");

exports.userContact = async (req ,res)=>{
    try {
        const {name,email,message} = req.body;
        //validation
        if(!name || !email || !message){
            return res.status(400).send({success: false, message: 'All field are requried'});
        }

        //saving user contact information in db
        const newUser = await userContactModel.create({name,email,message})
        return res.status(201).send({success: true, message: 'Thanks for getting in touch with me',newUser})

        
    } catch (error) {
        return res.status(500).send({success: false, message: `Something went wrong while user contacting ${error}`})
        
    }
}