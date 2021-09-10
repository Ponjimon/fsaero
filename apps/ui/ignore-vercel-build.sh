#!/bin/bash
APP=ui
# Determine version of Nx installed
NX_VERSION=$(node -e "console.log(require('./package.json').devDependencies['@nrwl/workspace'])")

# Install @nrwl/workspace in order to run the affected command
yarn --version
yarn add --dev @nrwl/workspace@"${NX_VERSION}" --cached

# Run the affected command, comparing latest commit to the one before that
npx nx affected:apps --plain --base HEAD~1 --head HEAD | grep $APP -q

# Store result of the previous command (grep)
IS_AFFECTED=$?

if [ "${IS_AFFECTED}" -eq 1 ] || [[ "${VERCEL_GIT_COMMIT_REF}" =~ /^renovate/ ]]; then
  echo "🛑 - Build cancelled"
  exit 0
elif [ "${IS_AFFECTED}" -eq 0 ]; then
  echo "✅ - Build can proceed"
  exit 1
fi
