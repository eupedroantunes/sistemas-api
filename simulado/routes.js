import Router from 'express'
import cors from 'cors'
import { destinoIndex, destinoStore } from './controllers/destinoController.js'
import { clienteIndex, clienteStore } from './controllers/clienteController.js'

const router = Router()

router.use(cors())

router.get('/destino', destinoIndex)
    .post('/destino', destinoStore)
    .get('/cliente', clienteIndex)
    .post('/cliente', clienteStore)

export default router