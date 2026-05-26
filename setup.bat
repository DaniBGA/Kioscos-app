@echo off
echo.
echo 🚀 Sistema de Gestion de Kioscos - Setup Windows
echo.

REM Verificar Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    echo Descárgalo desde https://nodejs.org
    exit /b 1
)

echo ✅ Node.js encontrado: 
node --version

REM Verificar Docker
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker no está instalado
    echo Descárgalo desde https://www.docker.com/products/docker-desktop
    exit /b 1
)

echo ✅ Docker encontrado:
docker --version
echo.

REM Iniciar servicios
echo 🐘 Iniciando PostgreSQL con Docker...
docker-compose up -d postgres redis

echo.
echo ⏳ Esperando a que PostgreSQL esté listo...
timeout /t 5 /nobreak

REM Backend
echo.
echo 📦 Configurando Backend...
cd backend

if not exist .env (
    copy .env.example .env
    echo ✅ Archivo .env creado
)

echo 📥 Instalando dependencias del backend...
call npm install

echo 🔧 Ejecutando migraciones...
call npm run prisma:generate

cd ..

REM Frontend
echo.
echo ⚛️  Configurando Frontend...
cd frontend

if not exist .env.local (
    copy .env.example .env.local
    echo ✅ Archivo .env.local creado
)

echo 📥 Instalando dependencias del frontend...
call npm install

cd ..

echo.
echo ✨ ¡Setup completado!
echo.
echo Próximos pasos:
echo.
echo 1. Abre dos Command Prompts:
echo.
echo    Prompt 1 (Backend):
echo    cd backend && npm run dev
echo.
echo    Prompt 2 (Frontend):
echo    cd frontend && npm run dev
echo.
echo 2. Abre http://localhost:5173 en tu navegador
echo.
echo Para ver la BD:
echo    cd backend && npm run prisma:studio
echo.
pause
