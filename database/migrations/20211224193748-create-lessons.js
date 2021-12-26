"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Lessons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      sequence: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      duration: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      video: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      resource: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      course_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'courses',
          key: 'id',
        }
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Lessons");
  },
};
