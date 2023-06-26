const { Router } = require("express");
const {
  registerUser,
  loginUser,
  sendResetPassword,
  verifyResetPassword,
} = require("../controller/user.controller");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/send_reset_password", sendResetPassword);
userRouter.post("/verify_reset_password", verifyResetPassword);
module.exports = userRouter;
