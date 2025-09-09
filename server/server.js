require ("dotenv").config()
const express=require("express")
const cors= require ("cors")

const corsOptions=require("./config/corsOptions")

const PORT=process.env.PORT||1111
const app=express()
const mongoose=require("mongoose")
const connectDB=require("./config/dbconn")
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/auth",require("./routers/authRoute"))
app.use("/api/prod",require("./routers/prodRoute"))
app.use("/api/cart",require("./routers/cartRouter"))

mongoose.connection.once("open",()=>{
    console.log("connected to MongoDB")
    app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

})
mongoose.connection.on('error',err=>{
    console.log(err);
})
