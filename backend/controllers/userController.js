const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const parser = require("ua-parser-js");
const { generateToken } = require("../utils");


// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // Get User Device Details
  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    userAgent,
  });

  // Generate JWT Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio, isVerified, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Trigger 2FA for unknown userAgent/device
  const ua = parser(req.headers["user-agent"]);
  const thisUserAgent = ua.ua;
  console.log(thisUserAgent);
  const allowedDevice = user.userAgent.includes(thisUserAgent);

  if (!allowedDevice) {
    const loginCode = Math.floor(100000 + Math.random() * 900000);
    // Hash token before saving to DB
    const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

    // Delete token if it exists in DB
    let userToken = await Token.findOne({ userId: user._id });
    if (userToken) {
      await userToken.deleteOne();
    }

    // Save Access Token to DB
    await new Token({
      userId: user._id,
      loginToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 1000), // Thirty minutes
    }).save();

    res.status(400);
    throw new Error("Check your email for login code");
  }

  //   Generate Token
  const token = generateToken(user._id);
  if (user && passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, photo, phone, bio, isVerified, role } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      isVerified,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong, please try again");
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json("Logout Successful");
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)

   if(user){
    const { _id, name, email, photo, phone, bio, isVerified, role } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      isVerified,
      role,
    
    });

   }else{
    res.status(404)
    throw new Error("User not found")
   }
});

//Update User
const updateUser = asyncHandler (async(req,res) =>{
  
  const user = await User.findById(req.user._id)

  if(user){
    
    const { name, email, photo, phone, bio, isVerified, role } = user;
 
    user.email=email
    user.name=req.body.name || name
    user.phone=req.body.phone || phone
    user.bio=req.body.bio || bio
    user.photo=req.body.photo || photo

    const updatedUser= await user.save()
    
     res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      photo:updatedUser.photo,
      phone:updatedUser.phone,
      bio:updatedUser.bio,
      isVerified:updatedUser.isVerified,
      role:updatedUser.role,
    });

  }else{
    res.status(404)
    throw new Error("User not found")
  }
  
})

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
});

//get users
const getUsers = asyncHandler (async(req,res)=>{
  res.status("get users")
  const users = await User.find().sort("-createdAt").select("-password")

  if(!users){
    res.status(500)
    throw new Error("Something went wrong")
  }
  res.status(200).json(users)
})

//get login status
const loginstatus = asyncHandler (async(req,res)=>{
  const token = req.cookies.token
if(!token){
  return res.json(false)
}

//Verified token
const verified = jwt.verify(token,process.env.JWT_SECRET);

if(verified){
  return res.json(true)
}
  return res.json(false)


})

const upgradeUser = asyncHandler(async (req, res) => {
  const { role, id } = req.body;

  const user = await User.findById(id); // Corrected this line

  if (!user) {
    res.status(500);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.status(200).json({ message: `User role updated to ${role}` });
});


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginstatus,
  upgradeUser,
};
