import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import Dashboard from './pages/Dashboard'

type ScreenId = 'dashboard' | 'sale' | 'history' | 'stock' | 'prices' | 'cashflow' | 'suppliers' | 'afip' | 'pl' | 'caja' | 'clients'

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard')

  return (
    <div className="flex h-screen bg-white">
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title="Dashboard" currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        <main className="flex-1 overflow-y-auto">
          {currentScreen === 'dashboard' && <Dashboard />}
          {/* Otras pantallas se añadirán aquí */}
        </main>
      </div>
    </div>
  )
}

export default App
