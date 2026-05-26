import { useSalesStats } from '@/hooks'
import { formatCurrency } from '@/lib/utils'

export default function Dashboard() {
  const { data: stats, isLoading } = useSalesStats()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <p className="text-xs uppercase font-bold text-gray-500 mb-2">Ventas hoy</p>
          <p className="text-2xl font-black text-primary">$0</p>
          <p className="text-xs text-secondary mt-1">↑ 0% vs ayer</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <p className="text-xs uppercase font-bold text-gray-500 mb-2">Productos</p>
          <p className="text-2xl font-black text-primary">0</p>
          <p className="text-xs text-gray-500 mt-1">En inventario</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <p className="text-xs uppercase font-bold text-gray-500 mb-2">Bajo stock</p>
          <p className="text-2xl font-black text-danger">0</p>
          <p className="text-xs text-gray-500 mt-1">Productos</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-secondary">
          <p className="text-xs uppercase font-bold text-gray-500 mb-2">Salud</p>
          <p className="text-lg font-black text-primary">✓ Bien</p>
          <p className="text-xs text-secondary mt-1">Margen saludable</p>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* Top 3 Products */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-sm font-bold text-primary mb-4">Top 3 productos de la semana</h2>
          <div className="space-y-3">
            {[
              { rank: '1️⃣', name: 'Producto 1', count: 45 },
              { rank: '2️⃣', name: 'Producto 2', count: 38 },
              { rank: '3️⃣', name: 'Producto 3', count: 32 },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <span className="text-lg font-black">{item.rank}</span>
                <div>
                  <p className="text-sm font-bold text-primary">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.count} unidades</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-sm font-bold text-primary mb-4">Alertas de stock</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <p className="text-sm text-red-600 font-bold">Producto 1</p>
              </div>
              <p className="text-xs text-gray-600">2 unidades</p>
            </div>
            <p className="text-xs text-gray-500 text-center py-4">No hay más alertas</p>
          </div>
        </div>
      </div>

      {isLoading && <p className="text-center text-gray-600 mt-6">Cargando datos...</p>}
    </div>
  )
}
