import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

// ============ CUSTOMERS ============

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => api.getCustomers(),
  })
}

export const useCustomer = (customerId: string) => {
  return useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => api.getCustomer(customerId),
    enabled: !!customerId,
  })
}

// ============ KIOSKS ============

export const useKiosks = (customerId?: string) => {
  return useQuery({
    queryKey: ['kiosks', customerId],
    queryFn: () => (customerId ? api.getKiosksByCustomer(customerId) : api.getKiosks()),
    enabled: customerId !== undefined || customerId === undefined,
  })
}

export const useKiosk = (kioskId: string) => {
  return useQuery({
    queryKey: ['kiosk', kioskId],
    queryFn: () => api.getKiosk(kioskId),
    enabled: !!kioskId,
  })
}

// ============ PRODUCTS (GLOBALES) ============

/**
 * Obtiene todos los productos disponibles del catálogo global + personalizados
 */
export const useProducts = (onlyCustom?: boolean) => {
  return useQuery({
    queryKey: ['products', onlyCustom],
    queryFn: () => api.getProducts(onlyCustom),
  })
}

/**
 * Obtiene productos para un kiosco específico (con stock, precios y disponibilidad)
 */
export const useKioskProducts = (kioskId: string) => {
  return useQuery({
    queryKey: ['kiosk-products', kioskId],
    queryFn: () => api.getKioskProducts(kioskId),
    enabled: !!kioskId,
  })
}

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId),
    enabled: !!productId,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: unknown) => api.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => api.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

// ============ KIOSK PRODUCTS (Inventario por kiosco) ============

/**
 * Actualiza el stock/precio de un producto en un kiosco específico
 */
export const useUpdateKioskProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ kioskId, productId, data }: { kioskId: string; productId: string; data: unknown }) =>
      api.updateKioskProduct(kioskId, productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['kiosk-products', variables.kioskId] })
    },
  })
}

/**
 * Agrega un producto al catálogo de un kiosco
 */
export const useAddProductToKiosk = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ kioskId, data }: { kioskId: string; data: unknown }) =>
      api.addProductToKiosk(kioskId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['kiosk-products', variables.kioskId] })
    },
  })
}

// ============ CATEGORIES ============

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: unknown) => api.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

// ============ SALES ============

export const useSales = (kioskId?: string) => {
  return useQuery({
    queryKey: ['sales', kioskId],
    queryFn: () => (kioskId ? api.getSalesByKiosk(kioskId) : api.getSales()),
  })
}

export const useSalesStats = (kioskId?: string) => {
  return useQuery({
    queryKey: ['sales-stats', kioskId],
    queryFn: () => (kioskId ? api.getSaleStatsByKiosk(kioskId) : api.getSaleStats()),
  })
}

export const useCreateSale = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: unknown) => api.createSale(data),
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ['sales', variables.kioskId] })
      queryClient.invalidateQueries({ queryKey: ['sales-stats', variables.kioskId] })
      queryClient.invalidateQueries({ queryKey: ['kiosk-products', variables.kioskId] })
    },
  })
}

// ============ SUPPLIERS ============

export const useSuppliers = (kioskId?: string) => {
  return useQuery({
    queryKey: ['suppliers', kioskId],
    queryFn: () => (kioskId ? api.getSuppliersByKiosk(kioskId) : api.getSuppliers()),
  })
}

export const useSupplier = (supplierId: string) => {
  return useQuery({
    queryKey: ['supplier', supplierId],
    queryFn: () => api.getSupplier(supplierId),
    enabled: !!supplierId,
  })
}

