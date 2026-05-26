# Quick Start Guide 🚀

## Requisitos
- Node.js 18+
- Docker & Docker Compose
- Git

## Instalación Rápida

### macOS / Linux
```bash
chmod +x setup.sh
./setup.sh
```

### Windows
```cmd
setup.bat
```

## Iniciar la Aplicación

**Terminal 1: Backend**
```bash
cd backend
npm run dev
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
```

Luego abre [http://localhost:5173](http://localhost:5173)

## Comandos Útiles

### Backend
```bash
# Iniciar servidor
npm run dev

# Ver base de datos
npm run prisma:studio

# Crear migración
npm run prisma:migrate

# Compilar TypeScript
npm run build
```

### Frontend
```bash
# Iniciar servidor
npm run dev

# Construir para producción
npm run build

# Ver vista previa de build
npm run preview
```

## Conexión a Base de Datos

**Credenciales por defecto:**
- Usuario: `kioscos_user`
- Contraseña: `kioscos_password`
- Base de datos: `kioscos_app`
- Host: `localhost:5432`

## Estructura de Carpetas

```
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── hooks/        # Custom hooks (React Query)
│   │   ├── lib/          # API client, utilidades
│   │   ├── pages/        # Páginas principales
│   │   └── types/        # Tipos TypeScript
│
├── backend/              # Express + Prisma
│   ├── src/
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── routes/       # Rutas API
│   │   ├── lib/          # Configuraciones
│   │   └── middleware/   # Middlewares
│   └── prisma/
│       └── schema.prisma # Esquema BD
```

## Troubleshooting

### Puerto 5432 en uso
```bash
docker kill kioscos_app_db
docker-compose up -d postgres
```

### Migraciones fallidas
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate -- --skip-generate
```

### Limpiar todo
```bash
docker-compose down
rm -rf backend/node_modules frontend/node_modules
npm install # en cada carpeta
```

## Variables de Entorno

### Backend (.env)
```env
DATABASE_URL="postgresql://kioscos_user:kioscos_password@localhost:5432/kioscos_app"
NODE_ENV=development
PORT=3000
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3000/api
```

## API Base URL
- Desarrollo: `http://localhost:3000/api`
- Producción: `https://tudominio.com/api`

## Documentación

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Prisma](https://prisma.io)
- [Express](https://expressjs.com)
- [React Query](https://tanstack.com/query)

## Soporte

Para problemas o preguntas:
1. Revisa el [README.md](./README.md)
2. Abre un issue en el repositorio
3. Contacta al equipo de desarrollo

---

**¡Happy coding! 💻**
