import { DataTypes } from "sequelize";

import { sequelize } from "../databases/connect.js";
import { Usuario } from "./Usuario.js";

export const Venda = sequelize.define(
  "venda",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valor: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { paranoid: true }
);

Venda.belongsTo(Usuario, {
  foreignKey: {
    name: "usuario_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
