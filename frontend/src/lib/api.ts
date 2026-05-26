import axios from 'axios'
import type { ApiResponse } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const api = {
  // ============ CUSTOMERS ============
  getCustomers: () => apiClient.get('/clientes'),
  getCustomer: (id: string) => apiClient.get(`/clientes/${id}`),
  createCustomer: (data: unknown) => apiClient.post('/clientes', data),
  updateCustomer: (id: string, data: unknown) => apiClient.put(`/clientes/${id}`, data),

  // ============ KIOSKS ============
  getKiosks: () => apiClient.get('/kioscos'),
  getKiosk: (id: string) => apiClient.get(`/kioscos/${id}`),
  getKiosksByCustomer: (customerId: string) => apiClient.get(`/clientes/${customerId}/kioscos`),
  createKiosk: (data: unknown) => apiClient.post('/kioscos', data),
  updateKiosk: (id: string, data: unknown) => apiClient.put(`/kioscos/${id}`, data),

  // ============ PRODUCTS (GLOBALES) ============
  getProducts: (onlyCustom?: boolean) => 
    apiClient.get('/productos', { params: { custom: onlyCustom } }),
  getProduct: (id: string) => apiClient.get(`/productos/${id}`),
  createProduct: (data: unknown) => apiClient.post('/productos', data),
  updateProduct: (id: string, data: unknown) => apiClient.put(`/productos/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/productos/${id}`),

  // ============ KIOSK PRODUCTS (Inventario por kiosco) ============
  getKioskProducts: (kioskId: string) => apiClient.get(`/kioscos/${kioskId}/productos`),
  updateKioskProduct: (kioskId: string, productId: string, data: unknown) =>
    apiClient.put(`/kioscos/${kioskId}/productos/${productId}`, data),
  addProductToKiosk: (kioskId: string, data: unknown) =>
    apiClient.post(`/kioscos/${kioskId}/productos`, data),
  removeProductFromKiosk: (kioskId: string, productId: string) =>
    apiClient.delete(`/kioscos/${kioskId}/productos/${productId}`),

  // ============ CATEGORIES ============
  getCategories: () => apiClient.get('/categorias'),
  createCategory: (data: unknown) => apiClient.post('/categorias', data),
  updateCategory: (id: string, data: unknown) => apiClient.put(`/categorias/${id}`, data),

  // ============ SALES ============
  getSales: () => apiClient.get('/ventas'),
  getSalesByKiosk: (kioskId: string) => apiClient.get(`/kioscos/${kioskId}/ventas`),
  getSaleStats: () => apiClient.get('/ventas/stats'),
  getSaleStatsByKiosk: (kioskId: string) => apiClient.get(`/kioscos/${kioskId}/ventas/stats`),
  createSale: (data: unknown) => apiClient.post('/ventas', data),

  // ============ SUPPLIERS ============
  getSuppliers: () => apiClient.get('/proveedores'),
  getSuppliersByKiosk: (kioskId: string) => apiClient.get(`/kioscos/${kioskId}/proveedores`),
  getSupplier: (id: string) => apiClient.get(`/proveedores/${id}`),
  createSupplier: (data: unknown) => apiClient.post('/proveedores', data),
  updateSupplier: (id: string, data: unknown) => apiClient.put(`/proveedores/${id}`, data),
}

export default api
