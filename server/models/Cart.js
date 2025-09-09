const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Product"
    } 
})
module.exports = mongoose.model("Cart", cartSchema)