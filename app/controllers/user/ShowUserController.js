const { User } = require("../../models");

const ShowUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({"name": user.name, "email": user.email});
    // return res.status(200).send({user});
  } catch {
    return res.status(409).json({ message: "Email already exists" });
  }
};

module.exports = { ShowUserController };