const execa = require('execa')

const version = require('../lerna.json').version
const { getCdVersion } = require('./get_cd_version')

const lernaPublish = options =>
  execa(
    'npx',
    ['lerna', 'publish', '--yes', '--force-publish=*'].concat(
      options
    )
  )

const getUnreleasedChangelog = () =>
  execa('npx', ['lerna-changelog-helpers', '--unreleased'])

const getStableVersion = () =>
  execa('git', ['show', 'develop:lerna.json']).then(
    ({ stdout }) => JSON.parse(stdout).version
  )

const publish = () =>
  getUnreleasedChangelog().then(({ stdout }) =>
    getStableVersion().then(stableVersion => {
      const publishType = process.argv.slice(2)[0]

      if (publishType === 'stable') {
        return lernaPublish([`--cd-version=patch`])
      }

      if (publishType === 'hotfix') {
        return lernaPublish([
          '--npm-tag=hotfix',
          '--preid=hotfix',
          `--cd-version=prepatch`,
        ])
      }

      if (publishType === 'prerelease') {
        return lernaPublish([
          '--skip-git',
          '--npm-tag=next',
          '--preid=rc',
          `--cd-version=${getCdVersion(stableVersion, version, stdout)}`,
        ])
      }
    })
  )

publish()
  .then(({ stdout, stderr }) => console.log(stderr || stdout))
  .catch(console.error)
