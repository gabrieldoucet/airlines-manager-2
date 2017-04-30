#!/usr/bin/env bash
if [ -z "$1" ]
then
  echo "Which folder do you want to deploy to GitHub Pages?"
  exit 1
fi
git subtree push --prefix $1 origin gh-pages

#git push origin `git subtree split --prefix dist 2.0.0`:gh-pages --force