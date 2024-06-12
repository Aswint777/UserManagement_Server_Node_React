const User = require('../model/user');
require('dotenv').config()
const jwt = require('jsonwebtoken')


// creating the jwt token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret code", {
    expiresIn: maxAge,
  });
};

// Controller for home route
const home = (req, res) => {
    const data = User.create({userName:'aswin',email: 'aswin@gmail.com',password: '12345'})
    res.send('The server is running');

};

// Controller for getting all users
const getUser = async (req, res) => {
    try {
        console.log('---------------kkkk');
        const userData = req.cookies.loginToken;
        console.log(userData, 'token');
        const decodedToken = jwt.verify(userData, process.env.SECRET_KEY);
        console.log(decodedToken,'userId');
        const {userId} = decodedToken
        console.log(userId);
        const users = await User.findOne({_id : userId});
        console.log(users, "data is here");
        if(users){
            res.json(users);
        }else{
            throw new Error("user can't find")
        }

    } catch (err) {
        console.error(err);
        throw new Error("user can't find")
        res.status(500).json({ message: err.message });
    }
};


// post for user Login  
const userLoginPost = async(req,res)=>{
    console.log('data is in the user login post ')
    try {
        console.log(req.body,'*******************************');
        const {email,password } = req.body
        const logUser = await User.findOne({email: email , password: password})
        console.log(logUser,' this is a user ');
        const token = jwt.sign({ userId: logUser._id }, process.env.SECRET_KEY);
        res.cookie("loginToken", token, {
          httpOnly: true,
        });
        res.json(logUser);
        

    } catch (error) {
        console.log(error);
    }
}

// post for the user signUp
const userSignUpPost = async(req,res)=>{
    try {
        console.log(req.body,'$$$$$$$$$$$$$$');
        // console.log(req.body,'user signup data is here ')
        const {userName,email,password,confirmPassword } = req.body
        console.log(userName,email,password,confirmPassword);
        const user = await User.create({userName:userName,email:email,password:password})
        const userData = await User.findOne({email:email})
        console.log(userData);
        console.log('hai');
        const token = jwt.sign({ userId: userData._id }, process.env.SECRET_KEY);
        res.cookie("loginToken", token, {
          httpOnly: true,
        });
        res.json(userData);

    } catch (error) {
        console.log(error);
    }
}

// user LogOut post 

const logOut = async(req,res)=>{
    console.log('logOut page is here ');
    res.clearCookie("loginToken").send({ something: "here" });
}



module.exports = {
    home,
    getUser,
    userLoginPost,
    userSignUpPost,
    logOut
};
