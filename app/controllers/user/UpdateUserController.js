const bcrypt = require("bcrypt");
const { User } = require("../../models");

const UpdateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? hashPassword : user.password;

    await user.save();
    return res.json({ name: user.name, email: user.email });
  } catch {
    return res.status(409).json({ message: "Email exists" });
  }
};

module.exports = { UpdateUserController };
