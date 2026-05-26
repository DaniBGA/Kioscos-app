import { Request, Response } from 'express'
import prisma from '../lib/prisma.ts'

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: { products: { include: { product: true } }, kiosk: true },
      orderBy: { name: 'asc' },
    })
    res.json({ success: true, data: suppliers })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching suppliers' })
  }
}

export const getSuppliersByKiosk = async (req: Request, res: Response) => {
  try {
    const { kioskId } = req.params
    const suppliers = await prisma.supplier.findMany({
      where: { kioskId },
      include: { products: { include: { product: true } } },
      orderBy: { name: 'asc' },
    })
    res.json({ success: true, data: suppliers })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching suppliers' })
  }
}

export const getSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: { products: { include: { product: true } }, kiosk: true },
    })
    if (!supplier) {
      return res.status(404).json({ success: false, error: 'Supplier not found' })
    }
    res.json({ success: true, data: supplier })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching supplier' })
  }
}

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, address, kioskId } = req.body

    // Verificar que el kiosco existe
    const kiosk = await prisma.kiosk.findUnique({ where: { id: kioskId } })
    if (!kiosk) {
      return res.status(404).json({ success: false, error: 'Kiosk not found' })
    }

    const supplier = await prisma.supplier.create({
      data: { name, phone, email, address, kioskId },
      include: { kiosk: true },
    })

    res.status(201).json({ success: true, data: supplier })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error creating supplier' })
  }
}

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, phone, email, address } = req.body

    const supplier = await prisma.supplier.update({
      where: { id },
      data: { name, phone, email, address },
      include: { kiosk: true },
    })

    res.json({ success: true, data: supplier })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating supplier' })
  }
}

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.supplier.delete({ where: { id } })
    res.json({ success: true, message: 'Supplier deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting supplier' })
  }
}

