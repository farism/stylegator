const fs = require('fs-extra')

const LERNA_CONFIG = require('../lerna.json')

const VERSION = LERNA_CONFIG.version

const target = process.argv[2]

fs.emptyDirSync(target)
fs.copySync('../packages/documentation/build', target)

if (target === 'latest') {
  fs.emptyDirSync(VERSION)
  fs.copySync('../packages/documentation/build', `${VERSION}`)
}
