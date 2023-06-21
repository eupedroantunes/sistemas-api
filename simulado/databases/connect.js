import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './databases/simulado.db3'
})