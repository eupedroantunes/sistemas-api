import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connect.js'
import { Op } from "sequelize";

export const Travel = sequelize.define('Viagens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departure: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    transportation: {
        type: DataTypes.STRING(30),
        allowNull: false,
        set(value) {
            this.setDataValue('transportation', value.toUpperCase())
        },
        validate: {
            isIn: {
                args: [["TERRESTRE", "MARÍTIMO", "AÉREO"]],
                msg: "Fora do padrão"
            },
        }
    },
    price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    }
})

