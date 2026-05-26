import { cn } from '@/lib/utils'

type ScreenId = 'dashboard' | 'sale' | 'history' | 'stock' | 'prices' | 'cashflow' | 'suppliers' | 'afip' | 'pl' | 'caja' | 'clients'

interface SidebarProps {
  currentScreen: ScreenId
  onNavigate: (screen: ScreenId) => void
}

export default function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  const navItems = [
    { icon: '🏠', label: 'Dashboard', id: 'dashboard' as const },
    { icon: '💰', label: 'Registrar venta', id: 'sale' as const },
    { icon: '📋', label: 'Historial de ventas', id: 'history' as const },
    { icon: '📦', label: 'Stock', id: 'stock' as const },
    { icon: '🏷️', label: 'Actualizar precios', id: 'prices' as const },
    { icon: '💼', label: 'Ingresos / Egresos', id: 'cashflow' as const },
    { icon: '🤝', label: 'Proveedores', id: 'suppliers' as const },
    { icon: '🧾', label: 'Facturación AFIP', id: 'afip' as const },
    { icon: '📊', label: 'Resultados del mes', id: 'pl' as const },
    { icon: '🏧', label: 'Caja', id: 'caja' as const },
    { icon: '⭐', label: 'Clientes / Puntos', id: 'clients' as const },
  ]

  return (
    <aside className="w-56 bg-primary text-white flex flex-col flex-shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <h1 className="text-lg font-black">KioscoApp</h1>
        <p className="text-xs text-blue-300 mt-1">Sistema de gestión</p>
      </div>

      {/* Kiosco Info */}
      <div className="p-3 border-b border-white/10 flex gap-3 items-center">
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold text-sm">
          K
        </div>
        <div className="text-sm">
          <p className="font-bold text-white">Kiosco Don Roberto</p>
          <p className="text-xs text-blue-300">Plan Base · 1 sucursal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2 rounded text-sm font-medium transition-all mb-1',
              currentScreen === item.id
                ? 'bg-secondary text-white'
                : 'text-blue-200 hover:bg-white/10'
            )}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-xs text-blue-300">
        <p>© 2026 KioscoApp</p>
      </div>
    </aside>
  )
}
