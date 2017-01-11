#!/usr/bin/env bash

cd ../src
minify *.js --no-comments
mv *.min.js ../dist