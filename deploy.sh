#!/bin/bash

# PortfolioForge Deployment Script
echo "🚀 PortfolioForge Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to deploy to Vercel
deploy_vercel() {
    echo "📦 Deploying to Vercel..."
    cd client
    npm run build
    vercel --prod
    cd ..
    echo "✅ Frontend deployed to Vercel!"
}

# Function to deploy to Railway
deploy_railway() {
    echo "📦 Deploying to Railway..."
    cd server
    railway login
    railway deploy
    cd ..
    echo "✅ Backend deployed to Railway!"
}

# Function to deploy both
deploy_all() {
    echo "📦 Deploying full stack..."
    deploy_vercel
    deploy_railway
    echo "✅ Full stack deployed!"
}

# Function to setup environment
setup_env() {
    echo "⚙️ Setting up environment..."
    
    # Create .env files if they don't exist
    if [ ! -f "server/.env" ]; then
        cp server/.env.example server/.env 2>/dev/null || echo "DATABASE_URL=\"postgresql://username:password@localhost:5432/portfolioforge\"
JWT_SECRET=\"your-super-secret-jwt-key-change-this-in-production\"
JWT_EXPIRE=\"7d\"
PORT=5000
NODE_ENV=production
FRONTEND_URL=\"https://your-vercel-app.vercel.app\"" > server/.env
        echo "✅ Created server/.env - Please update with your values"
    fi
    
    if [ ! -f "client/.env" ]; then
        echo "VITE_API_URL=\"https://your-railway-app.railway.app/api\"" > client/.env
        echo "✅ Created client/.env - Please update with your Railway URL"
    fi
}

# Function to run tests
run_tests() {
    echo "🧪 Running tests..."
    cd client && npm test
    cd ../server && npm test
    cd ..
}

# Main menu
case "$1" in
    "vercel")
        deploy_vercel
        ;;
    "railway")
        deploy_railway
        ;;
    "all")
        deploy_all
        ;;
    "setup")
        setup_env
        ;;
    "test")
        run_tests
        ;;
    *)
        echo "Usage: $0 {vercel|railway|all|setup|test}"
        echo ""
        echo "Commands:"
        echo "  vercel  - Deploy frontend to Vercel"
        echo "  railway - Deploy backend to Railway"
        echo "  all     - Deploy both frontend and backend"
        echo "  setup   - Setup environment files"
        echo "  test    - Run tests"
        echo ""
        echo "Examples:"
        echo "  ./deploy.sh setup    # Setup environment first"
        echo "  ./deploy.sh all       # Deploy full stack"
        exit 1
        ;;
esac

echo "🎉 Deployment script completed!"
