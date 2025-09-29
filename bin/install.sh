#!/bin/bash
set -e

ID="$(jq -r '.name' ./package.json)"
ID="$(echo "$ID" | sed -E 's/-([a-z])/\U\1/g')"

if [[ $(qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.isScriptLoaded "$ID") == "true" ]]; then
  qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript $ID
fi

kpackagetool6 -t KWin/Script -s $ID > /dev/null \
  && kpackagetool6 --type=KWin/Script -u "$(pwd)/dist" \
  || kpackagetool6 --type=KWin/Script -i "$(pwd)/dist"

qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.start

kwriteconfig6 --file kwinrc --group Plugins --key "${ID}Enabled" true

qdbus6 org.kde.KWin /KWin reconfigure 