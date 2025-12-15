set -e

# --- COLORS & STYLE ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' 
BOLD='\033[1m'

# --- CONFIG ---
DEFAULT_MSG="Auto update and deploy $(date +'%d/%m/%Y %H:%M')"
BUILD_CMD="npm run build:strict" 
STASH_MADE=false

# --- VISUAL HELPERS ---
draw_line() {
    echo -e "${CYAN}-------------------------------------------------------------${NC}"
}

print_step() {
    echo ""
    echo ""
    draw_line
    echo -e "${BOLD}${YELLOW}$1${NC}"
    draw_line
}

# --- ERROR HANDLING ---
handle_error() {
    echo ""
    echo ""
    echo -e "${RED}#############################################################${NC}"
    echo -e "${RED}❌ FATAL ERROR ${NC}"
    echo -e "${RED}Command failed: '$BASH_COMMAND'${NC}" 
    
    if [ "$STASH_MADE" = true ]; then
        echo -e "${YELLOW}⚠️  ATTENTION : Des fichiers sont cachés dans le stash (git stash pop nécessaire).${NC}"
    fi

    echo -e "${RED}#############################################################${NC}"
    echo ""
    echo -e "${CYAN}Press any key to exit...${NC}"
    read -n 1 -s -r
    exit 1
}
trap 'handle_error' ERR

# ==============================================================================
#                               START SCRIPT
# ==============================================================================

clear
echo -e "${CYAN}=============================================================${NC}"
echo -e "${GREEN}${BOLD}         🚀  AUTOMATIC DEPLOYMENT SCRIPT  🚀${NC}"
echo -e "${CYAN}=============================================================${NC}"

# ------------------------------------------------------------------------------
print_step "1. Checking and updating MAIN..."

echo -e "   🔄 Pulling latest changes..."
git checkout main > /dev/null 2>&1
git pull origin main

if [ -f "package.json" ]; then
    echo -e "   📦 Checking dependencies..."
    npm install > /dev/null 2>&1 
    echo -e "   ✅ Dependencies OK."
fi

# ------------------------------------------------------------------------------
print_step "2. Running Local Build Check..."

echo -e "   ⚙️  Command: $BUILD_CMD"
echo -e "   ⏳ Building..."
eval "$BUILD_CMD" 
echo -e "${GREEN}   ✅ Build PASSED! Continuing...${NC}"

# ------------------------------------------------------------------------------
print_step "3. Checking for local changes..."

if [[ -n $(git status -s) ]]; then
    echo -e "   📝 Changes detected in your files:"
    git status -s | head -n 5
    echo -e "   (...)"
    echo ""
    
    echo -e "${YELLOW}✍️  Do you want to COMMIT these changes now? (y/n)${NC}"
    read -n 1 -r COMMIT_CHOICE
    echo ""
    echo ""

    if [[ $COMMIT_CHOICE =~ ^[YyOo]$ ]]; then
        echo -e "${YELLOW}✍️  Enter commit message (Leave empty for default):${NC}"
        read -r USER_MSG
        if [ -z "$USER_MSG" ]; then MSG="$DEFAULT_MSG"; else MSG="$USER_MSG"; fi
        
        git add .
        git commit -m "$MSG"
        echo -e "${GREEN}   ✅ Changes committed.${NC}"
    else
        echo -e "${CYAN}🔒 Keeping changes local (Stashing)...${NC}"
        git stash
        STASH_MADE=true
        echo -e "   ✅ Stashed successfully."
    fi
else
    echo -e "${GREEN}   ✅ No local changes to commit.${NC}"
fi

# ------------------------------------------------------------------------------
print_step "4. Ensuring MAIN is synced with GitHub..."

git push origin main
echo -e "${GREEN}   ✅ MAIN is up to date.${NC}"

# ------------------------------------------------------------------------------
echo ""
echo ""
echo -e "${RED}=============================================================${NC}"
echo -e "${RED}${BOLD}⚠️   READY TO DEPLOY TO PROD ?  ⚠️${NC}"
echo -e "${RED}=============================================================${NC}"
echo -e "Press [Y] to deploy, or any other key to cancel."
read -n 1 -r REPLY
echo ""

if [[ ! $REPLY =~ ^[YyOo]$ ]]; then
    echo ""
    echo -e "${RED}🛑 Deployment CANCELED.${NC}"
    if [ "$STASH_MADE" = true ]; then
        echo -e "${YELLOW}📦 Restoring your local changes...${NC}"
        git stash pop > /dev/null 2>&1
    fi
    exit 0
fi

# ------------------------------------------------------------------------------
print_step "5. Switching to PROD and merging..."

git checkout prod > /dev/null 2>&1
echo -e "   🔄 Pulling origin prod..."
git pull origin prod > /dev/null 2>&1
echo -e "   twisted_rightwards_arrows Merging main into prod..."
git merge main
echo -e "${GREEN}   ✅ Merge successful.${NC}"

# ------------------------------------------------------------------------------
print_step "6. Pushing to GitHub (Triggering Action)..."

git push origin prod
echo -e "${GREEN}   ✅ Code pushed to PROD branch.${NC}"

# ------------------------------------------------------------------------------
print_step "7. Waiting for GitHub Action result..."

echo -e "   ⏳ Waiting for workflow to start on GitHub (5s)..."
sleep 5

echo -e "${CYAN}   >> Streaming logs from GitHub CLI <<${NC}"
echo ""

# GH Watch
if gh run watch --exit-status; then
    echo ""
    draw_line
    echo -e "${GREEN}${BOLD}✅✅✅  DEPLOYMENT SUCCESSFUL ON SERVER!  ✅✅✅${NC}"
    draw_line
else
    echo ""
    draw_line
    echo -e "${RED}${BOLD}❌❌❌  DEPLOYMENT FAILED ON SERVER  ❌❌❌${NC}"
    draw_line
    echo -e "${RED}Check GitHub Actions tab for details.${NC}"
fi

# ------------------------------------------------------------------------------
print_step "8. Cleanup & Returning to MAIN..."

git checkout main > /dev/null 2>&1

if [ "$STASH_MADE" = true ]; then
    echo -e "${YELLOW}📦 Restoring your local uncommitted changes (Stash Pop)...${NC}"
    git stash pop > /dev/null 2>&1
    echo -e "${GREEN}   ✅ Changes restored.${NC}"
else
    echo -e "   ✅ Already on main, nothing to restore."
fi

echo ""
echo ""
echo -e "${CYAN}=============================================================${NC}"
echo -e "${GREEN}   👋  Job done. Press any key to close.${NC}"
echo -e "${CYAN}=============================================================${NC}"
read -n 1 -s -r