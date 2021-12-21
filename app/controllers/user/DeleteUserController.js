const { User } = require("../../models");

const DeleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    return res.status(200).json({ message: "User account deleted" });
    
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};

module.exports = { DeleteUserController };
