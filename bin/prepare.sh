#!/bin/bash
set -e

mkdir -p dist
cp metadata.json dist/

get_field() {
  echo "$(cat ./package.json | jq -r ".$1")"
}

NAME="$(get_field "name" | sed -E 's/-([a-z])/\U\1/g')"
PRETTY_NAME=$(get_field "prettyName")
VERSION=$(get_field "version")
DESCRIPTION=$(get_field "description")
HOMEPAGE=$(get_field "homepage")
AUTHOR=$(get_field "author")
LICENSE=$(get_field "license")

sed -i -e "s|\$name|$NAME|g" \
       -e "s|\$prettyName|$PRETTY_NAME|g" \
       -e "s|\$version|$VERSION|g" \
       -e "s|\$description|$DESCRIPTION|g" \
       -e "s|\$homepage|$HOMEPAGE|g" \
       -e "s|\$author|$AUTHOR|g" \
       -e "s|\$license|$LICENSE|g" \
       dist/metadata.json
