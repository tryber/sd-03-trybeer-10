const rescue = require('express-rescue');
const userService = require('../services/userService');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  if (token.status) {
    const { status, message } = token;
    return res.status(status).json({ message });
  }
  res.status(200).json(token);
});

const userRegister = rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await userService.newUser(name, email, password, role);

  if (newUser.status) {
    const { status, message } = newUser;
    return res.status(status).json({ message });
  }

  res.status(201).json(newUser);
});

module.exports = {
  userLogin,
  userRegister,
};
