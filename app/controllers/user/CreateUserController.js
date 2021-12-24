const { User } = require("../../models");

const CreateUserController = async (req, res, next) => {
  try {
    const userEmail = await User.findOne({ where: { email: req.body.email } });
    if (userEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const user = await User.create(req.body);
    return res.json({"name": user.name, "email": user.email, "picture": user.picture});
  } catch {
    return res.status(500).json({ message: "error" });
  }
};

module.exports = { CreateUserController };
