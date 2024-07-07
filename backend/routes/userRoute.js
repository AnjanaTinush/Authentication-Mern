const express=require("express")
const { registerUser,loginUser,logoutUser,getUser,updateUser,deleteUser, getUsers } = require("../controllers/userController")
const router = express.Router()
const {protect, adminonly, authornonly} = require("../middleware/authMiddleware")

router.post("/register",registerUser);
router.get("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/getuser", protect, getUser)
router.patch("/updateuser",protect,updateUser);
router.delete("/:id",protect,adminonly,deleteUser);
router.get("/getusers",protect,authornonly,getUsers)

module.exports=router