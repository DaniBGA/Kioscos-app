import { formatCurrency } from '@/lib/utils'

interface KPICardProps {
  label: string
  value: string | number
  trend?: {
    percentage: number
    isPositive: boolean
  }
  icon?: string
}

export default function KPICard({ label, value, trend, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      {icon && <span className="text-2xl mb-2 block">{icon}</span>}
      <p className="text-xs uppercase font-bold text-gray-500 mb-2">{label}</p>
      <p className="text-2xl font-black text-primary">{value}</p>
      {trend && (
        <p className={`text-xs mt-1 ${trend.isPositive ? 'text-secondary' : 'text-danger'}`}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.percentage)}% vs período anterior
        </p>
      )}
    </div>
  )
}
