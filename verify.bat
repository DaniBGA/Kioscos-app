@echo off
setlocal enabledelayedexpansion

echo.
echo 🔍 Verificando instalacion del Sistema de Gestion de Kioscos...
echo.

set ERRORS=0

REM Check Node.js
echo 📦 Verificando herramientas...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
    echo ✓ Node.js instalado (!NODE_VER!)
) else (
    echo ✗ Node.js no encontrado
    set /a ERRORS=ERRORS+1
)

REM Check directories
echo.
echo 📁 Verificando estructura de directorios...
if exist frontend (
    echo ✓ Carpeta frontend existe
) else (
    echo ✗ Carpeta frontend no existe
    set /a ERRORS=ERRORS+1
)

if exist backend (
    echo ✓ Carpeta backend existe
) else (
    echo ✗ Carpeta backend no existe
    set /a ERRORS=ERRORS+1
)

REM Check config files
echo.
echo ⚙️  Verificando archivos de configuracion...
if exist frontend\package.json (
    echo ✓ frontend\package.json existe
) else (
    echo ✗ frontend\package.json no existe
    set /a ERRORS=ERRORS+1
)

if exist backend\package.json (
    echo ✓ backend\package.json existe
) else (
    echo ✗ backend\package.json no existe
    set /a ERRORS=ERRORS+1
)

REM Check node_modules
echo.
echo 📦 Verificando dependencias...
if exist frontend\node_modules (
    echo ✓ Dependencias frontend instaladas
) else (
    echo ✗ Dependencias frontend NO instaladas
    set /a ERRORS=ERRORS+1
)

if exist backend\node_modules (
    echo ✓ Dependencias backend instaladas
) else (
    echo ✗ Dependencias backend NO instaladas
    set /a ERRORS=ERRORS+1
)

REM Summary
echo.
echo ════════════════════════════════════════════════════
if %ERRORS% equ 0 (
    echo ✓ Instalacion correcta! Todo listo para empezar
    echo.
    echo Proximos pasos:
    echo   1. Abre dos Command Prompts
    echo   2. Prompt 1: cd backend ^&^& npm run dev
    echo   3. Prompt 2: cd frontend ^&^& npm run dev
    echo   4. Abre http://localhost:5173
) else (
    echo ✗ Se encontraron %ERRORS% error(es)
    echo.
    echo Revisa los errores arriba y ejecuta setup.bat nuevamente
)
echo ════════════════════════════════════════════════════
echo.

pause
