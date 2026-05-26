# Sistema de Gestión de Kioscos - Full Stack

Aplicación completa para la gestión integral de un kiosco: ventas, inventario, proveedores y finanzas.

## Stack Tecnológico

### Frontend
- **React 18** con Vite
- **TailwindCSS** para estilos
- **React Query (TanStack Query)** para manejo de datos
- **TypeScript** para tipado estático
- **Axios** para HTTP client

### Backend
- **Node.js + Express** servidor HTTP
- **Prisma** ORM para base de datos
- **PostgreSQL** como base de datos
- **TypeScript** para tipado

## Estructura del Proyecto

```
kioscos-app/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Librerías (API client, utils)
│   │   ├── pages/           # Páginas principales
│   │   ├── types/           # Tipos TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── backend/                  # Servidor Express
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── routes/          # Rutas API
│   │   ├── middleware/      # Middlewares
│   │   ├── lib/             # Conexión Prisma
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma    # Esquema de BD
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Instalación y Configuración

### Requisitos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Pasos de Instalación

#### 1. Clonar y entrar en el proyecto
```bash
cd kioscos-app
```

#### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tu conexión PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/kioscos_app"

# Ejecutar migraciones de Prisma
npm run prisma:migrate

# Generar cliente Prisma
npm run prisma:generate
```

#### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo .env.local
cp .env.example .env.local

# Verificar que apunta al backend correcto
# VITE_API_URL=http://localhost:3000/api
```

## Ejecutar la Aplicación

### Terminal 1: Backend
```bash
cd backend
npm run dev
# Servidor estará en http://localhost:3000
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# Aplicación estará en http://localhost:5173
```

## Scripts Disponibles

### Backend
- `npm run dev` - Inicia servidor en modo desarrollo con hot reload
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta el servidor compilado
- `npm run prisma:migrate` - Crea/ejecuta migraciones
- `npm run prisma:studio` - Abre Prisma Studio para visualizar BD

### Frontend
- `npm run dev` - Inicia servidor Vite en desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción
- `npm run lint` - Ejecuta linter

## Funcionalidades Principales

- ✅ Dashboard con KPIs
- ✅ Gestión de productos (crear, editar, eliminar)
- ✅ Registro de ventas en tiempo real
- ✅ Control de inventario y stock
- ✅ Gestión de proveedores
- ✅ Historial de ventas
- ✅ Reportes y análisis

## Base de Datos

La estructura incluye las siguientes tablas:

- **Kiosk** - Información del kiosco
- **Product** - Catálogo de productos
- **Category** - Categorías de productos
- **Sale** - Registro de ventas
- **SaleItem** - Items de cada venta
- **Supplier** - Proveedores
- **SupplierProduct** - Relación entre proveedores y productos
- **CashFlow** - Ingresos y egresos

## API Endpoints

### Productos
- `GET /api/productos` - Obtener todos
- `GET /api/productos/:id` - Obtener uno
- `POST /api/productos` - Crear
- `PUT /api/productos/:id` - Actualizar
- `DELETE /api/productos/:id` - Eliminar

### Ventas
- `GET /api/ventas` - Obtener todas
- `GET /api/ventas/stats` - Estadísticas
- `POST /api/ventas` - Crear venta

### Proveedores
- `GET /api/proveedores` - Obtener todos
- `GET /api/proveedores/:id` - Obtener uno
- `POST /api/proveedores` - Crear
- `PUT /api/proveedores/:id` - Actualizar

## Próximas Mejoras

- [ ] Autenticación y autorización
- [ ] Facturación AFIP
- [ ] Sistema de puntos/fidelización
- [ ] Gráficos avanzados
- [ ] Exportación de reportes (PDF/Excel)
- [ ] App móvil
- [ ] WebSocket para actualizaciones en tiempo real

## Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

MIT

## Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.
