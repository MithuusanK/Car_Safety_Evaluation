#!/bin/bash

# Car Safety Evaluation Frontend Setup Script
# This script sets up the React TypeScript frontend application

echo "🚀 Setting up Car Safety Evaluation Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file template
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cat > .env << EOL
# API Configuration
REACT_APP_API_URL=http://localhost:8000

# App Configuration
REACT_APP_NAME=Car Safety Evaluation
REACT_APP_VERSION=1.0.0
EOL
    echo "✅ Environment file created (.env)"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server:"
echo "   npm start"
echo ""
echo "2. Open your browser to:"
echo "   http://localhost:3000"
echo ""
echo "3. To connect to your backend API:"
echo "   - Update REACT_APP_API_URL in .env file"
echo "   - Make sure your backend implements the required endpoints"
echo ""
echo "📚 For more information, check README.md"