module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      duration: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      cover: DataTypes.STRING,
      prevideo: DataTypes.STRING,
    });

    return Course;
};