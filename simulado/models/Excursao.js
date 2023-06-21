import { DataTypes } from "sequelize";
import { sequelize } from "../databases/connect.js";
import { Destino } from "./Destino.js";

export const Excursao = sequelize.define('excursao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valor: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false
  },
  lugares: {
    type: DataTypes.INTEGER(3),
    allowNull: false
  },
  
}, {
  tableName: "excursoes",
  timestamps: false
})

Excursao.belongsTo(Destino, {
  foreignKey: {
    name: 'destino_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})