import { useState } from 'react'
import type { Product } from '@/types'

interface ProductFormProps {
  product?: Product
  categories: Array<{ id: string; name: string }>
  onSubmit: (data: Partial<Product>) => Promise<void>
  isLoading?: boolean
}

export default function ProductForm({ product, categories, onSubmit, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      description: '',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      categoryId: '',
      barcode: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: ['price', 'cost', 'stock', 'minStock'].includes(name) ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Nombre del producto"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Código de barras</label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            placeholder="EAN/UPC"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Descripción</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          rows={2}
          placeholder="Descripción del producto"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Categoría *</label>
          <select
            name="categoryId"
            value={formData.categoryId || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="">Seleccionar...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Stock mínimo</label>
          <input
            type="number"
            name="minStock"
            value={formData.minStock || 0}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Costo *</label>
          <input
            type="number"
            name="cost"
            value={formData.cost || 0}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Precio venta *</label>
          <input
            type="number"
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Stock actual</label>
          <input
            type="number"
            name="stock"
            value={formData.stock || 0}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {formData.price && formData.cost && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-gray-600">
            Margen: <span className="font-bold text-secondary">
              {(((formData.price as number) - (formData.cost as number)) / (formData.price as number) * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-accent disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
        </button>
        <button
          type="reset"
          className="px-4 py-2 border border-gray-300 rounded-lg font-bold hover:bg-gray-50"
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}
