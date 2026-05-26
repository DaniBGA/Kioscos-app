import { Request, Response } from 'express'
import prisma from '../lib/prisma.ts'

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await prisma.sale.findMany({
      include: { items: { include: { product: true } }, kiosk: true },
      orderBy: { date: 'desc' },
    })
    res.json({ success: true, data: sales })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching sales' })
  }
}

export const getSalesByKiosk = async (req: Request, res: Response) => {
  try {
    const { kioskId } = req.params
    const sales = await prisma.sale.findMany({
      where: { kioskId },
      include: { items: { include: { product: true } } },
      orderBy: { date: 'desc' },
    })
    res.json({ success: true, data: sales })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching sales' })
  }
}

export const getSaleStats = async (req: Request, res: Response) => {
  try {
    const totalSales = await prisma.sale.aggregate({
      _sum: { total: true },
      _count: true,
    })

    const topProducts = await prisma.saleItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 3,
    })

    res.json({
      success: true,
      data: {
        totalRevenue: totalSales._sum.total || 0,
        totalTransactions: totalSales._count,
        topProducts,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching sales stats' })
  }
}

export const getSaleStatsByKiosk = async (req: Request, res: Response) => {
  try {
    const { kioskId } = req.params

    const totalSales = await prisma.sale.aggregate({
      where: { kioskId },
      _sum: { total: true },
      _count: true,
    })

    const topProducts = await prisma.saleItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      where: { sale: { kioskId } },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 3,
    })

    res.json({
      success: true,
      data: {
        totalRevenue: totalSales._sum.total || 0,
        totalTransactions: totalSales._count,
        topProducts,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching sales stats' })
  }
}

export const createSale = async (req: Request, res: Response) => {
  try {
    const { items, paymentMethod, kioskId } = req.body

    // Verificar que el kiosco existe
    const kiosk = await prisma.kiosk.findUnique({ where: { id: kioskId } })
    if (!kiosk) {
      return res.status(404).json({ success: false, error: 'Kiosk not found' })
    }

    const total = items.reduce((sum: number, item: any) => sum + item.subtotal, 0)

    const sale = await prisma.sale.create({
      data: {
        total,
        paymentMethod,
        kioskId,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
          })),
        },
      },
      include: { items: { include: { product: true } }, kiosk: true },
    })

    // Update stock en KioskProduct
    for (const item of items) {
      await prisma.kioskProduct.updateMany({
        where: { kioskId, productId: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    }

    res.status(201).json({ success: true, data: sale })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Error creating sale' })
  }
}

