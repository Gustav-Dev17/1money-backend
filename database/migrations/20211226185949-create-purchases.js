"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Purchases", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      payment: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      situation: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      discount: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      total_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      final_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      boughtAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Purchases");
  },
};