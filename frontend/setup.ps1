# Car Safety Evaluation Frontend Setup Script for PowerShell
# This script sets up the React TypeScript frontend application

Write-Host "🚀 Setting up Car Safety Evaluation Frontend..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 16+ and try again." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm and try again." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Create environment file template
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating environment file..." -ForegroundColor Yellow
    @"
# API Configuration
REACT_APP_API_URL=http://localhost:8000

# App Configuration
REACT_APP_NAME=Car Safety Evaluation
REACT_APP_VERSION=1.0.0
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Environment file created (.env)" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the development server:" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Open your browser to:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. To connect to your backend API:" -ForegroundColor White
Write-Host "   - Update REACT_APP_API_URL in .env file" -ForegroundColor Yellow
Write-Host "   - Make sure your backend implements the required endpoints" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 For more information, check README.md" -ForegroundColor Cyan

Read-Host "Press Enter to continue"