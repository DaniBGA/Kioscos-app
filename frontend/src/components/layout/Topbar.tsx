type ScreenId = 'dashboard' | 'sale' | 'history' | 'stock' | 'prices' | 'cashflow' | 'suppliers' | 'afip' | 'pl' | 'caja' | 'clients'

interface TopbarProps {
  title: string
  currentScreen: ScreenId
  onNavigate: (screen: ScreenId) => void
}

export default function Topbar({ title }: TopbarProps) {
  const today = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="bg-white border-b border-gray-200 px-7 py-4 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
      <h1 className="text-lg font-bold text-primary">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-600 capitalize">{today}</span>
        <button className="relative p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
        </button>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-accent transition">
          + Registrar venta
        </button>
      </div>
    </header>
  )
}
