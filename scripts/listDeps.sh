#!/usr/bin/env bash

if [ "$1" == "dev" -o "$1" == "-d" ]; then
    npm ls --dev --depth=0
elif [ "$1" == "prod" -o "$1" == "-p" ]; then
    npm ls --prod --depth=0
else
    npm ls --depth=0
fi