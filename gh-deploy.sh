#!/usr/bin/env bash

if [ -z "$1" ]
then
  echo "Which branch do you want to deploy the 'dist' folder from?"
  exit 1
fi
git checkout gh-pages
git pull origin $1
git subtree push --prefix dist origin gh-pages