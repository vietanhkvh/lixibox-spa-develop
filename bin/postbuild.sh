#!/usr/bin/env bash

./bin/post-process-build.cjs build/static/js build/static/css

mkdir -p build/{scripts,}
rm -rf build/tmp
cp -rf config/app/$REACT_APP_ENV/* \
       config/app/$REACT_APP_ENV/.well-known \
       build/

if [[ "$REACT_APP_ENV" == "production" ]]
then
  cp -rf config/seo/robots.txt \
         config/version.json \
         build/
fi

REACT_APP_REVISION=${CIRCLE_SHA1:-`git log --format='%H' -n 1`} ./bin/minify.cjs build/scripts/ build/scripts/
