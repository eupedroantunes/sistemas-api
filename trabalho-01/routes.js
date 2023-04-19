import Router from 'express'
import cors from 'cors'
import { destinationName, priceIncrease, travelDelete, travelIndex, travelPriceSearch, travelStats, travelStore, travelTransportation, travelTransportationType, travelUpdate } from './controllers/TravelController.js'

const router = Router()

// router.use(json())
router.use(cors())

router.get('/travel', travelIndex)
    .post('/travel', travelStore)
    .put('/travel/:id', travelUpdate)
    .delete('/travel/:id', travelDelete)
    .get('/travel/transportation/type', travelTransportation)
    .get('/travel/type/:type', travelTransportationType)
    .get('/travel/price/:max/:min?', travelPriceSearch)
    .put('/travel/price/newprice/:increase', priceIncrease)
    .get('/travel/stats', travelStats)
    .get('/travel/destination', destinationName)

export default router