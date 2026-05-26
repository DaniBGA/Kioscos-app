import { formatCurrency } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductTableProps {
  products: Product[]
  isLoading?: boolean
  onEdit?: (product: Product) => void
  onDelete?: (id: string) => void
}

export default function ProductTable({ products, isLoading, onEdit, onDelete }: ProductTableProps) {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Cargando productos...</div>
  }

  if (!products || products.length === 0) {
    return <div className="p-4 text-center text-gray-500">No hay productos</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-2 text-left font-bold text-gray-700">Producto</th>
              <th className="px-4 py-2 text-center font-bold text-gray-700">Stock</th>
              <th className="px-4 py-2 text-right font-bold text-gray-700">Precio</th>
              <th className="px-4 py-2 text-right font-bold text-gray-700">Costo</th>
              <th className="px-4 py-2 text-center font-bold text-gray-700">Margen</th>
              <th className="px-4 py-2 text-center font-bold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const margin = ((product.price - product.cost) / product.price * 100).toFixed(1)
              const isLowStock = product.stock <= product.minStock
              
              return (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div>
                      <p className="font-bold text-gray-900">{product.name}</p>
                      {isLowStock && (
                        <p className="text-xs text-red-600">⚠️ Stock bajo</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={isLowStock ? 'text-red-600 font-bold' : ''}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right font-bold">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-600">
                    {formatCurrency(product.cost)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className="text-secondary font-bold">{margin}%</span>
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(product)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                      >
                        ✏️
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(product.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-xs"
                      >
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
