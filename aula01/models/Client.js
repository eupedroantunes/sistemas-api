import { DataTypes } from "sequelize";
import { sequelize } from "../databases/connect.js";

export const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  birth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  cpf: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  mobilePhone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: true
  }
})