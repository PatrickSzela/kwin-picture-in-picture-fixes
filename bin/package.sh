#!/bin/bash
set -e

NAME=$(jq -r '.name' ./package.json)
VERSION=$(jq -r '.version' ./package.json)

mkdir -p builds

tar -czvf "builds/${NAME}-${VERSION}.tar.gz" -C ./dist .
