import { Request, Response } from 'express'
import prisma from '../lib/prisma.ts'

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: { kiosks: true },
      orderBy: { name: 'asc' },
    })
    res.json({ success: true, data: customers })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching customers' })
  }
}

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        kiosks: true,
        products: {
          include: { category: true },
        },
      },
    })
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' })
    }
    res.json({ success: true, data: customer })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching customer' })
  }
}

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body

    // Validar que el nombre sea único
    const existing = await prisma.customer.findUnique({ where: { name } })
    if (existing) {
      return res.status(400).json({ success: false, error: 'Customer name already exists' })
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
      },
      include: { kiosks: true },
    })

    res.status(201).json({ success: true, data: customer })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error creating customer' })
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, email, phone, address } = req.body

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address,
      },
      include: { kiosks: true },
    })

    res.json({ success: true, data: customer })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating customer' })
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Verificar que no tenga kioscos con ventas
    const kiosks = await prisma.kiosk.findMany({
      where: { customerId: id },
      include: { sales: true },
    })

    const hasSales = kiosks.some((k) => k.sales.length > 0)
    if (hasSales) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete customer with existing sales',
      })
    }

    await prisma.customer.delete({ where: { id } })
    res.json({ success: true, message: 'Customer deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting customer' })
  }
}
