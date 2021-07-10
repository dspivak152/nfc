#!/bin/bash
echo "Hello, $(whoami)!"

echo "Current path is, $(pwd)"

ng build --prod --base-href . --output-path ../NfcTray/www/

echo "Finish build to nfcTray folder"
