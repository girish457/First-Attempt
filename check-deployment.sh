#!/bin/bash

echo "🚀 Golden Elegance Deployment Status Checker"
echo "============================================"
echo ""

echo "✅ Checking deployment files..."

# Check if .nojekyll exists
if [ -f ".nojekyll" ]; then
    echo "✅ .nojekyll file exists (Jekyll disabled)"
else
    echo "❌ .nojekyll file missing"
fi

# Check if GitHub workflow exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions workflow exists"
else
    echo "❌ GitHub Actions workflow missing"
fi

# Check if gitignore excludes node_modules
if grep -q "node_modules/" ".gitignore"; then
    echo "✅ node_modules properly ignored"
else
    echo "❌ node_modules not ignored"
fi

# Check vite config
if grep -q "First-Attempt" "frontend/vite.config.js"; then
    echo "✅ Vite base path configured correctly"
else
    echo "❌ Vite base path needs configuration"
fi

echo ""
echo "📋 Manual Steps Required:"
echo "1. Go to: https://github.com/girish457/First-Attempt/settings/pages"
echo "2. Change 'Source' to 'GitHub Actions'"
echo "3. Wait 2-3 minutes for deployment"
echo "4. Visit: https://girish457.github.io/First-Attempt/"
echo ""
echo "🎯 Expected Result: Golden Elegance e-commerce site with working animations and dark mode"