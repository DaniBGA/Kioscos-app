# Checklist de Desarrollo

## Configuración Inicial ✅

- [ ] Clonar repositorio
- [ ] Ejecutar `npm install` en frontend y backend
- [ ] Crear archivos `.env` con variables correctas
- [ ] Ejecutar `npm run prisma:migrate` en backend
- [ ] Verificar que PostgreSQL está corriendo
- [ ] Iniciar backend (`npm run dev`)
- [ ] Iniciar frontend (`npm run dev`)
- [ ] Acceder a http://localhost:5173

## Features por Implementar

### Dashboard ⭐ (Alta Prioridad)
- [ ] Mostrar KPIs en tiempo real
- [ ] Gráficos de ventas
- [ ] Tabla de últimas ventas
- [ ] Alertas de stock bajo
- [ ] Estadísticas de margen

### Gestión de Productos
- [ ] Crear producto
- [ ] Editar producto
- [ ] Eliminar producto
- [ ] Importar desde CSV
- [ ] Actualización masiva de precios
- [ ] Historial de cambios de precio

### Registro de Ventas
- [ ] Selector de productos
- [ ] Carrito de compra
- [ ] Cálculo de totales
- [ ] Descuentos
- [ ] Split de pago (efectivo + tarjeta)
- [ ] Historial de ventas
- [ ] Búsqueda y filtros

### Inventario
- [ ] Vista de stock
- [ ] Alertas de stock bajo
- [ ] Movimientos de stock
- [ ] Ajustes manuales
- [ ] Reportes de inventario

### Proveedores
- [ ] Crear proveedor
- [ ] Editar proveedor
- [ ] Listar productos por proveedor
- [ ] Historial de compras
- [ ] Contacto directo

### Finanzas
- [ ] Registrar ingresos/egresos
- [ ] Resultados mensuales (P&L)
- [ ] Punto de equilibrio
- [ ] Margen de ganancia
- [ ] Flujo de caja

### Facturación AFIP (Argentina)
- [ ] Integración AFIP
- [ ] Generación de facturas
- [ ] Historial de facturas
- [ ] Descargas de comprobantes

### Fidelización
- [ ] Sistema de puntos
- [ ] Registro de clientes
- [ ] Historial de compras por cliente
- [ ] Beneficios/descuentos

### Caja
- [ ] Apertura/cierre de caja
- [ ] Movimientos del día
- [ ] Cuadratura
- [ ] Reportes diarios

## Optimizaciones Técnicas

### Frontend
- [ ] Code splitting en rutas
- [ ] Lazy loading de componentes
- [ ] Optimizar imágenes
- [ ] Minificación CSS/JS
- [ ] Prefetch de rutas
- [ ] PWA (app offline)

### Backend
- [ ] Índices en BD
- [ ] Pagination en endpoints
- [ ] Caching con Redis
- [ ] Rate limiting
- [ ] Compresión GZIP
- [ ] Logs estructurados

### Testing
- [ ] Tests unitarios frontend (20% coverage)
- [ ] Tests unitarios backend (30% coverage)
- [ ] Tests de integración API (50% coverage)
- [ ] Tests E2E (principales flujos)

## Seguridad

- [ ] Validación en frontend
- [ ] Validación en backend
- [ ] Sanitización de inputs
- [ ] CORS configurado
- [ ] HTTPS en producción
- [ ] Variables sensibles en .env
- [ ] Rate limiting

## Documentación

- [ ] README.md completo
- [ ] Guía de instalación
- [ ] Documentación de API
- [ ] Diagramas de arquitectura
- [ ] Guía de contribución
- [ ] Changelog

## Deployment

- [ ] Build frontend optimizado
- [ ] Build backend sin errores
- [ ] Dockerfiles funcionales
- [ ] docker-compose para producción
- [ ] Variables de entorno en producción
- [ ] Base de datos en producción
- [ ] SSL/TLS configurado
- [ ] Backups automáticos
- [ ] Monitoreo en producción

## Performance Goals

- [ ] Lighthouse score > 90
- [ ] TTL para imágenes > 1 año
- [ ] Tamaño bundle JS < 500KB gzipped
- [ ] API response < 200ms (p95)
- [ ] Uptime > 99.5%

## Bugs Conocidos y Fixes

- [ ] Dashboard no se actualiza en tiempo real (necesita WebSocket)
- [ ] Formularios no guardan state en recarga
- [ ] Validaciones no están integradas completamente

## Siguiente Sprint

1. Implementar autenticación
2. Mejorar interfaz de ventas
3. Agregar gráficos de reportes
4. Optimizar queries de BD

---

**Estado General:** 🔄 En Desarrollo
**Última Actualización:** 26 de mayo de 2026
