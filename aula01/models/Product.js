import { DataTypes } from "sequelize";
import { sequelize } from "../databases/connect.js";

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  brand: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: true
  },
  quantityStock: {
    type: DataTypes.INTEGER(6),
    allowNull: true
  }
})