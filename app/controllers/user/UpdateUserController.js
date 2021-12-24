const bcrypt = require("bcrypt");
const { User } = require("../../models");

const UpdateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, picture } = req.body;
    const userEmail = await User.findOne({ where: { email: req.body.email } });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }
    
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? hashPassword : user.password;
    user.picture = picture ? picture : user.picture;

    await user.save();
    return res.json({"name": user.name, "email": user.email, "picture": user.picture });
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};

module.exports = { UpdateUserController };
