const { generateToken } = require("../helpers/AuthToken");
const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
async function registerUser(req, res) {
  try {
    const data = req.body;

    if (!data.email)
      return res.status(400).json({
        message: "Email is required",
      });

    if (!data.name)
      return res.status(400).json({
        message: "name is required",
      });
    if (!data.country)
      return res.status(400).json({
        message: "country is required",
      });
    if (!data.password)
      return res.status(400).json({
        message: "password is required",
      });
    const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(data.password, salt);
    const hashPassword = bcrypt.hashSync(data.password, salt);
    data.password = hashPassword;
    const user = await UserModel.create(data);
    return res.status(200).json({
      message: "User Registered successfully",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000)
      //Database error
      return res.status(400).json({ message: "User already exist" });

    res.status(400).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const data = req.body;

    if (!data.email)
      return res.status(400).json({
        message: "Email is required",
      });

    if (!data.password)
      return res.status(400).json({
        message: "password is required",
      });
    const user = await UserModel.findOne({ email: data.email });
    if (!user) return res.status(400).json({ message: "User does not exist " });
    const isPasswordMatched = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = generateToken(user);
    return res.status(200).json({
      message: "User Logged in successfully",
      data: {
        token,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function sendResetPassword(req, res) {
  try {
    const data = req.body;

    if (!data.email)
      return res.status(400).json({
        message: "Email is required",
      });

    const user = await UserModel.findOne({ email: data.email });
    if (!user) return res.status(400).json({ message: "User does not exist " });
    const code = "1234";
    user.resetPasswordToken = code; // add to the user table
    await user.save(); // save the user to the database
    // SEND EMAIL with code
    return res.status(200).json({
      message: "Reset Password code sent",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function verifyResetPassword(req, res) {
  try {
    const data = req.body;

    if (!data.email)
      return res.status(400).json({
        message: "Email is required",
      });
    if (!data.newPassword)
      return res.status(400).json({
        message: "newPassword is required",
      });
    if (!data.code)
      return res.status(400).json({
        message: "code is required",
      });
    const user = await UserModel.findOne({ email: data.email });
    if (!user) return res.status(400).json({ message: "User does not exist " });
    if (user.resetPasswordToken != data.code) {
      return res.status(400).json({
        message: "code is Incorrect",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(data.newPassword, salt);
    user.password = hashPassword;
    user.resetPasswordToken = undefined; // add to the user table
    await user.save(); // save the user to the database

    return res.status(200).json({
      message: "User Password Reset successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = {
  registerUser,
  loginUser,
  sendResetPassword,
  verifyResetPassword,
};
