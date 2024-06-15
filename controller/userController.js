const User = require("../model/user");
// const Admin = require('../model/adminModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");

// creating the jwt token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret code", {
    expiresIn: maxAge,
  });
};

// Controller for home route
const home = (req, res) => {
  const data = User.create({
    userName: "aswin",
    email: "aswin@gmail.com",
    password: "12345",
  });
  res.send("The server is running");
};

// Controller for getting all users
const getUser = async (req, res) => {
  try {
    const userData = req?.cookies.loginToken;
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(userData, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { userId } = decodedToken;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// post for user Login
const userLoginPost = async (req, res) => {
  console.log("data is in the user login post ");
  try {
    console.log(req.body, "*******************************");
    const { email, password } = req.body;

    const logUser = await User.findOne({ email: email });
    if (!logUser) {
      return res.status(400).json({ error: "The user is not exist " });
    }
    if (logUser.password !== password) {
      return res.status(400).json({ error: "password is incorrect " });
    }
    if (logUser.status == false) {
      return res
        .status(400)
        .json({ error: "Your account is temporarily Unavailable" });
    }

    console.log(logUser._id, " this is a user ");
    const token = jwt.sign({ userId: logUser._id }, process.env.SECRET_KEY);
    res.cookie("loginToken", token, {
      httpOnly: true,
    });
    res.json(logUser);
  } catch (error) {
    console.log(error);
    throw new Error(error?.message);
  }
};

// post for the user signUp
const userSignUpPost = async (req, res) => {
  try {
    console.log(req.body, "$$$$$$$$$$$$$$");
    // console.log(req.body,'user signup data is here ')
    const { userName, email, password, confirmPassword } = req.body;
    if (password == "" || userName == "" || email == "") {
      return res.status(400).json({ error: "Enter all the fields" });
    }
    if (password.length < 5) {
      return res.status(400).json({ error: "password not Strong" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password is not matching " });
      // throw new Error('password is incorrect')
    }
    console.log("xxxxx");
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    console.log(userName, email, password, confirmPassword);
    const user = await User.create({
      userName: userName,
      email: email,
      password: password,
    });
    const userData = await User.findOne({ email: email });
    console.log(userData);
    console.log("hai");
    const token = jwt.sign({ userId: userData._id }, process.env.SECRET_KEY);
    res.cookie("loginToken", token, {
      httpOnly: true,
    });
    res.json(userData);
  } catch (error) {
    console.log(error);
    throw new Error(error?.message);
  }
};

//update user Profile page 

const updateProfile = async(req,res)=>{
  try {
    console.log('update user profile page is here',req.body );
    const {_id,userName,email,password,confirmPassword} = req.body
    console.log(_id,'wwwww');
    // const updateData = await User.findOneAndUpdate({_id: _id },{$set:{userName:userName,email:email,password:password,confirmPassword:confirmPassword}})
  } catch (error) {
    console.log(error);
  }
}

// user LogOut post

const logOut = async (req, res) => {
  console.log("logOut page is here ");
  res.clearCookie("loginToken").send({ something: "here" });
};

module.exports = {
  home,
  getUser,
  userLoginPost,
  userSignUpPost,
  updateProfile,
  logOut,

};
