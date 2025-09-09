const Cart=require("../controllers/cartController")
const express = require("express")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")

router.use(verifyJWT)
router.post("/add",Cart.AddCart)
router.delete("/delete",Cart.DeleteCart)
router.get("/all",Cart.GetAllCart)
module.exports=router
