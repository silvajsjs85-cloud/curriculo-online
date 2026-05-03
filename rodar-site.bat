@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Instalando dependencias...
  npm install --package-lock=false
)

echo Iniciando servidor Vite...
start "Curriculo Online - Vite" cmd /k "cd /d ""%~dp0"" && npm run dev -- --host 127.0.0.1 --port 8080"

echo Abrindo navegador...
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8080/"
