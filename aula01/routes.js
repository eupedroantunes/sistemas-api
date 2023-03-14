import Router from 'express'
import { clientIndex, clientStore, clientUpdate } from './controllers/ClientController.js'
import { productDelete, productIndex, productSearch, productStore, productUpdate, stockStats } from './controllers/ProductController.js'

const router = Router()

router.get('/products', productIndex)
  .get('/products/:id', productSearch)
  .get('/products/stocks/total', stockStats)
  .post('/products', productStore)
  .put('/products/:id', productUpdate)
  .delete('/products/:id', productDelete)

router.get('/clients', clientIndex)
  .post('/clients', clientStore)
  .put('/clients/:id', clientUpdate)

export default router