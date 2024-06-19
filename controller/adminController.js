const User = require("../model/user");
const { logOut } = require("./userController");

const AdminDashboard = async (req, res) => {
  try {
    console.log("admin dashboard is here ");
    const userList = await User.find({ role: "user" });
    console.log(userList, "userList");
    res.json(userList);
  } catch (error) {
    console.log(error);
  }
};

const userStatus = async (req, res) => {
  try {
    console.log('llll');
    const { userId, value } = req.body;
    console.log(req.body);
    console.log(userId, value,'ooo');
    const userData = await User.findOne({ _id:userId });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const newStatus = userData.status ? false : true;
    const status = await User.updateOne({ _id:userId }, { $set: { status: newStatus } });

    res.json({ message: "Status updated", status });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const editUserData = async (req, res) => {
  try {
    console.log(req.body, "edit controller");
    const { selectedValue, email } = req.body;
    const existingUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { userName: selectedValue } },
      { new: true }
    );
    res.json(existingUser);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    console.log(req.body);
    const { userName, email, password } = req.body;
    const newCreateUser = await User.create({
      userName: userName,
      email: email,
      password: password,
    });
    res.json(newCreateUser)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AdminDashboard,
  userStatus,
  editUserData,
  createUser,
};
