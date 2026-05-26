export type Customer = {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  kiosks?: Kiosk[]
  createdAt: Date
  updatedAt: Date
}

export type Kiosk = {
  id: string
  name: string
  address?: string
  phone?: string
  customerId: string
  customer?: Customer
  createdAt: Date
  updatedAt: Date
}

export type Category = {
  id: string
  name: string
  description?: string
  products?: Product[]
}

export type Product = {
  id: string
  name: string
  description?: string
  barcode?: string
  sku?: string
  basePrice: number
  baseCost: number
  categoryId: string
  category?: Category
  // Para productos personalizados
  isCustom: boolean
  customerId?: string
  customer?: Customer
  createdAt: Date
  updatedAt: Date
}

export type KioskProduct = {
  id: string
  kioskId: string
  kiosk?: Kiosk
  productId: string
  product?: Product
  stock: number
  minStock: number
  price: number // Precio específico del kiosco
  createdAt: Date
  updatedAt: Date
}

export type Sale = {
  id: string
  date: Date
  total: number
  items: SaleItem[]
  paymentMethod: 'cash' | 'card' | 'both'
  kioskId: string
  kiosk?: Kiosk
}

export type SaleItem = {
  id: string
  productId: string
  product?: Product
  quantity: number
  unitPrice: number
  subtotal: number
  saleId: string
}

export type Supplier = {
  id: string
  name: string
  phone?: string
  email?: string
  address?: string
  kioskId: string
  products?: SupplierProduct[]
}

export type SupplierProduct = {
  id: string
  supplierId: string
  supplier?: Supplier
  productId: string
  product?: Product
  cost: number
  leadDays?: number
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

