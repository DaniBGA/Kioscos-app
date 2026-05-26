import express from 'express'
import * as customerController from '../controllers/customerController.ts'

const router = express.Router()

router.get('/', customerController.getCustomers)
router.get('/:id', customerController.getCustomer)
router.post('/', customerController.createCustomer)
router.put('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)

export default router
