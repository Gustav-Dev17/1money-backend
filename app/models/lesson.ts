module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define("Lesson", {
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    video: DataTypes.STRING,
    resource: DataTypes.STRING,
    course_id: DataTypes.STRING
  });

  Lesson.associate = function(models) {
    Lesson.belongsTo(models.Course, {
      foreignKey: 'course_id',
      onDelete: 'CASCADE'
    })
  };

  return Lesson;
};
