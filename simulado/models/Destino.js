import { DataTypes } from "sequelize";
import { sequelize } from "../databases/connect.js";

export const Destino = sequelize.define("destinos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cidade: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  distancia: {
    type: DataTypes.INTEGER(6),
    allowNull: false,
  },
});
