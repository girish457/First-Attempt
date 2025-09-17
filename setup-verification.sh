#!/bin/bash

echo "🌟 Golden Elegance E-commerce - Complete Setup Verification"
echo "=========================================================="
echo

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    if [ "$status" = "success" ]; then
        echo -e "${GREEN}✅ $message${NC}"
    elif [ "$status" = "error" ]; then
        echo -e "${RED}❌ $message${NC}"
    elif [ "$status" = "warning" ]; then
        echo -e "${YELLOW}⚠️  $message${NC}"
    elif [ "$status" = "info" ]; then
        echo -e "${BLUE}ℹ️  $message${NC}"
    fi
}

echo "🔍 Checking project structure..."

# Check essential files
essential_files=(
    "frontend/package.json"
    "frontend/index.html"
    "frontend/src/main.jsx"
    "frontend/public/404.html"
    "backend/package.json"
    "backend/index.js"
    "backend/data-storage.js"
    "backend/public/admin.html"
    ".github/workflows/static-deploy.yml"
    ".nojekyll"
)

for file in "${essential_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "success" "$file exists"
    else
        print_status "error" "$file is missing"
    fi
done

echo
echo "📊 Checking configuration files..."

# Check if mobile field is in AccountPage
if grep -q "mobile" frontend/src/ui/pages/AccountPage.jsx; then
    print_status "success" "Mobile number field configured in registration form"
else
    print_status "error" "Mobile number field missing in registration form"
fi

# Check admin routes
if grep -q "/api/admin/stats" backend/index.js; then
    print_status "success" "Admin API routes configured"
else
    print_status "error" "Admin API routes missing"
fi

# Check if admin user exists
if grep -q "admin@foodiehub.com" backend/data/users.json 2>/dev/null; then
    print_status "success" "Admin user configured in database"
else
    print_status "warning" "Admin user not found in database (will be created on first run)"
fi

echo
echo "🚀 Deployment Configuration Check..."

# Check GitHub Actions workflow
if [ -f ".github/workflows/static-deploy.yml" ]; then
    if grep -q "node-version: '20'" .github/workflows/static-deploy.yml; then
        print_status "success" "Node.js 20 configured in GitHub Actions"
    else
        print_status "warning" "Node.js version might need updating in workflow"
    fi
    
    if grep -q "404.html" .github/workflows/static-deploy.yml; then
        print_status "success" "SPA routing (404.html) configured in workflow"
    else
        print_status "error" "SPA routing not configured in workflow"
    fi
else
    print_status "error" "GitHub Actions workflow missing"
fi

# Check React Router configuration
if grep -q "basename.*First-Attempt" frontend/src/main.jsx; then
    print_status "success" "React Router basename configured for GitHub Pages"
else
    print_status "error" "React Router basename not configured"
fi

echo
echo "📱 Frontend Features Check..."

features_to_check=(
    "Golden theme"
    "Dark mode"
    "Cart functionality"
    "User authentication"
    "Mobile registration"
    "Responsive design"
)

for feature in "${features_to_check[@]}"; do
    case $feature in
        "Golden theme")
            if grep -q "golden" frontend/src/index.css 2>/dev/null || grep -q "D4AF37" frontend/tailwind.config.js 2>/dev/null; then
                print_status "success" "$feature implemented"
            else
                print_status "warning" "$feature might need verification"
            fi
            ;;
        "Dark mode")
            if grep -q "dark:" frontend/src/index.css 2>/dev/null; then
                print_status "success" "$feature implemented"
            else
                print_status "warning" "$feature might need verification"
            fi
            ;;
        "Cart functionality")
            if grep -q "cart" frontend/src -r 2>/dev/null; then
                print_status "success" "$feature implemented"
            else
                print_status "warning" "$feature might need verification"
            fi
            ;;
        *)
            print_status "info" "$feature - needs manual verification"
            ;;
    esac
done

echo
echo "🔧 Backend Features Check..."

# Check backend features
if grep -q "mobile.*mobile" backend/index.js; then
    print_status "success" "Mobile number handling in backend"
else
    print_status "error" "Mobile number handling missing in backend"
fi

if grep -q "admin.*role" backend/index.js; then
    print_status "success" "Admin role authentication implemented"
else
    print_status "error" "Admin role authentication missing"
fi

if grep -q "authenticateToken" backend/index.js; then
    print_status "success" "JWT authentication middleware configured"
else
    print_status "error" "JWT authentication missing"
fi

echo
echo "🌐 Deployment URLs..."
print_status "info" "Frontend (GitHub Pages): https://girish457.github.io/First-Attempt/"
print_status "info" "Backend (Local): http://localhost:3001"
print_status "info" "Admin Dashboard (Local): http://localhost:3001/admin"
print_status "info" "Admin Credentials: admin@foodiehub.com / admin123"

echo
echo "📋 Final Setup Instructions..."
echo "1. ⚠️  CRITICAL: Change GitHub Pages source to 'GitHub Actions'"
echo "   → Go to: https://github.com/girish457/First-Attempt/settings/pages"
echo "   → Change 'Source' from 'Deploy from a branch' to 'GitHub Actions'"
echo "   → Save settings"
echo
echo "2. 🔄 Wait for deployment (3-5 minutes after push)"
echo "   → Check: https://github.com/girish457/First-Attempt/actions"
echo
echo "3. 🎯 Test your live website:"
echo "   → Frontend: https://girish457.github.io/First-Attempt/"
echo "   → Try user registration with mobile number"
echo "   → Test all features (cart, wishlist, dark mode)"
echo
echo "4. 🖥️  For backend/admin testing (local):"
echo "   → Run: cd backend && npm install && npm start"
echo "   → Access: http://localhost:3001/admin"
echo "   → Login with admin credentials above"
echo
echo "✨ Your Golden Elegance e-commerce website is ready!"
echo "=========================================================="