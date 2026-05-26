import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import prisma from './lib/prisma.ts'

// Routes
import customerRoutes from './routes/customers.ts'
import kioskRoutes from './routes/kiosks.ts'
import productRoutes from './routes/products.ts'
import saleRoutes from './routes/sales.ts'
import supplierRoutes from './routes/suppliers.ts'

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' })
})

// ============ API ROUTES ============

// Customers
app.use('/api/clientes', customerRoutes)

// Kiosks (with nested products, sales, suppliers)
app.use('/api/kioscos', kioskRoutes)

// Standalone Products (global catalog)
app.use('/api/productos', productRoutes)

// Sales
app.use('/api/ventas', saleRoutes)

// Suppliers
app.use('/api/proveedores', supplierRoutes)

// ============ Error handling ============
app.use((err: any, req: Request, res: Response) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// ============ Start server ============
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ API available at http://localhost:${PORT}/api`)
})

