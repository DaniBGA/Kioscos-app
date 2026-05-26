import { Request, Response } from 'express'
import prisma from '../lib/prisma.ts'

export const getKiosks = async (req: Request, res: Response) => {
  try {
    const kiosks = await prisma.kiosk.findMany({
      include: { customer: true },
      orderBy: { name: 'asc' },
    })
    res.json({ success: true, data: kiosks })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching kiosks' })
  }
}

export const getKiosk = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const kiosk = await prisma.kiosk.findUnique({
      where: { id },
      include: {
        customer: true,
        kioskProducts: { include: { product: true } },
        sales: true,
        suppliers: true,
      },
    })
    if (!kiosk) {
      return res.status(404).json({ success: false, error: 'Kiosk not found' })
    }
    res.json({ success: true, data: kiosk })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching kiosk' })
  }
}

export const getKiosksByCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params
    const kiosks = await prisma.kiosk.findMany({
      where: { customerId },
      include: { customer: true, kioskProducts: true, sales: true },
      orderBy: { name: 'asc' },
    })
    res.json({ success: true, data: kiosks })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching customer kiosks' })
  }
}

export const createKiosk = async (req: Request, res: Response) => {
  try {
    const { name, address, phone, customerId } = req.body

    // Validar que el cliente existe
    const customer = await prisma.customer.findUnique({ where: { id: customerId } })
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' })
    }

    // Validar que el nombre sea único por cliente
    const existing = await prisma.kiosk.findFirst({
      where: { customerId, name },
    })
    if (existing) {
      return res.status(400).json({ success: false, error: 'Kiosk name already exists for this customer' })
    }

    const kiosk = await prisma.kiosk.create({
      data: {
        name,
        address,
        phone,
        customerId,
      },
      include: { customer: true },
    })

    res.status(201).json({ success: true, data: kiosk })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error creating kiosk' })
  }
}

export const updateKiosk = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, address, phone } = req.body

    const kiosk = await prisma.kiosk.update({
      where: { id },
      data: {
        name,
        address,
        phone,
      },
      include: { customer: true },
    })

    res.json({ success: true, data: kiosk })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating kiosk' })
  }
}

export const deleteKiosk = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Verificar que no tenga ventas
    const sales = await prisma.sale.findFirst({
      where: { kioskId: id },
    })

    if (sales) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete kiosk with existing sales',
      })
    }

    await prisma.kiosk.delete({ where: { id } })
    res.json({ success: true, message: 'Kiosk deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting kiosk' })
  }
}
