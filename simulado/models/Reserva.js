import { DataTypes } from "sequelize"
import { sequelize } from "../databases/connect.js"
import { Cliente } from "./Cliente.js"
import { Excursao } from "./Excursao.js"

export const Reserva = sequelize.define('reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantidade: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false
  },  
}, {
  tableName: "reservas",
  timestamps: false
})

Reserva.belongsTo(Cliente, {
  foreignKey: {
    name: 'cliente_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Excursao.belongsTo(Reserva, {
  foreignKey: "reserva_id"
})
