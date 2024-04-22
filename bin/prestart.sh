#!/usr/bin/env bash

export REACT_APP_REVISION=`git log --format='%H' -n 1`
rm -rf public/tmp/scripts
mkdir -p public/tmp/scripts
./bin/minify.cjs public/scripts/ public/tmp/scripts/
