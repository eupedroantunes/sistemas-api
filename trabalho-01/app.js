import express from 'express'
import { sequelize } from './database/connect.js'
import cors from 'cors'
import routes from './routes.js'
import { Travel } from './models/Travel.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(routes)
app.use(cors())

async function connect_db() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully')
        await Travel.sync({ alter: true })
    } catch (error) {
        console.error('Unable to connect to database: ', error)
    }
}

connect_db()

app.get('/', (req, res) => {
    res.send('Trabalho 01 - Desenvolvimento de Serviços e APIs')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})