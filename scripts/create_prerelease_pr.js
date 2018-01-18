const execa = require('execa')
const GitHubApi = require('github')

const version = require('../lerna.json').version

const OWNER = 'farism'
const REPO = 'stylegator'

const github = new GitHubApi({
  timeout: 5000,
  host: 'api.github.com',
  protocol: 'https',
})

github.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_AUTH,
})

const getUnreleasedChangelog = () =>
  execa('npx', ['lerna-changelog-helpers', '--unreleased'])

const getOpenPullRequests = (owner, repo) =>
  github.pullRequests.getAll({ owner, repo, state: 'open' })

const closeOldPrerelease = (owner, repo) => ({ data }) =>
  Promise.all(
    data.reduce((acc, { number, head }) => {
      if (head.ref === 'prerelease') {
        acc.push(
          github.pullRequests.update({
            owner,
            repo,
            number,
            state: 'closed',
          })
        )
      }

      return acc
    }, [])
  )

const createPullRequest = (owner, repo, version, body) => () =>
  github.pullRequests.create({
    owner,
    repo,
    base: 'master',
    head: `prerelease`,
    title: `Release ${version}`,
    body,
  })

const release = (owner, repo) =>
  getUnreleasedChangelog()
    .then(({ stdout }) =>
      getOpenPullRequests(owner, repo)
        .then(closeOldPrerelease(owner, repo))
        .then(createPullRequest(owner, repo, version, stdout))
        .then(console.log)
    )
    .catch(console.error)

release(OWNER, REPO)
