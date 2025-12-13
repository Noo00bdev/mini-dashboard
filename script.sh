#!/usr/bin/env bash

echo "Début du script"

# Vérifie si npm build existe
if npm run | grep -q 'build'; then
    npm run build
else
    echo "Script 'build' introuvable dans package.json"
fi

# Vérifie si npm deploy existe
if npm run | grep -q 'deploy'; then
    npm run deploy
else
    echo "Script 'deploy' introuvable dans package.json"
fi

# Git : commit seulement s'il y a des changements
git add .
if ! git diff-index --quiet HEAD --; then
    git commit -m "Automate commit"
    git push
else
    echo "Rien à commit"
fi

echo "Script terminé"
