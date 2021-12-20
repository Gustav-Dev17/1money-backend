const { User } = require("../models");

const UpdateUserController = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name ? name : user.name;
  user.email = email ? email : user.email;
  user.password = password ? password : user.password;
  const result = await user.save();
  return res.json(result);
};

module.exports = { UpdateUserController };
