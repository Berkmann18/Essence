#!/usr/bin/env bash

babel --presets es2015 src/$1.js -o build/$1.bundle.js