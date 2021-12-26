'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Courses", {
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
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      duration: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      cover: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      prevideo: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },
  
  down: (queryInterface) => {
    return queryInterface.dropTable("Courses");
  },
};