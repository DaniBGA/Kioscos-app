import express from 'express'
import * as supplierController from '../controllers/supplierController.ts'

const router = express.Router()

router.get('/', supplierController.getSuppliers)
router.get('/:id', supplierController.getSupplier)
router.post('/', supplierController.createSupplier)
router.put('/:id', supplierController.updateSupplier)

export default router
