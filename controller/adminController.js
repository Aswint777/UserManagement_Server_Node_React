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
    console.log(req.body);
    const { selectedValue } = req.body;
    console.log(selectedValue, "kkkkkk");
    const userData = await User.findOne({ _id: selectedValue });
    let status;
    if (userData.status == true) {
      status = await User.updateOne(
        { _id: selectedValue },
        { $set: { status: false } }
      );
    } else {
      status = await User.updateOne(
        { _id: selectedValue },
        { $set: { status: true } }
      );
    }
    res.json(status);
  } catch (error) {}
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
