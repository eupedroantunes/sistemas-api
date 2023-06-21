import { DataTypes } from "sequelize"
import { sequelize } from "../databases/connect.js"

export const Cliente = sequelize.define('clientes', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    dataNasc: {
        type: DataTypes.DATE(),
        allowNull: false
    }
})