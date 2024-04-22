#!/usr/bin/env bash

# Deployment script to deploy on multiple QA servers (as requsted by backend team)

echo "Building and deploying for QA server ..."
yarn build:qa
bundle exec cap qa deploy

echo "Building and deploying for BE server ..."
yarn build:staging-be
bundle exec cap staging-be deploy

echo "Building and deploying for MB server ..."
yarn build:staging-mb
bundle exec cap staging-mb deploy
