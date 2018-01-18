#!/bin/sh
# ideas used from https://gist.github.com/motemen/8595451

# Based on https://github.com/eldarlabs/ghpages-deploy-script/blob/master/scripts/deploy-ghpages.sh
# Used with their MIT license https://github.com/eldarlabs/ghpages-deploy-script/blob/master/LICENSE

# abort the script if there is a non-zero error
set -e

# get target parameter
if [ -z $1 ]
then
  target='latest'
else
  target=$1
fi

# show where we are on the machine
pwd
remote=$(git config remote.origin.url)

mkdir gh-pages-branch
cd gh-pages-branch

# config git author
# git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
# git config --global user.name "$GH_NAME" > /dev/null 2>&1

# now lets setup a new repo so we can update the gh-pages branch
git init
git remote add --fetch origin "$remote"


# switch into the the gh-pages branch
if git rev-parse --verify origin/gh-pages > /dev/null 2>&1
then
    git checkout gh-pages
else
    git checkout --orphan gh-pages
fi

# copy new files
node ../scripts/copy_built_files $target


# fetch all stable versions published to npm
npm view @stylegator/stylegator@* version --json > versions.json

# stage any changes and new files
git add -A

# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
git commit --allow-empty -m "Publish to GitHub pages [ci skip]"

# and push, but send any output to /dev/null to hide anything sensitive
git push --force --quiet origin gh-pages

# go back to where we started and remove the gh-pages git repo we made and used
# for deployment

cd ..
rm -rf gh-pages-branch

echo "Finished Deployment!"
