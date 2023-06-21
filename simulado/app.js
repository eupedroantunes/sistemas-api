import express from 'express'
import { sequelize } from './databases/connect.js'
import routes from './routes.js'
import cors from 'cors'
import { Destino } from './models/Destino.js'
import { Cliente } from './models/Cliente.js'
import { Excursao } from './models/Excursao.js'
import { Reserva } from './models/Reserva.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(routes)
app.use(cors())

async function connect_db() {
    try {
        await sequelize.authenticate()
        console.log('Conexão Estabelecida')
        await Destino.sync({alter: true})
        await Cliente.sync({alter: true})
        await Excursao.sync({alter: true})
        await Reserva.sync({alter: true})
        
    } catch (error) {
        console.error('Impossivel conectar: ', error)
    }
}

connect_db()

app.get('/', (req, res) => {
    res.send('Simulado')
})

app.listen(port, () => {
    console.log(`Servidor na porta ${port}`)
})