set -e

# colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' 

# config
DEFAULT_MSG="Auto update and deploy $(date +'%d/%m/%Y %H:%M')"
BUILD_CMD="npm run build:strict" 

# error handling
handle_error() {
    echo ""
    echo -e "${RED}❌ FATAL ERROR ${NC}"
    # ### NEW: Affiche la commande précise qui a échoué
    echo -e "${RED}Command failed: '$BASH_COMMAND'${NC}" 
    echo -e "${RED}Check the logs above for details.${NC}"
    echo -e "${CYAN}Press any key to exit...${NC}"
    read -n 1 -s -r
    exit 1
}
trap 'handle_error' ERR

echo -e "${CYAN}--- 🚀 AUTOMATIC DEPLOYMENT START ---${NC}"

echo -e "${YELLOW}1. Checking and updating MAIN...${NC}"
git checkout main
git pull origin main

if [ -f "package.json" ]; then
    echo -e "${YELLOW}2. 📦 Checking dependencies...${NC}"
    npm install 
fi

# build local check
echo -e "${YELLOW}3. 🔨 Running Local Build Check...${NC}"
echo -e "   ⚙️  Command: $BUILD_CMD"
eval "$BUILD_CMD" 
echo -e "${GREEN}   ✅ Build PASSED! Continuing...${NC}"

# check for changes
if [[ -n $(git status -s) ]]; then
    echo -e "   📝 Changes detected."
    
    echo -e "${YELLOW}✍️  Enter commit message (Leave empty for default):${NC}"
    read -r USER_MSG

    if [ -z "$USER_MSG" ]; then
        MSG="$DEFAULT_MSG"
        echo -e "   ℹ️  Using default message: ${CYAN}$MSG${NC}"
    else
        MSG="$USER_MSG"
        echo -e "   ℹ️  Message used: ${CYAN}$MSG${NC}"
    fi
    
    git add .
    git commit -m "$MSG"
    echo -e "${GREEN}   ✅ Changes committed.${NC}"
else
    echo -e "${GREEN}   ✅ No changes to commit on main.${NC}"
fi

# push main
echo -e "${YELLOW}4. ☁️  Ensuring MAIN is synced with GitHub...${NC}"
git push origin main

# confirm deployment
echo ""
echo -e "${RED}⚠️  Do you want to deploy to PROD? (y/n)${NC}"
read -n 1 -r REPLY
echo ""

if [[ ! $REPLY =~ ^[YyOo]$ ]]; then
    echo -e "${RED}🛑 Deployment CANCELED.${NC}"
    echo -e "${CYAN}Press any key to exit...${NC}"
    read -n 1 -s -r
    exit 0
fi

# switch to prod and merge
echo -e "${YELLOW}5. Switching to PROD and merging...${NC}"
git checkout prod
git pull origin prod
git merge main

echo -e "${YELLOW}6. 🚀 Pushing to GitHub (Pushing PROD)...${NC}"
echo -e "   ⏳ Waiting for GitHub confirmation..."

git push origin prod

echo -e "${YELLOW}7. Returning to MAIN...${NC}"
git checkout main

echo -e "${GREEN}✅ DONE! The code has been sent to the server.${NC}"
echo -e "${CYAN}Press any key to close...${NC}"
read -n 1 -s -r