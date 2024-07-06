const express=require("express")
const { registerUser,loginUser,logoutUser,getUser,updateUser } = require("../controllers/userController")
const router = express.Router()
const {protect} = require("../middleware/authMiddleware")

router.post("/register",registerUser);
router.get("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/getuser", protect, getUser)
router.patch("/updateuser",protect,updateUser);

module.exports=router