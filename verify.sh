#!/bin/bash

echo "🔍 Verificando instalación del Sistema de Gestión de Kioscos..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track status
ERRORS=0

# Function to check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
        ERRORS=$((ERRORS + 1))
    fi
}

# 1. Check Node.js
echo "📦 Verificando herramientas..."
node --version > /dev/null 2>&1
check "Node.js instalado ($(node --version))"

npm --version > /dev/null 2>&1
check "npm instalado ($(npm --version))"

# 2. Check directories
echo ""
echo "📁 Verificando estructura de directorios..."
[ -d "frontend" ]
check "Carpeta frontend existe"

[ -d "backend" ]
check "Carpeta backend existe"

[ -d "frontend/src" ]
check "Carpeta frontend/src existe"

[ -d "backend/src" ]
check "Carpeta backend/src existe"

# 3. Check configuration files
echo ""
echo "⚙️  Verificando archivos de configuración..."
[ -f "frontend/package.json" ]
check "frontend/package.json existe"

[ -f "backend/package.json" ]
check "backend/package.json existe"

[ -f "backend/prisma/schema.prisma" ]
check "Esquema Prisma existe"

[ -f "docker-compose.yml" ]
check "docker-compose.yml existe"

# 4. Check node_modules
echo ""
echo "📦 Verificando dependencias instaladas..."
[ -d "frontend/node_modules" ]
check "Dependencias frontend instaladas"

[ -d "backend/node_modules" ]
check "Dependencias backend instaladas"

# 5. Check environment files
echo ""
echo "🔐 Verificando variables de entorno..."
[ -f "backend/.env" ] || [ -f "backend/.env.example" ]
check "Backend .env configurado"

[ -f "frontend/.env.local" ] || [ -f "frontend/.env.example" ]
check "Frontend .env.local configurado"

# 6. Check PostgreSQL
echo ""
echo "🗄️  Verificando PostgreSQL..."
docker ps 2>/dev/null | grep -q "postgres"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} PostgreSQL está corriendo"
else
    echo -e "${YELLOW}⚠${NC} PostgreSQL no está corriendo (verificar docker-compose)"
fi

# 7. Try compiling
echo ""
echo "🔧 Compilando código..."
cd backend && npm run build > /dev/null 2>&1
check "Backend compila sin errores"
cd ..

cd frontend && npm run build > /dev/null 2>&1
check "Frontend compila sin errores"
cd ..

# 8. Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ Instalación correcta! Todo listo para empezar 🎉${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "  1. Terminal 1: cd backend && npm run dev"
    echo "  2. Terminal 2: cd frontend && npm run dev"
    echo "  3. Abre http://localhost:5173"
else
    echo -e "${RED}✗ Se encontraron $ERRORS error(es)${NC}"
    echo ""
    echo "Revisa los errores arriba y ejecuta setup.sh nuevamente"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exit $ERRORS
