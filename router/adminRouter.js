const express = require("express");
const {
  AdminDashboard,
  userStatus,
  editUserData,
  createUser,
} = require("../controller/adminController");

const router = express.Router();

router.get("/AdminDashboard", AdminDashboard);

router.post("/userStatus", userStatus);

router.post("/editUserData", editUserData);

router.post("/createUser", createUser);

module.exports = router;
