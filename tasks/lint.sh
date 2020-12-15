#!/bin/sh
# Ensure all javascript files staged for commit pass standard code style
git diff --name-only --cached --relative | grep '\.jsx\?$' | xargs eslint
if [ $? -ne 0 ]; then exit 1; fi
git diff --name-only --cached --relative | grep '\.css$' | xargs stylelint
if [ $? -ne 0 ]; then exit 1; fi
