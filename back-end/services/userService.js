const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'donthack';

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validateLogin = (email, password) => {
  if (password.length < 6 || !email.match(emailTest)) {
    return { status: 400, message: "Invalid entries." }
  }
  return null;
};

const login = async (userEmail, userPassword) => {
  const isValid = validateLogin(userEmail, userPassword);
  if (isValid) return isValid;
  const user = await userModel.login(userEmail);
  console.log(user);
  if (!user || userPassword !== user.password) {
    return { status: 401, message: "Incorrect user email or password." }
  }

  const jwtLogin = { expiresIn: '30m', algorithm: 'HS256' };
  const { name, email, role } = user;
  const token = jwt.sign({ data: email }, secret, jwtLogin);
  return { token, name, email, role }
};

module.exports = {
  login,
};
