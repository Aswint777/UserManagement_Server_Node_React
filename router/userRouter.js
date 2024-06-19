const express = require("express");
const multer = require('multer')
const {
  home,
  userLoginPost,
  userSignUpPost,
  logOut,
  getUser,
  updateProfile,
  userProfilePhoto,
} = require("../controller/userController");
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get("/", home);

// router.post('/getUser', getUsers);

router.post("/userLoginPost", userLoginPost);

router.post("/userSignUpPost", userSignUpPost);

router.get("/userLogOut", logOut);

router.get("/getUser", getUser);

router.post('/updateUserProfile',updateProfile)

router.post('/userProfilePhoto', upload.single('profilePhoto'), userProfilePhoto);

module.exports = router;
