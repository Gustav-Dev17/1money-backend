//const lesson = require("./lesson");

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.STRING,
    price: DataTypes.FLOAT,
    cover: DataTypes.STRING,
    prevideo: DataTypes.STRING,
  });

  Course.associate = function(models) {
    Course.hasMany(models.Lesson, {
      foreignKey: 'course_id',
    })
  };
  
  return Course;
};
