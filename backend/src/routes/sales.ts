import express from 'express'
import * as saleController from '../controllers/saleController.ts'

const router = express.Router()

router.get('/', saleController.getSales)
router.get('/stats', saleController.getSaleStats)
router.post('/', saleController.createSale)

export default router
