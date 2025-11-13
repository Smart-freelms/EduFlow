#!/bin/bash

# EduFlow LMS - Auto Deploy Script
# This script handles automated deployment to Netlify

set -e

echo "🚀 EduFlow LMS - Starting Auto Deploy..."
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="EduFlow"
REPO_URL="https://github.com/Smart-freelms/EduFlow.git"
NETLIFY_SITE_NAME="eduflow-lms"

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo "  Project: $PROJECT_NAME"
echo "  Repository: $REPO_URL"
echo "  Netlify Site: $NETLIFY_SITE_NAME"
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ] || [ ! -d "lms-landing" ]; then
    echo -e "${RED}❌ Error: Not in the EduFlow project root directory${NC}"
    echo "Please run this script from the project root where package.json is located"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to deploy via Netlify CLI
deploy_with_netlify_cli() {
    echo -e "${BLUE}🔧 Deploying with Netlify CLI...${NC}"
    
    if ! command_exists netlify; then
        echo -e "${YELLOW}📦 Installing Netlify CLI...${NC}"
        npm install -g netlify-cli
    fi
    
    echo -e "${BLUE}🏗️ Building the project...${NC}"
    cd lms-landing
    npm ci
    npm run build
    
    echo -e "${BLUE}🚀 Deploying to Netlify...${NC}"
    cd ..
    netlify deploy --prod --dir=lms-landing
    
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
}

# Function to deploy via GitHub integration
deploy_via_github() {
    echo -e "${BLUE}🔗 This deployment requires GitHub → Netlify integration${NC}"
    echo ""
    echo -e "${YELLOW}📋 Manual Steps Required:${NC}"
    echo "1. Push your code to GitHub (already done)"
    echo "2. Go to https://app.netlify.com"
    echo "3. Select 'Deploy with GitHub'"
    echo "4. Connect your GitHub repository: $REPO_URL"
    echo "5. Configure build settings:"
    echo "   - Build command: cd lms-landing && npm run build"
    echo "   - Publish directory: lms-landing/dist"
    echo "   - Functions directory: (leave empty)"
    echo "   - Node version: 18"
    echo "6. Add environment variables in Netlify dashboard:"
    echo "   - VITE_SUPABASE_URL: https://jznmqmxgkvwowdbwshuo.supabase.co"
    echo "   - VITE_SUPABASE_ANON_KEY: (your anon key)"
    echo "7. Deploy!"
    echo ""
    echo -e "${BLUE}🔗 Repository: $REPO_URL${NC}"
    echo -e "${GREEN}✅ All files are ready for deployment!${NC}"
}

# Function to build locally
build_locally() {
    echo -e "${BLUE}🏗️ Building project locally...${NC}"
    
    if [ ! -d "lms-landing" ]; then
        echo -e "${RED}❌ Error: lms-landing directory not found${NC}"
        exit 1
    fi
    
    cd lms-landing
    
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm ci
    
    echo -e "${YELLOW}🔨 Building project...${NC}"
    npm run build
    
    if [ -d "dist" ]; then
        echo -e "${GREEN}✅ Build completed successfully!${NC}"
        echo -e "${BLUE}📁 Output directory: lms-landing/dist${NC}"
        echo -e "${BLUE}🌐 Ready for deployment!${NC}"
    else
        echo -e "${RED}❌ Build failed - dist directory not created${NC}"
        exit 1
    fi
    
    cd ..
}

# Main execution
echo -e "${BLUE}🎯 Select deployment method:${NC}"
echo "1) Build locally only"
echo "2) Deploy via Netlify CLI (requires Netlify account)"
echo "3) Deploy via GitHub integration (recommended)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        build_locally
        ;;
    2)
        deploy_with_netlify_cli
        ;;
    3)
        deploy_via_github
        ;;
    *)
        echo -e "${RED}❌ Invalid choice. Please select 1, 2, or 3${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment process completed!${NC}"
echo -e "${BLUE}🔗 Live demo: https://emxmstdqf32e.space.minimax.io${NC}"
echo -e "${BLUE}🔗 Supabase: https://jznmqmxgkvwowdbwshuo.supabase.co${NC}"
echo -e "${BLUE}🔗 Repository: $REPO_URL${NC}"