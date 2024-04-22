#!/usr/bin/env bash

export REVISION=${CIRCLE_SHA1:-`git log --format="%H" -n 1`}
