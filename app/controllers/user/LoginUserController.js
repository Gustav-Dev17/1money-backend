const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const LoginUserController = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          process.env.SECRET
        );
        return res.status(200).json({
          token: token,
          id: user.id,
          name: user.name,
          email: user.email,
        });
      } else {
        return res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ message: "Email not found" });
    }
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};

module.exports = { LoginUserController };
