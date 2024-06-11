// const express = require('express')
// const { home } = require('../controller/userController')
// const User = require('../model/user');

// const router = express.Router()

// router.get('/',home)

// // app.get('/',(req,res)=>{
// //     res.send('the server is running ')
// // })




// // Route to get all users
// router.get('/getUser', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;





const express = require('express');
const { home, getUsers, userLoginPost } = require('../controller/userController');
const router = express.Router();

router.get('/', home);
router.post('/getUser', getUsers);
router.post('/userLoginPost',userLoginPost)

module.exports = router;

