# Arquitectura del Proyecto - Kioscos App v0.2.0

## Descripción General

Sistema de gestión multi-negocio para kioscos, permitiendo que clientes (empresas) gestionen múltiples sucursales con inventario compartido pero stocks independientes por sucursal.

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Components (UI Reutilizables)                        │   │
│  │ - Sidebar, Topbar, Tables, Forms, Cards             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Pages (Pantallas principales)                        │   │
│  │ - Dashboard, Products, Sales, Suppliers, Customers   │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Hooks (React Query + Custom)                         │   │
│  │ - useCustomers, useKiosks, useKioskProducts, etc     │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Client API (Axios)                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────┬───────────────────────────────────────────────┘
             │ HTTP/REST API
             ▼
┌─────────────────────────────────────────────────────────────┐
│                 Express Backend (Node.js)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Routes (API Endpoints - RESTful)                      │   │
│  │ /api/clientes, /api/kioscos, /api/productos         │   │
│  │ /api/ventas, /api/proveedores                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Controllers (Business Logic)                         │   │
│  │ - customerController, kioskController, etc           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Middleware (CORS, Auth, Validation)                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Prisma ORM (TypeScript)                              │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────┬───────────────────────────────────────────────┘
             │ SQL
             ▼
┌─────────────────────────────────────────────────────────────┐
│                      PostgreSQL                              │
│  Tables: Customer, Kiosk, KioskProduct, Product,            │
│          Category, Sale, SaleItem, Supplier, etc            │
└─────────────────────────────────────────────────────────────┘
```

---

## Modelo de Datos Multi-Negocio

### Estructura Jerárquica

```
Customer (Empresa/Negocio principal)
├── Kiosk 1 (Centro)
│   ├── KioskProduct → Product A (Stock 50, Precio $2.50)
│   ├── KioskProduct → Product B (Stock 100, Precio $0.50)
│   ├── Sales
│   ├── Suppliers
│   └── CashFlow
├── Kiosk 2 (Zona Norte)
│   ├── KioskProduct → Product A (Stock 30, Precio $3.00) ← Mismo producto, diferente precio!
│   ├── KioskProduct → Product B (Stock 75, Precio $0.50)
│   ├── Sales
│   └── Suppliers
└── Kiosk N...

