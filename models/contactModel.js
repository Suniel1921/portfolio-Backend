const mongoose = require ("mongoose");
const userContactSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, 'Name is required'],
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
    },
    message:{
        type: String,
        required: [true, 'Message is required']
    }
})

const userContactModel = mongoose.model("userContact", userContactSchema);
module.exports = userContactModel;