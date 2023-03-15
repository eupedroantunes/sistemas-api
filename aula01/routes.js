import Router from 'express'
import cors from 'cors'
import { clientIndex, clientStore, clientUpdate } from './controllers/ClientController.js'
import { productDelete, productIndex, productSearch, productStore, productUpdate, stockStats } from './controllers/ProductController.js'

const router = Router()

// router.use(json())
router.use(cors())

router.get('/products', productIndex)
  .get('/products/:id', productSearch)
  .get('/products/stock/total', stockStats)
  .post('/products', productStore)
  .put('/products/:id', productUpdate)
  .delete('/products/:id', productDelete)

router.get('/clients', clientIndex)
  .post('/clients', clientStore)
  .put('/clients/:id', clientUpdate)

export default router