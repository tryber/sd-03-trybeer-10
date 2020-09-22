const rescue = require('express-rescue');
const userService = require('../services/userService');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  if (token.status) {
    const { status, message } = token;
    return res.status(status).json({ message })
  }
  res.status(200).json( token )
});

module.exports = {
  userLogin,
};