Catálogos Globales
├── Product (Catálogo compartido)
│   ├── Producto estándar (global)
│   └── Producto personalizado (de cliente específico)
├── Category (Categorías globales)
└── Supplier (Por kiosco)
```

### Cambios Principales vs. v0.1.0

| Aspecto | v0.1.0 | v0.2.0 |
|---------|--------|--------|
| **Modelo** | Un kiosco | Un cliente → múltiples kioscos |
| **Productos** | Por kiosco (duplicados) | Global (sin duplicación) |
| **Stock** | Product.stock | KioskProduct.stock (por kiosco) |
| **Precios** | Fijo | Flexible (base + override por kiosco) |
| **Clientes** | No existía | Nuevo: Customer model |
| **Inventario** | N/A | Nuevo: KioskProduct join table |

---

## Base de Datos (PostgreSQL + Prisma)

### Tablas y Relaciones

```
Customer (1) ──→ (M) Kiosk
Kiosk (1) ──→ (M) KioskProduct
Product (1) ──→ (M) KioskProduct
Product (M) ──→ (1) Category
Kiosk (1) ──→ (M) Sale
Sale (1) ──→ (M) SaleItem
SaleItem (M) ──→ (1) Product
Kiosk (1) ──→ (M) Supplier
Supplier (M) ──→ (M) Product (via SupplierProduct)
Kiosk (1) ──→ (M) CashFlow
```

### Modelos Principales

| Modelo | Clave | Descripción |
|--------|-------|-------------|
| **Customer** | `id` | Cliente/empresa (múltiples negocios) |
| **Kiosk** | `id`, `customerId` | Sucursal/negocio del cliente |
| **Product** | `id` | Producto global (catálogo) |
| **KioskProduct** | `kioskId`, `productId` | Stock e inventario por sucursal |
| **Category** | `id` | Categoría global de productos |
| **Sale** | `id`, `kioskId` | Venta (registrada en kiosco específico) |
| **SaleItem** | `id`, `saleId` | Item de venta |
| **Supplier** | `id`, `kioskId` | Proveedor de sucursal |
| **SupplierProduct** | `supplierId`, `productId` | Relación proveedor-producto |
| **CashFlow** | `id`, `kioskId` | Ingresos/egresos |

---

## API REST - Endpoints

### Clientes
```
GET    /api/clientes              # Listar todos con sus kioscos
GET    /api/clientes/:id          # Cliente específico
POST   /api/clientes              # Crear cliente
PUT    /api/clientes/:id          # Actualizar
DELETE /api/clientes/:id          # Eliminar (si no tiene ventas)
```

### Kioscos (Sucursales)
```
GET    /api/kioscos               # Todos los kioscos
GET    /api/kioscos/:id           # Kiosco específico con sus datos
POST   /api/kioscos               # Crear kiosco para cliente
PUT    /api/kioscos/:id           # Actualizar
DELETE /api/kioscos/:id           # Eliminar (si no tiene ventas)
```

### Inventario por Kiosco (Relación KioskProduct)
```
GET    /api/kioscos/:kioskId/productos              # Stock del kiosco
POST   /api/kioscos/:kioskId/productos              # Agregar producto
PUT    /api/kioscos/:kioskId/productos/:productId   # Actualizar stock/precio
DELETE /api/kioscos/:kioskId/productos/:productId   # Remover producto
```

### Productos (Global)
```
GET    /api/productos             # Catálogo global + custom del cliente
GET    /api/productos?custom=true # Solo productos personalizados
GET    /api/productos/:id         # Producto específico
POST   /api/productos             # Crear producto
PUT    /api/productos/:id         # Actualizar
DELETE /api/productos/:id         # Eliminar
```

### Ventas
```
GET    /api/ventas                            # Todas las ventas
GET    /api/kioscos/:kioskId/ventas          # Ventas del kiosco
POST   /api/ventas                            # Registrar venta
GET    /api/ventas/stats                      # Estadísticas globales
GET    /api/kioscos/:kioskId/ventas/stats    # Stats del kiosco
```

### Proveedores
```
GET    /api/proveedores                       # Todos
GET    /api/kioscos/:kioskId/proveedores     # Por kiosco
POST   /api/proveedores                       # Crear
PUT    /api/proveedores/:id                   # Actualizar
DELETE /api/proveedores/:id                   # Eliminar
```

---

## Flujos de Datos Principales

### 1. Registrar Venta (Actualiza stock correcto)
```
Usuario selecciona Kiosco: "Centro"
     ↓
POST /api/ventas
{
  kioskId: "kiosk_centro",
  items: [{ productId: "prod_1", quantity: 10 }]
}
     ↓
Backend:
  ✓ Crea Sale con kioskId
  ✓ Decrementa KioskProduct(Centro) stock
  ✓ NO afecta KioskProduct(Zona Norte)
```

### 2. Agregar Producto a Kiosco
```
POST /api/kioscos/kiosk_centro/productos
{
  productId: "prod_coca",
  stock: 50,
  minStock: 5,
  price: 2.50
}
     ↓
Crea KioskProduct con esos valores
```

### 3. Producto Personalizado del Cliente
```
POST /api/productos
{
  name: "Papas Fritas Caseras",
  basePrice: 1.20,
  isCustom: true,
  customerId: "cust_1"
}
     ↓
Producto creado con customerId
Solo disponible para ese cliente
```

---

## Tipos TypeScript (Frontend)

```typescript
// Customer con sus kioscos
interface Customer {
  id: string
  name: string
  email: string
  phone: string
  kiosks: Kiosk[]
  createdAt: Date
  updatedAt: Date
}

// Kiosk/Sucursal
interface Kiosk {
  id: string
  name: string
  customerId: string
  customer?: Customer
  kioskProducts: KioskProduct[]
  createdAt: Date
  updatedAt: Date
}

// Producto (Global)
interface Product {
  id: string
  name: string
  basePrice: number
  baseCost: number
  categoryId: string
  category?: Category
  isCustom: boolean
  customerId?: string
  createdAt: Date
  updatedAt: Date
}

