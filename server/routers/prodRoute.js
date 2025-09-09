const express=require("express")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const productController = require("../controllers/prodController")

router.get("/getAll", productController.getAllProducts)
router.get("/getById", productController.getProductById)
router.use(verifyJWT)
router.post("/create",productController.createNewProduct)
router.put("/update",productController.updateProduct)
router.delete("/delete",productController.deleteProduct)

module.exports=router