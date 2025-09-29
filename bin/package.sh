#!/bin/bash
set -e

NAME=$(jq -r '.name' ./package.json)
VERSION=$(jq -r '.version' ./package.json)

mkdir -p builds

7z a -tzip "builds/${NAME}-${VERSION}.kwinscript" ./dist