// Stock e inventario de kiosco (Relación)
interface KioskProduct {
  id: string
  kioskId: string
  productId: string
  product?: Product
  stock: number
  minStock: number
  price: number  // Precio específico del kiosco
  createdAt: Date
  updatedAt: Date
}

// Venta
interface Sale {
  id: string
  date: Date
  total: number
  paymentMethod: string
  kioskId: string
  kiosk?: Kiosk
  items: SaleItem[]
  createdAt: Date
  updatedAt: Date
}

// Item de venta
interface SaleItem {
  id: string
  saleId: string
  productId: string
  quantity: number
  unitPrice: number
  subtotal: number
  product?: Product
}
```

---

## Validaciones y Reglas de Negocio

### Constraints de BD
- ✅ `Customer.name` UNIQUE
- ✅ `Kiosk(customerId, name)` UNIQUE (nombre único por cliente)
- ✅ `Product.barcode` UNIQUE
- ✅ `Product.sku` UNIQUE
- ✅ `KioskProduct(kioskId, productId)` UNIQUE

### Reglas de Negocio
- ✅ No se puede eliminar Customer si tiene ventas
- ✅ No se puede eliminar Kiosk si tiene ventas
- ✅ Stock no puede ser negativo
- ✅ Precio debe ser > 0
- ✅ Producto personalizado solo aparece para su cliente

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Client State** | React Query (TanStack Query) |
| **HTTP Client** | Axios |
| **Backend** | Express.js + Node.js + TypeScript |
| **Database ORM** | Prisma 5.8 |
| **Database** | PostgreSQL |
| **Styling** | TailwindCSS |

---

## Estructura de Carpetas

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── customerController.ts
│   │   │   ├── kioskController.ts
│   │   │   ├── productController.ts
│   │   │   ├── saleController.ts
│   │   │   ├── supplierController.ts
│   │   │   └── ...
│   │   ├── routes/
│   │   │   ├── customers.ts
│   │   │   ├── kiosks.ts
│   │   │   ├── products.ts
│   │   │   ├── sales.ts
│   │   │   ├── suppliers.ts
│   │   │   └── index.ts
│   │   ├── lib/
│   │   │   └── prisma.ts
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Sales.tsx
│   │   │   ├── Suppliers.tsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── lib/
│   │   │   └── api.ts
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── ARCHITECTURE.md (este archivo)
├── MULTIBUSINESS.md (guía multi-negocio)
└── README.md
```

---

## Notas de Desarrollo

- Todos los tipos están en TypeScript (sin `any`)
- Controllers validan relaciones antes de operar
- API sigue patrones REST
- Cascading deletes previene orfandad de datos
- React Query maneja caché y sincronización

Para más detalles sobre la arquitectura multi-negocio, ver [MULTIBUSINESS.md](./MULTIBUSINESS.md).
```

## Estructura de Carpetas Detallada

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx       # Navegación lateral
│   │   │   └── Topbar.tsx        # Barra superior
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx       # Tarjeta de métrica
│   │   │   └── RecentSales.tsx   # Tabla de ventas recientes
│   │   └── productos/
│   │       ├── ProductTable.tsx  # Tabla de productos
│   │       └── ProductForm.tsx   # Formulario de producto
│   │
│   ├── hooks/
│   │   └── index.ts              # Custom hooks (React Query)
│   │
│   ├── lib/
│   │   ├── api.ts                # Cliente Axios
│   │   └── utils.ts              # Funciones utilitarias
│   │
│   ├── pages/
│   │   └── Dashboard.tsx         # Página principal
│   │
│   ├── types/
│   │   └── index.ts              # Tipos TypeScript
│   │
│   ├── App.tsx                   # Componente raíz
│   ├── main.tsx                  # Entrada de la app
│   └── index.css                 # Estilos globales
│
├── public/                       # Archivos estáticos
├── index.html                    # HTML principal
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### Backend

```
backend/
├── src/
│   ├── controllers/              # Lógica de negocio
│   │   ├── productController.ts
│   │   ├── saleController.ts
│   │   └── supplierController.ts
│   │
│   ├── routes/                   # Definición de endpoints
│   │   ├── products.ts
│   │   ├── sales.ts
│   │   └── suppliers.ts
│   │
│   ├── middleware/               # Middlewares
│   │   └── errorHandler.ts       # Manejo de errores
│   │
│   ├── lib/
│   │   └── prisma.ts             # Cliente Prisma
│   │
│   └── index.ts                  # Servidor Express
│
├── prisma/
│   ├── schema.prisma             # Esquema de BD
│   └── migrations/               # Historial de cambios
│
├── package.json
├── tsconfig.json
└── .env.example
```

## Flujo de Datos

### 1. Crear Producto

```
1. Usuario ingresa datos en ProductForm
   ↓
