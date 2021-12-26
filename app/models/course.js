const lesson = require("./lesson");

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("courses", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    cover: DataTypes.STRING,
    prevideo: DataTypes.STRING,
  });

  return Course;
};
