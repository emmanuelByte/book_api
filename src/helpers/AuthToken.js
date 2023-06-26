const jwt = require("jsonwebtoken");
function generateToken(user) {
  const token = jwt.sign(
    {
      id: user._id.toString(),
    },
    "hdjgdhkbhsdhdsbkjdsljsdmnsjjksj", //secret key
    {
      expiresIn: "1h",
    }
  );
  return token;
}
function verifyToken(token) {
  const payload = jwt.verify(token, "hdjgdhkbhsdhdsbkjdsljsdmnsjjksj"); //secret key
  return payload;
}

module.exports = {
  generateToken,
  verifyToken,
};
