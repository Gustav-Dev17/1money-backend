const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    hooks: {
     beforeCreate: async (user) => {
      if (user.password) {
       const salt = await bcrypt.genSaltSync(10, 'a');
       user.password = bcrypt.hashSync(user.password, salt);
      }
     },
     beforeUpdate:async (user) => {
      if (user.password) {
       const salt = await bcrypt.genSaltSync(10, 'a');
       user.password = bcrypt.hashSync(user.password, salt);
      }
     }
    },
    // instanceMethods: {
    //  validPassword: (password) => {
    //   return bcrypt.compareSync(password, this.password);
    //  }
    // }
  });

  //  User.prototype.validPassword = async (password, hash) => {
  //   return await bcrypt.compareSync(password, hash);
  // }

  return User;
};
