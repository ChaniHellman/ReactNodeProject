const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        lowercase:true,
        require:true,
        trim:true
        
    },
    phone: {
        type: String
    },
    roles: {
        type: String,
        enum:["admin","user"],
        default:"user"
    },
    active:{
        type:Boolean,
        default:true
    }
},
    { timestamps: true })
module.exports = mongoose.model("User", userSchema)