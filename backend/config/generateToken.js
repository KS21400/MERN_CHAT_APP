const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "12345678", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
