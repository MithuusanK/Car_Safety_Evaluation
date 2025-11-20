@echo off
REM Car Safety Evaluation Frontend Setup Script for Windows
REM This script sets up the React TypeScript frontend application

echo 🚀 Setting up Car Safety Evaluation Frontend...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ and try again.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm and try again.
    pause
    exit /b 1
)

echo ✅ npm detected

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create environment file template
if not exist ".env" (
    echo 📝 Creating environment file...
    (
        echo # API Configuration
        echo REACT_APP_API_URL=http://localhost:8000
        echo.
        echo # App Configuration
        echo REACT_APP_NAME=Car Safety Evaluation
        echo REACT_APP_VERSION=1.0.0
    ) > .env
    echo ✅ Environment file created ^(.env^)
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Start the development server:
echo    npm start
echo.
echo 2. Open your browser to:
echo    http://localhost:3000
echo.
echo 3. To connect to your backend API:
echo    - Update REACT_APP_API_URL in .env file
echo    - Make sure your backend implements the required endpoints
echo.
echo 📚 For more information, check README.md
echo.
pause