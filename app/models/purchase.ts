module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("Purchase", {
      user_id: DataTypes.INTEGER,
      payment: DataTypes.STRING,
      situation: DataTypes.STRING,
      discount: DataTypes.FLOAT,
      total_price: DataTypes.FLOAT,
      final_price: DataTypes.FLOAT,
      boughtAt: DataTypes.DATE,
    });
  
    return Purchase;
  };