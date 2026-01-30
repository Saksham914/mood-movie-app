@echo off
echo ========================================
echo    MoodFlix - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Setup Backend
echo ========================================
echo Setting up Backend...
echo ========================================
cd backend

echo Installing backend dependencies...
call npm install

if exist .env (
    echo [OK] .env file already exists
) else (
    echo Creating .env file from template...
    copy .env.example .env
    echo [OK] .env file created
    echo.
    echo [WARNING] Please edit backend\.env and add your TMDB API key!
    echo Get your free API key from: https://www.themoviedb.org/settings/api
)

cd ..
echo.

REM Setup Frontend
echo ========================================
echo Setting up Frontend...
echo ========================================
cd frontend

echo Installing frontend dependencies...
call npm install

cd ..
echo.

echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Add your TMDB API key to backend\.env
echo 2. Open TWO command prompt windows:
echo    - Window 1: cd backend ^&^& npm run dev
echo    - Window 2: cd frontend ^&^& npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
echo For detailed instructions, see README.md or QUICKSTART.md
echo.
pause
