const express=require("express")
const { registerUser,loginUser,logoutUser,getUser } = require("../controllers/userController")
const router = express.Router()
const {protect} = require("../middleware/authMiddleware")

router.post("/register",registerUser);
router.get("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/getuser", protect, getUser)


module.exports=router