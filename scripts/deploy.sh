#!/bin/bash

# // AUTOMATIC DEPLOYMENT SCRIPT

# error handling
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}--- 🚀 DÉMARRAGE DU DÉPLOIEMENT AUTOMATIQUE ---${NC}"

# changer branche
echo -e "${YELLOW}1. check if there are changes on main...${NC}"
git checkout main
git pull origin main

# check if there are changes
if [[ -n $(git status -s) ]]; then
    echo -e "   📝 change detected -> merge end push."
    git add .
    
    if [ -z "$1" ]; then
        MSG="Update auto et deploy $(date +'%d/%m/%Y %H:%M')"
    else
        MSG="$1"
    fi
    
    # create commit and push
    git commit -m "$MSG"
    echo -e "   💾 Commit : $MSG"
    git push origin main
else
    echo -e "${GREEN}   ✅ No changes to commit on main.${NC}"
fi

# switch to prod and merge
echo -e "${YELLOW}2. Switching to PROD and merging...${NC}"
git checkout prod
git pull origin prod
git merge main

# push to prod
echo -e "${YELLOW}3. 🚀 Pushing to GitHub (Triggers the server)...${NC}"
git push origin prod

# return to main
echo -e "${YELLOW}4. Returning to MAIN...${NC}"
git checkout main

echo -e "${GREEN}✅ DONE! Deployment is in progress on the server side.${NC}"