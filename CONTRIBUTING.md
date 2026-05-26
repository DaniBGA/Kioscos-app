# Guía de Contribución

Gracias por tu interés en contribuir a este proyecto. Las contribuciones son siempre bienvenidas.

## Antes de Empezar

1. Fork el repositorio
2. Clona tu fork: `git clone https://github.com/tunombre/kioscos-app.git`
3. Crea una rama: `git checkout -b feature/tu-feature`

## Convenciones de Código

### Commits

Usa commits semánticos:

```
feat: Agregar nueva característica
fix: Corregir bug
docs: Cambios en documentación
style: Cambios que no afectan el código
refactor: Refactorizar sin cambiar funcionalidad
perf: Mejora de performance
test: Agregar tests
chore: Tareas de mantenimiento
```

Ejemplo:
```bash
git commit -m "feat: agregar selector de categorías en producto form"
```

### Naming Conventions

#### Frontend (React)
```tsx
// Componentes: PascalCase
const ProductForm = () => { }
const DashboardCard = () => { }

// Hooks: camelCase con prefijo 'use'
const useProducts = () => { }
const useSalesStats = () => { }

// Variables: camelCase
const productList = []
const isLoading = false

// Archivos: PascalCase para componentes, camelCase para otros
ProductForm.tsx
useProducts.ts
api.ts
```

#### Backend (Express)
```ts
// Controllers: camelCase
const getProducts = async (req, res) => { }
const createProduct = async (req, res) => { }

// Routes: kebab-case en URLs
/api/productos
/api/productos/:id
/api/proveedores

// Variables: camelCase
const productList = []
const kioskId = ''
```

### Estructura de Cambios

Mantén los cambios enfocados:
- 1 rama = 1 feature/fix
- Cambios relacionados en un solo commit
- No mezcles refactoring con features nuevas

## Proceso de Contribución

### 1. Crea una rama descriptiva

```bash
git checkout -b feature/nombre-feature
# o
git checkout -b fix/nombre-bug
```

### 2. Haz tus cambios

```bash
# Trabaja en tu feature
# Asegúrate de que los tests pasen

# Frontend
npm run lint
npm run build

# Backend
npm run lint
npm run build
```

### 3. Commit y Push

```bash
git add .
git commit -m "feat: descripción breve del cambio"
git push origin feature/nombre-feature
```

### 4. Abre un Pull Request

En GitHub, abre un PR con:
- Título descriptivo
- Descripción de cambios
- Linked issues (si aplica)
- Screenshots (para cambios UI)

### 5. Code Review

Responde a comentarios de revisión y realiza cambios si es necesario.

## Estándares de Código

### TypeScript

```tsx
// ✅ Bien tipado
interface Product {
  id: string
  name: string
  price: number
}

const product: Product = { }

// ❌ Evitar any
const handleClick = (data: any) => { }
```

### React Hooks

```tsx
// ✅ Bien
const MyComponent = () => {
  const { data, isLoading } = useProducts()
  
  return <div>{isLoading ? 'Cargando...' : data}</div>
}

// ❌ Evitar
const MyComponent = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    // Fetch manual
  }, [])
}
```

### Express Controllers

```ts
// ✅ Bien
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()
    res.json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// ❌ Evitar
export const getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, data) => {
    res.send(data)
  })
}
```

## Testing

### Frontend

```tsx
import { render, screen } from '@testing-library/react'
import ProductForm from '@/components/productos/ProductForm'

test('debe mostrar formulario de producto', () => {
  render(<ProductForm />)
  expect(screen.getByText('Nombre')).toBeInTheDocument()
})
```

### Backend

```ts
import request from 'supertest'
import app from '../src/index'

describe('Products API', () => {
  test('GET /api/productos debe retornar lista', async () => {
    const res = await request(app).get('/api/productos')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})
```

## Documentación

- Comenta código complejo
- Actualiza README.md si cambias la estructura
- Documenta nuevos endpoints en ARCHITECTURE.md
- Incluye ejemplos de uso

```tsx
/**
 * Componente para mostrar tarjeta de KPI
 * @param label - Etiqueta del KPI
 * @param value - Valor a mostrar
 * @param trend - Tendencia opcional (% y dirección)
 */
export interface KPICardProps {
  label: string
  value: string | number
  trend?: { percentage: number; isPositive: boolean }
}
```

## Reportar Bugs

1. Verifica que el bug no está reportado
2. Proporciona:
   - Título descriptivo
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots/videos
   - Ambiente (OS, navegador, versiones)

## Solicitar Características

1. Describe el caso de uso
2. Ejemplos de uso
3. Diseño propuesto (si es UI)
4. Impacto estimado

## Preguntas?

- Abre un Discussion
- Contacta al equipo
- Revisa issues existentes

## Code of Conduct

- Sé respetuoso
- Acepta críticas constructivas
- Mantén discusiones enfocadas
- Sin spam o contenido inapropiado

---

**¡Gracias por contribuir! 🙏**
