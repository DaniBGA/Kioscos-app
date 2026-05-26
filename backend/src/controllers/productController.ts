import { Request, Response } from 'express'
import prisma from '../lib/prisma.ts'

// ============ PRODUCTS (GLOBALES) ============

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { custom } = req.query
    const products = await prisma.product.findMany({
      where: custom === 'true' ? { isCustom: true } : {},
      include: { category: true },
      orderBy: { name: 'asc' },
    })
    res.json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching products' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        kioskProducts: true,
        supplierProducts: true,
      },
    })
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' })
    }
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching product' })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, basePrice, baseCost, categoryId, barcode, sku, isCustom, customerId } = req.body

    // Validar que el nombre y barcode sean únicos
    if (barcode) {
      const existing = await prisma.product.findUnique({ where: { barcode } })
      if (existing) {
        return res.status(400).json({ success: false, error: 'Barcode already exists' })
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        basePrice: parseFloat(basePrice),
        baseCost: parseFloat(baseCost),
        categoryId,
        barcode,
        sku,
        isCustom: isCustom || false,
        customerId: isCustom ? customerId : null,
      },
      include: { category: true },
    })

    res.status(201).json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error creating product' })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, basePrice, baseCost, categoryId } = req.body

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        basePrice: basePrice ? parseFloat(basePrice) : undefined,
        baseCost: baseCost ? parseFloat(baseCost) : undefined,
        categoryId,
      },
      include: { category: true },
    })

    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating product' })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.product.delete({ where: { id } })
    res.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting product' })
  }
}

// ============ KIOSK PRODUCTS (Inventario por kiosco) ============

export const getKioskProducts = async (req: Request, res: Response) => {
  try {
    const { kioskId } = req.params
    
    const kioskProducts = await prisma.kioskProduct.findMany({
      where: { kioskId },
      include: { product: { include: { category: true } } },
      orderBy: { product: { name: 'asc' } },
    })

    res.json({ success: true, data: kioskProducts })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching kiosk products' })
  }
}

export const addProductToKiosk = async (req: Request, res: Response) => {
  try {
    const { kioskId } = req.params
    const { productId, stock, minStock, price } = req.body

    // Verificar que el kiosco existe
    const kiosk = await prisma.kiosk.findUnique({ where: { id: kioskId } })
    if (!kiosk) {
      return res.status(404).json({ success: false, error: 'Kiosk not found' })
    }

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' })
    }

    // Si ya existe, actualizar
    const existing = await prisma.kioskProduct.findUnique({
      where: { kioskId_productId: { kioskId, productId } },
    })

    if (existing) {
      const updated = await prisma.kioskProduct.update({
        where: { id: existing.id },
        data: {
          stock: stock !== undefined ? stock : existing.stock,
          minStock: minStock !== undefined ? minStock : existing.minStock,
          price: price !== undefined ? price : existing.price,
        },
        include: { product: { include: { category: true } } },
      })
      return res.json({ success: true, data: updated })
    }

    // Crear nueva relación
    const kioskProduct = await prisma.kioskProduct.create({
      data: {
        kioskId,
        productId,
        stock: parseInt(stock) || 0,
        minStock: parseInt(minStock) || 0,
        price: parseFloat(price) || product.basePrice,
      },
      include: { product: { include: { category: true } } },
    })

    res.status(201).json({ success: true, data: kioskProduct })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Error adding product to kiosk' })
  }
}

export const updateKioskProduct = async (req: Request, res: Response) => {
  try {
    const { kioskId, productId } = req.params
    const { stock, minStock, price } = req.body

    const kioskProduct = await prisma.kioskProduct.updateMany({
      where: { kioskId, productId },
      data: {
        stock: stock !== undefined ? parseInt(stock) : undefined,
        minStock: minStock !== undefined ? parseInt(minStock) : undefined,
        price: price !== undefined ? parseFloat(price) : undefined,
      },
    })

    if (kioskProduct.count === 0) {
      return res.status(404).json({ success: false, error: 'Kiosk product not found' })
    }

    // Obtener el producto actualizado
    const updated = await prisma.kioskProduct.findUnique({
      where: { kioskId_productId: { kioskId, productId } },
      include: { product: { include: { category: true } } },
    })

    res.json({ success: true, data: updated })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating kiosk product' })
  }
}

export const removeProductFromKiosk = async (req: Request, res: Response) => {
  try {
    const { kioskId, productId } = req.params

    await prisma.kioskProduct.deleteMany({
      where: { kioskId, productId },
    })

    res.json({ success: true, message: 'Product removed from kiosk' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error removing product from kiosk' })
  }
}