2. onSubmit() llama a api.createProduct()
   ↓
3. POST /api/productos → Backend
   ↓
4. productController.createProduct() procesa
   ↓
5. Prisma crea registro en BD
   ↓
6. Response con producto creado
   ↓
7. React Query invalida cache (queryKey: ['products'])
   ↓
8. useProducts() re-fetch automático
   ↓
9. UI se actualiza con nuevo producto
```

### 2. Listar Ventas

```
1. useSales() hook ejecuta
   ↓
2. React Query realiza GET /api/ventas
   ↓
3. saleController.getSales() consulta BD
   ↓
4. Prisma obtiene ventas con items relacionados
   ↓
5. Response JSON
   ↓
6. React Query cachea resultado
   ↓
7. Componente RecentSales renderiza tabla
```

## Tipos y Entidades

### Core Entities

```typescript
// Producto
Product {
  id: string
  name: string
  price: float
  cost: float
  stock: int
  minStock: int
  categoryId: string
  category: Category
}

// Venta
Sale {
  id: string
  date: DateTime
  total: float
  paymentMethod: 'cash' | 'card' | 'both'
  items: SaleItem[]
}

// Proveedor
Supplier {
  id: string
  name: string
  products: SupplierProduct[]
}
```

## Patrones Utilizados

### Frontend

1. **Custom Hooks con React Query**
   - Centraliza lógica de datos
   - Caché automático
   - Invalidación inteligente
   
2. **Componentes Funcionales**
   - Props para configuración
   - Separación de responsabilidades
   
3. **TailwindCSS**
   - Utilidades de CSS
   - Configuración compartida

### Backend

1. **Controllers**
   - Lógica de negocio separada de rutas
   - Reutilizable
   
2. **Prisma ORM**
   - Queries tipadas
   - Migraciones versionadas
   - Schema-first

3. **Express Middlewares**
   - Validación
   - CORS
   - Error handling

## Gestión de Estado

### Frontend (React Query)

```typescript
// Query (lectura)
const { data, isLoading, error } = useProducts()

// Mutation (escritura)
const { mutate, isPending } = useCreateSale()
```

### Invalidación de Cache

```typescript
queryClient.invalidateQueries({ queryKey: ['sales'] })
```

## Seguridad (Futuro)

- [ ] JWT para autenticación
- [ ] Roles y permisos (RBAC)
- [ ] Validación en servidor
- [ ] Rate limiting
- [ ] HTTPS en producción
- [ ] SQL injection prevention (Prisma)

## Performance

1. **Frontend**
   - Code splitting automático (Vite)
   - Lazy loading de componentes
   - React Query caching
   
2. **Backend**
   - Índices en BD
   - Query optimization
   - Pagination (futuro)

## Testing (Futuro)

```
Frontend: Vitest + React Testing Library
Backend: Jest + Supertest
BD: Test database con fixtures
```

## Deployment

### Frontend
```bash
npm run build  # Generar dist/
# Hospedar en Vercel, Netlify, etc
```

### Backend
```bash
npm run build       # Generar dist/
docker build -t app . # Crear imagen
# Desplegar en Docker, Railway, Heroku, etc
```

## Métricas y Monitoreo (Futuro)

- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Logs (Winston, ELK)
- Analytics (Plausible)

---

**Última actualización:** 26 de mayo de 2026
