const semver = require('semver')

const BREAKING = /(:\w*: Breaking Change)/g
const FEATURE = /:\w*: New Feature/
const ENHANCEMENT = /:\w*: Enhancement/

const getCdVersion = (stableVersion, currentVersion, changelog) => {
  const diff = semver.diff(stableVersion, currentVersion)
  const major = changelog.match(BREAKING)
  const minor = changelog.match(FEATURE) || changelog.match(ENHANCEMENT)

  if (diff === 'prepatch' || diff === 'patch') {
    if (major) {
      return 'premajor'
    }

    if (minor) {
      return 'preminor'
    }
  }

  if (diff === 'preminor' || diff === 'minor') {
    if (major) {
      return 'premajor'
    }
  }

  if (!diff) {
    if (major) {
      return 'premajor'
    }

    if (minor) {
      return 'preminor'
    }

    return 'prepatch'
  }

  return 'prerelease'
}

module.exports = {
  getCdVersion,
}
