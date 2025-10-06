#!/bin/bash
set -e

NAME=$(jq -r '.name' ./package.json)
ID="$(echo "$NAME" | sed -E 's/-([a-z])/\U\1/g')"
VERSION=$(jq -r '.version' ./package.json)

mkdir -p builds

7z a -tzip "builds/${NAME}-${VERSION}.kwinscript" ./dist
7z rn "./builds/${NAME}-${VERSION}.kwinscript" dist "${ID}"
