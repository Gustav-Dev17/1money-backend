const { User } = require("../../models");

const ShowUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({"name": user.name, "email": user.email, "picture": user.picture});
    
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};

module.exports = { ShowUserController };