import { formatCurrency, formatDate } from '@/lib/utils'
import type { Sale } from '@/types'

interface RecentSalesProps {
  sales: Sale[]
  isLoading?: boolean
}

export default function RecentSales({ sales, isLoading }: RecentSalesProps) {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Cargando ventas...</div>
  }

  if (!sales || sales.length === 0) {
    return <div className="p-4 text-center text-gray-500">No hay ventas registradas</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-sm font-bold text-primary">Últimas ventas</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-2 text-left font-bold text-gray-700">Fecha</th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">Items</th>
              <th className="px-4 py-2 text-right font-bold text-gray-700">Total</th>
              <th className="px-4 py-2 text-center font-bold text-gray-700">Método</th>
            </tr>
          </thead>
          <tbody>
            {sales.slice(0, 5).map((sale) => (
              <tr key={sale.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{formatDate(sale.date)}</td>
                <td className="px-4 py-2">{sale.items?.length || 0}</td>
                <td className="px-4 py-2 text-right font-bold text-primary">
                  {formatCurrency(sale.total)}
                </td>
                <td className="px-4 py-2 text-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {sale.paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
