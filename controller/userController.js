

// const home = (req,res)=>{
//     console.log('the server is running now ')
    
// }

// module.exports = {
//     home 
// }


const User = require('../model/user');

// Controller for home route
const home = (req, res) => {
    const data = User.create({userName:'aswin',email: 'aswin@gmail.com',password: '12345'})
    res.send('The server is running');

};

// Controller for getting all users
const getUsers = async (req, res) => {
    try {
        console.log(req.body,'---------------');
        const users = await User.find();
        console.log(users,"data is here ")
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const userLoginPost = async(req,res)=>{
    console.log('data is in the user login post ')
    try {
        console.log(req.body,'*******************************');
        const {email,password } = req.body
        const logUser = await User.findOne({email: email , password: password})
        console.log(logUser,' this is a user ');
        

    } catch (error) {
        
    }
}

module.exports = {
    home,
    getUsers,
    userLoginPost
};
