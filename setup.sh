#!/bin/bash

echo "🚀 Iniciando instalación del Sistema de Gestión de Kioscos..."
echo ""

# Detectar SO
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PKG_MANAGER="apt"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    PKG_MANAGER="brew"
else
    echo "❌ SO no soportado"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "📦 Instalando Node.js..."
    if [ "$PKG_MANAGER" = "apt" ]; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        brew install node
    fi
fi

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "📦 Instala Docker desde https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo "✅ Node.js versión: $(node --version)"
echo "✅ Docker versión: $(docker --version)"
echo ""

# Iniciar PostgreSQL con Docker Compose
echo "🐘 Iniciando PostgreSQL con Docker Compose..."
docker-compose up -d postgres redis

echo ""
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 5

# Configurar Backend
echo ""
echo "📦 Configurando Backend..."
cd backend || exit

cp .env.example .env
sed -i 's/postgresql:\/\/user:password@localhost:5432\/kioscos_app/postgresql:\/\/kioscos_user:kioscos_password@localhost:5432\/kioscos_app/g' .env

npm install
echo "✅ Dependencias del backend instaladas"

echo "🔧 Ejecutando migraciones de Prisma..."
npm run prisma:migrate || npm run prisma:generate

cd ..

# Configurar Frontend
echo ""
echo "⚛️  Configurando Frontend..."
cd frontend || exit

cp .env.example .env.local

npm install
echo "✅ Dependencias del frontend instaladas"

cd ..

echo ""
echo "✨ ¡Instalación completada!"
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Abre dos terminales"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd backend && npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ cd frontend && npm run dev"
echo ""
echo "2. Abre http://localhost:5173 en tu navegador"
echo ""
echo "Para ver la base de datos:"
echo "   $ cd backend && npm run prisma:studio"
echo ""
