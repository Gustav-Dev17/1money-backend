module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define("Lesson", {
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    duration: DataTypes.FLOAT,
    video: DataTypes.STRING,
    resource: DataTypes.STRING,
  });

  return Lesson;
};
