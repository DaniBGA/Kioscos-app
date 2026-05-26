import express from 'express'
import * as kioskController from '../controllers/kioskController.ts'
import * as productController from '../controllers/productController.ts'
import * as saleController from '../controllers/saleController.ts'
import * as supplierController from '../controllers/supplierController.ts'

const router = express.Router()

// ============ KIOSKS ============
router.get('/', kioskController.getKiosks)
router.get('/:id', kioskController.getKiosk)
router.post('/', kioskController.createKiosk)
router.put('/:id', kioskController.updateKiosk)
router.delete('/:id', kioskController.deleteKiosk)

// ============ KIOSK PRODUCTS (Inventario) ============
router.get('/:kioskId/productos', productController.getKioskProducts)
router.post('/:kioskId/productos', productController.addProductToKiosk)
router.put('/:kioskId/productos/:productId', productController.updateKioskProduct)
router.delete('/:kioskId/productos/:productId', productController.removeProductFromKiosk)

// ============ KIOSK SALES ============
router.get('/:kioskId/ventas', saleController.getSalesByKiosk)
router.get('/:kioskId/ventas/stats', saleController.getSaleStatsByKiosk)

// ============ KIOSK SUPPLIERS ============
router.get('/:kioskId/proveedores', supplierController.getSuppliersByKiosk)

export default router
