const { verifyToken } = require('../controller/user.controller');
const User = require('../model/User.model');

async function verifyAuthToken(req, res, next) {
  try {
    const bearToken = req.headers.authorization;
    const tokenArr = bearToken.split(' ');
    const token = tokenArr[1];
    const payload = verifyToken(token);
    const user = await User.findOne({ _id: payload.id });

    if (!user)
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
        statusCode: 400,
      });
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    if (error.message == 'jwt expired') {
      return res.status(401).json({
        message: error.message,
      });
    }
    if (error.message === 'invalid signature') {
      return res.status(401).json({
        message: 'invalid token',
      });
    }
    next(error);
  }
}

module.exports = { verifyAuthToken };
