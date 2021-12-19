const { User } = require("../models");

const CreateUserController = async(req, res, next) => {
  const userEmail = await User.findOne({where: {email: req.body.email}})
  if(userEmail){
    return res.status(409).json({"message": "Email exists"})
  }
  const user = await User.create(req.body)
  return res.json(user)
};

module.exports = {CreateUserController}