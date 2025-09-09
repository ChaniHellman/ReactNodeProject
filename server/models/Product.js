const mongoose = require("mongoose")
const prodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
        
    },
    picture: {
        type: String,
        require: true

    
    },
    price: {
        type: Number,
        require:true,
    }
  
})
module.exports = mongoose.model("Product", prodSchema)