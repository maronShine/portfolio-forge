# PortfolioForge Deployment Script (PowerShell)
Write-Host "🚀 PortfolioForge Deployment Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Function to deploy to Vercel
function Deploy-Vercel {
    Write-Host "📦 Deploying to Vercel..." -ForegroundColor Blue
    Set-Location client
    npm run build
    vercel --prod
    Set-Location ..
    Write-Host "✅ Frontend deployed to Vercel!" -ForegroundColor Green
}

# Function to deploy to Railway
function Deploy-Railway {
    Write-Host "📦 Deploying to Railway..." -ForegroundColor Blue
    Set-Location server
    railway login
    railway deploy
    Set-Location ..
    Write-Host "✅ Backend deployed to Railway!" -ForegroundColor Green
}

# Function to deploy both
function Deploy-All {
    Write-Host "📦 Deploying full stack..." -ForegroundColor Blue
    Deploy-Vercel
    Deploy-Railway
    Write-Host "✅ Full stack deployed!" -ForegroundColor Green
}

# Function to setup environment
function Setup-Environment {
    Write-Host "⚙️ Setting up environment..." -ForegroundColor Yellow
    
    # Create .env files if they don't exist
    if (-not (Test-Path "server\.env")) {
        @"
DATABASE_URL="postgresql://username:password@localhost:5432/portfolioforge"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRE="7d"
PORT=5000
NODE_ENV=production
FRONTEND_URL="https://your-vercel-app.vercel.app"
"@ | Out-File -FilePath "server\.env" -Encoding UTF8
        Write-Host "✅ Created server\.env - Please update with your values" -ForegroundColor Green
    }
    
    if (-not (Test-Path "client\.env")) {
        "VITE_API_URL=https://your-railway-app.railway.app/api" | Out-File -FilePath "client\.env" -Encoding UTF8
        Write-Host "✅ Created client\.env - Please update with your Railway URL" -ForegroundColor Green
    }
}

# Function to run tests
function Run-Tests {
    Write-Host "🧪 Running tests..." -ForegroundColor Blue
    Set-Location client
    npm test
    Set-Location ..\server
    npm test
    Set-Location ..
}

# Main script logic
param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("vercel", "railway", "all", "setup", "test")]
    [string]$Command
)

switch ($Command) {
    "vercel" {
        Deploy-Vercel
    }
    "railway" {
        Deploy-Railway
    }
    "all" {
        Deploy-All
    }
    "setup" {
        Setup-Environment
    }
    "test" {
        Run-Tests
    }
    default {
        Write-Host "Usage: .\deploy.ps1 {vercel|railway|all|setup|test}" -ForegroundColor Red
        Write-Host ""
        Write-Host "Commands:" -ForegroundColor Cyan
        Write-Host "  vercel  - Deploy frontend to Vercel" -ForegroundColor White
        Write-Host "  railway - Deploy backend to Railway" -ForegroundColor White
        Write-Host "  all     - Deploy both frontend and backend" -ForegroundColor White
        Write-Host "  setup   - Setup environment files" -ForegroundColor White
        Write-Host "  test    - Run tests" -ForegroundColor White
        Write-Host ""
        Write-Host "Examples:" -ForegroundColor Cyan
        Write-Host "  .\deploy.ps1 setup    # Setup environment first" -ForegroundColor Gray
        Write-Host "  .\deploy.ps1 all       # Deploy full stack" -ForegroundColor Gray
        exit 1
    }
}

Write-Host "🎉 Deployment script completed!" -ForegroundColor Green
